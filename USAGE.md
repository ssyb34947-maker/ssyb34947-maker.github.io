# 博客使用说明

## 新建文章

### 方式一：使用命令行脚本（推荐）

运行命令：

```bash
npm run new-post
```

按提示输入：

1. **文件名称** - 英文，如 `my-first-post`
2. **文章标题** - 显示在页面上的标题
3. **文章摘要** - 可选，直接回车跳过
4. **分类** - 可选，直接回车跳过
5. **标签** - 可选，逗号分隔，如 `Astro, 博客`
6. **是否草稿** - 默认否，草稿不会发布

脚本会自动在 `src/content/posts/` 目录下创建 Markdown 文件。

### 方式二：复制模板文件

1. 复制项目根目录下的 [template.md](template.md) 文件
2. 粘贴到 `src/content/posts/` 目录
3. 重命名为英文文件名，如 `my-post.md`
4. 修改文件中的 frontmatter 内容

## 文章格式

```markdown
---
title: 文章标题
date: 2026-05-21
summary: 文章摘要
category: 分类
tags: [标签1, 标签2]
draft: false
---

在这里写 Markdown 内容...
```

### Frontmatter 字段说明

| 字段     | 必填 | 说明                       |
| -------- | ---- | -------------------------- |
| title    | 是   | 文章标题                   |
| date     | 是   | 发布日期，格式 YYYY-MM-DD  |
| summary  | 否   | 文章摘要，列表页显示       |
| category | 否   | 文章分类                   |
| tags     | 否   | 标签数组                   |
| draft    | 否   | 草稿标记，true 时不发布    |
| cover    | 否   | 封面图片路径               |
| sticky   | 否   | 置顶优先级，数字越大越靠前 |

## 常用命令

```bash
# 本地开发
npm run dev

# 构建
npm run build

# 预览
npm run preview

# 新建文章
npm run new-post

# 格式化代码
npm run lint
```

## 目录结构

```
src/content/posts/     # 博客文章目录
template.md            # 文章模板（复制用）
```
