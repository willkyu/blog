'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targets = [path.join(root, 'README.md'), path.join(root, 'source'), path.join(root, 'scaffolds')];

function collect(target, files) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    if (target.endsWith('.md')) files.push(target);
    return;
  }
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name === '.obsidian') continue;
    collect(path.join(target, entry.name), files);
  }
}

function isListItem(line) {
  return /^\s*(?:[-+*]|\d+[.)])\s+/.test(line);
}

function normalize(content) {
  const input = content.replace(/\r\n?/g, '\n').split('\n');
  const output = [];
  let fence = null;
  let displayMath = false;
  let frontMatter = input[0] === '---';

  for (let index = 0; index < input.length; index += 1) {
    let line = input[index];
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!fence) fence = marker;
      else if (fence === marker) fence = null;
    }

    const mathDelimiter = !fence && /^\s*\$\$\s*$/.test(line);
    const protectedBlock = Boolean(fence) || displayMath || mathDelimiter;

    if (!protectedBlock) {
      line = line.replace(/^(\t+)/, tabs => '    '.repeat(tabs.length));
      if (frontMatter) line = line.replace(/^\s+-\s+/, '  - ');
      line = line.replace(/^(\s*)[+*](\s+)/, '$1-$2');
      line = line.replace(/^(\s*)-([\p{L}])/u, '$1- $2');
      if (/[^ \t][ \t]$/.test(line)) line = line.replace(/[ \t]+$/, '');
    }

    if (index > 0 && frontMatter && line === '---') frontMatter = false;
    if (mathDelimiter) displayMath = !displayMath;

    if (line.trim() === '') {
      if (!output.length || output[output.length - 1] === '') continue;
      output.push('');
      continue;
    }
    output.push(line);
  }

  const compact = [];
  for (let index = 0; index < output.length; index += 1) {
    if (
      output[index] === ''
      && isListItem(output[index - 1] || '')
      && isListItem(output[index + 1] || '')
    ) continue;
    compact.push(output[index]);
  }

  while (compact.length && compact[compact.length - 1] === '') compact.pop();
  return `${compact.join('\n')}\n`;
}

function formatFiles() {
  const files = [];
  targets.forEach(target => collect(target, files));
  let changed = 0;

  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const formatted = normalize(original);
    if (formatted === original) continue;
    fs.writeFileSync(file, formatted, 'utf8');
    changed += 1;
  }

  console.log(`Formatted ${changed} of ${files.length} Markdown files.`);
}

if (require.main === module) formatFiles();

module.exports = { normalize };
