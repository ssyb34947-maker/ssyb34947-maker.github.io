import { input, confirm } from '@inquirer/prompts'
import fs from 'fs'
import path from 'path'
import { isFileNameSafe } from './utils.js'

function getPostFullPath(fileName) {
  return path.join('./src/content/posts', `${fileName}.md`)
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const fileName = await input({
  message: '请输入文件名称（英文，如：my-first-post）',
  validate: (value) => {
    if (!isFileNameSafe(value)) {
      return '文件名只能包含小写字母、数字和连字符'
    }
    const fullPath = getPostFullPath(value)
    if (fs.existsSync(fullPath)) {
      return `${fullPath} 已存在`
    }
    return true
  },
})

const title = await input({
  message: '请输入文章标题',
  default: '未命名文章',
})

const summary = await input({
  message: '请输入文章摘要（可选，直接回车跳过）',
})

const category = await input({
  message: '请输入分类（可选，直接回车跳过）',
})

const tagsInput = await input({
  message: '请输入标签，用逗号分隔（可选，直接回车跳过）',
})

const isDraft = await confirm({
  message: '是否设为草稿？',
  default: false,
})

const tags = tagsInput
  .split(',')
  .map((t) => t.trim())
  .filter((t) => t.length > 0)

let frontmatter = `---
title: ${title}
date: ${formatDate(new Date())}`

if (summary) {
  frontmatter += `\nsummary: ${summary}`
}

if (category) {
  frontmatter += `\ncategory: ${category}`
}

if (tags.length > 0) {
  frontmatter += `\ntags: [${tags.join(', ')}]`
}

if (isDraft) {
  frontmatter += `\ndraft: true`
}

frontmatter += `\n---\n\n在这里开始写你的文章内容...\n`

const fullPath = getPostFullPath(fileName)
fs.writeFileSync(fullPath, frontmatter)
console.log(`✅ 文章创建成功: ${fullPath}`)
