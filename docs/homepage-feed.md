# 主页精选内容清单

个人主页使用的博客精选内容集中维护在 Obsidian Vault 根目录的
`source/_homepage.md`。这个文件只作为构建输入，不会生成页面，也不会进入文章、归档、
标签、站点地图、RSS 或搜索索引。

## 清单格式

文件必须保留以下 front matter：

```md
---
homepageManifest: 1
---
```

每个条目以包含别名的二级 Wiki Link 开始，链接目标是 Vault 中 `_posts/` 下的真实文章。
可以写 Vault 相对路径（含或不含 `_posts/` 和 `.md`）；只有文件名时，仅在全站唯一的情况下
才能解析。

```md
## [[_posts/文章路径/文件名.md|主页显示标题]]

bind:: blog
appearance:: text
summary:: 显示在个人主页卡片中的简短介绍。
tags:: 写作, 随笔
order:: 10
enabled:: true

## [[_posts/另一篇文章|图文记录]]

bind:: projects
appearance:: gallery
summary:: 一篇以图片为主的记录。
cover:: [[images/example-cover.jpg]]
tags:: 图像, 项目
order:: 20
enabled:: true
```

字段规则：

- `bind` 必填，可选 `research`、`blog`、`pokemon`、`projects`。
- `appearance` 必填，可选 `text`、`gallery`、`book`、`browser`、`disc`、`essay`。
- `summary` 必填，必须是非空单行文本。
- `order` 必填，必须是整数；输出先按它升序排列，相同时按最终链接排序。
- `tags` 可选，使用英文逗号或中文逗号分隔。
- `enabled` 可选，默认为 `true`；设为 `false` 时条目不会输出，但仍会接受完整校验。
- `cover` 对 `text` 可选，对其他外观必填。建议使用指向 Vault 内公开资源的 Wiki Link。
- 不允许填写 `id`，也不允许坐标、尺寸、视差、动画、随机位置或其他未定义字段。

## 添加、停用与删除

添加条目时，在 `_homepage.md` 末尾按上述格式填写即可。临时移除可设置
`enabled:: false`；永久移除则删除对应的整个二级标题区块。修改后运行：

```sh
npm run check
```

构建会读取文章经过 Hexo front matter 与 permalink 规则计算出的最终地址，并将站点 `root`
加入链接。封面必须对应 Vault 内真实存在、且构建后可以公开访问的文件。文章或封面无法解析、
链接重复、字段非法时，构建会失败并指出条目和原因。

成功后，构建产物为 `public/homepage-feed.json`，线上路径为
`/blog/homepage-feed.json`。不要手工编辑 `public/`。
