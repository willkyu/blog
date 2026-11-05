'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const config = window.BLOG_CONFIG || {};

    function currentTheme() {
        return body.classList.contains('dark-theme') ? 'dark' : 'light';
    }

    function setTheme(theme) {
        const dark = theme === 'dark';
        body.classList.toggle('dark-theme', dark);
        window.localStorage.setItem('theme', dark ? 'dark' : 'light');
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
            button.setAttribute('aria-pressed', String(dark));
        });
    }

    let activeThemeTransition = null;
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
        button.addEventListener('click', () => {
            if (activeThemeTransition) return;
            const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!document.startViewTransition || reduceMotion) {
                setTheme(nextTheme);
                return;
            }

            document.documentElement.classList.add('theme-switching');
            activeThemeTransition = document.startViewTransition(() => setTheme(nextTheme));
            const finishTransition = () => {
                document.documentElement.classList.remove('theme-switching');
                activeThemeTransition = null;
            };
            activeThemeTransition.finished.then(finishTransition, finishTransition);
        });
    });
    setTheme(currentTheme());

    function setupAdaptiveList(list) {
        const items = Array.from(list.querySelectorAll('[data-adaptive-item]'));
        const years = Array.from(list.querySelectorAll('[data-archive-year]'));
        const pagination = list.querySelector('[data-adaptive-pagination]');
        if (!items.length || !pagination) return;

        let pages = [];
        let currentPage = 0;
        let resizeTimer;

        function outerHeight(element) {
            const style = window.getComputedStyle(element);
            return element.getBoundingClientRect().height
                + Number.parseFloat(style.marginTop || 0)
                + Number.parseFloat(style.marginBottom || 0);
        }

        function availableHeight() {
            const footer = document.querySelector('.footer');
            const footerHeight = footer ? footer.getBoundingClientRect().height : 0;
            const top = list.getBoundingClientRect().top + window.scrollY;
            const heading = list.querySelector('.page-heading');
            const headingHeight = heading ? outerHeight(heading) : 0;
            return Math.max(220, window.innerHeight - top - footerHeight - headingHeight - 36);
        }

        function measureAndPaginate() {
            items.forEach(item => { item.hidden = false; });
            years.forEach(year => { year.hidden = false; });
            pagination.hidden = true;

            const limit = availableHeight();
            const yearHeights = new Map(years.map(year => [year.dataset.archiveYear, outerHeight(year)]));
            pages = [];
            let page = [];
            let pageHeight = 0;
            let pageYears = new Set();

            items.forEach(item => {
                const year = item.dataset.year;
                const yearHeight = pageYears.has(year) ? 0 : (yearHeights.get(year) || 0);
                const itemHeight = outerHeight(item);
                const addition = yearHeight + itemHeight;
                if (page.length && pageHeight + addition > limit) {
                    pages.push(page);
                    page = [];
                    pageHeight = 0;
                    pageYears = new Set();
                }
                if (!pageYears.has(year)) {
                    pageYears.add(year);
                    pageHeight += yearHeights.get(year) || 0;
                }
                page.push(item);
                pageHeight += itemHeight;
            });
            if (page.length) pages.push(page);

            currentPage = Math.min(currentPage, Math.max(0, pages.length - 1));
            renderPage();
        }

        function renderPage() {
            const visibleItems = new Set(pages[currentPage] || []);
            const visibleYears = new Set((pages[currentPage] || []).map(item => item.dataset.year));
            items.forEach(item => { item.hidden = !visibleItems.has(item); });
            years.forEach(year => { year.hidden = !visibleYears.has(year.dataset.archiveYear); });
            pagination.replaceChildren();

            if (pages.length <= 1) {
                pagination.hidden = true;
                return;
            }
            pagination.hidden = false;
            pages.forEach((_, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'page-number';
                button.textContent = String(index + 1);
                button.setAttribute('aria-label', `Page ${index + 1}`);
                if (index === currentPage) button.setAttribute('aria-current', 'page');
                button.addEventListener('click', () => {
                    currentPage = index;
                    renderPage();
                    window.scrollTo({ top: Math.max(0, list.offsetTop - 80), behavior: 'smooth' });
                });
                pagination.append(button);
            });
        }

        measureAndPaginate();
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(measureAndPaginate, 150);
        });
    }

    document.querySelectorAll('[data-adaptive-list]').forEach(setupAdaptiveList);

    function setupAdaptiveCategories(grid) {
        const cards = Array.from(grid.querySelectorAll('.card-item'));
        let resizeTimer;

        function visiblePostLimit() {
            const heightSteps = Math.floor((window.innerHeight - 600) / 140);
            const maximum = window.innerWidth < 768 ? 8 : 10;
            return Math.max(6, Math.min(maximum, 6 + heightSteps));
        }

        function updateCategories() {
            const limit = visiblePostLimit();
            cards.forEach(card => {
                const posts = Array.from(card.querySelectorAll('[data-category-post]'));
                posts.forEach((post, index) => { post.hidden = index >= limit; });
                const more = card.querySelector('[data-category-more]');
                if (more) more.hidden = posts.length <= limit;
            });
        }

        updateCategories();
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(updateCategories, 150);
        });
    }

    document.querySelectorAll('[data-adaptive-categories]').forEach(setupAdaptiveCategories);

    if (config.search) {
        const dialog = document.querySelector('[data-search-dialog]');
        const input = document.querySelector('[data-search-input]');
        const results = document.querySelector('[data-search-results]');
        const status = document.querySelector('[data-search-status]');
        let indexPromise;

        const loadIndex = () => {
            if (!indexPromise) {
                indexPromise = fetch(`${config.root || '/'}search.json`).then(response => {
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return response.json();
                });
            }
            return indexPromise;
        };

        const openSearch = () => {
            dialog.hidden = false;
            body.classList.add('search-open');
            window.setTimeout(() => input.focus(), 0);
            loadIndex().catch(() => { status.textContent = 'Unable to load the search index'; });
        };
        const closeSearch = () => {
            dialog.hidden = true;
            body.classList.remove('search-open');
        };

        document.querySelectorAll('[data-search-open]').forEach(button => button.addEventListener('click', openSearch));
        document.querySelectorAll('[data-search-close]').forEach(button => button.addEventListener('click', closeSearch));

        input.addEventListener('input', async () => {
            const query = input.value.trim().toLocaleLowerCase();
            results.replaceChildren();
            if (!query) {
                status.textContent = 'Type to search';
                return;
            }
            try {
                const entries = await loadIndex();
                const terms = query.split(/\s+/).filter(Boolean);
                const matches = entries.map(entry => {
                    const title = entry.title.toLocaleLowerCase();
                    const meta = `${entry.categories.join(' ')} ${entry.tags.join(' ')}`.toLocaleLowerCase();
                    const text = entry.text.toLocaleLowerCase();
                    if (!terms.every(term => title.includes(term) || meta.includes(term) || text.includes(term))) return null;
                    const score = terms.reduce((total, term) => total
                        + (title.includes(term) ? 10 : 0)
                        + (meta.includes(term) ? 4 : 0)
                        + (text.includes(term) ? 1 : 0), 0);
                    return { entry, score };
                }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 30);

                status.textContent = matches.length ? `${matches.length} post${matches.length === 1 ? '' : 's'} found` : 'No matching posts';
                matches.forEach(({ entry }) => {
                    const item = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = entry.url;
                    const title = document.createElement('strong');
                    title.textContent = entry.title;
                    const meta = document.createElement('small');
                    meta.textContent = [...entry.categories, ...entry.tags].join(' · ');
                    link.append(title, meta);
                    item.append(link);
                    results.append(item);
                });
            } catch {
                status.textContent = 'Unable to load the search index';
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !dialog.hidden) closeSearch();
            if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
                event.preventDefault();
                openSearch();
            }
        });
    }
});
