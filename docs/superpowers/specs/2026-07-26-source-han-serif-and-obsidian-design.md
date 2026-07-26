# 思源宋体接入与 Obsidian 沉淀设计

日期：2026-07-26

## 目标

1. 将《佣书》的页面正文与标题统一切换为 Adobe 思源宋体（Source Han Serif，简体中文字形）。
2. 字体由项目本地托管，使本地运行与 GitHub Pages 展示不依赖 Google Fonts 或其他字体 CDN。
3. 把当前项目事实、已确认决策、进展和未闭环事项写入 `C:\Users\UUWayne\Documents\Codex-Obsidian-Knowledge`。

Adobe 官方仓库提供 OTF、OTC、Subset OTF 以及 Variable OTF/TTF/WOFF2 等发布格式。本项目只采用适合网页部署的简体中文 Variable WOFF2 成品，不下载字体构建源码，也不将字体仓库误装为 Codex skill。

## 字体接入

- 从 `adobe-fonts/source-han-serif` 官方 release 获取简体中文 Variable WOFF2。
- 将字体文件放入 `public/fonts/source-han-serif/`，并保留对应开源许可证文本。
- 在 `src/app/globals.css` 中删除 LXGW WenKai 和 Google Noto Serif SC 的远程 `@import`。
- 新增本地 `@font-face`，声明可变字重范围并使用 `font-display: swap`。
- 将 `--font-title` 与 `--font-body` 的首选字体统一设为 Source Han Serif SC；回退链使用系统中文宋体与通用 `serif`。
- 不调整字号、字距、行高或布局，避免把字体更换扩大成视觉重构。

## Obsidian 沉淀

遵循 Vault 现有规则，优先更新已有页面：

- `projects/佣书项目/README.md`：补全项目定位、第一章范围、技术栈、当前状态和下一步。
- `projects/佣书项目/decisions.md`：记录“只做高完成度第一章”“以职业操作承载叙事”“本地托管思源宋体”等已确认决策及理由。
- `projects/佣书项目/log.md`：记录截至 2026-07-26 已完成的首章 Demo、GitHub Pages 部署、岭南地图与第二章路线，以及本次字体接入。
- `TODO.md`：移除“补充佣书背景”的未完成项，增加字体视觉回归、第一章完整试玩和待确认的第二章范围等未闭环任务。

知识库只写入可由当前项目文件和 Git 历史支持的事实；无法从现有材料确认的内容明确标记为待确认。

## 验证

- 确认字体 URL 在 `GITHUB_PAGES=true` 的 base path 下仍能正确解析。
- 运行 `npm run lint` 与 `npm run build`。
- 检查构建产物不再引用 Google Fonts 或 LXGW WenKai CDN。
- 在桌面与窄屏页面人工检查标题、正文、竖排文字、按钮和地图标注是否出现缺字、溢出或明显换行变化。
- 检查四份 Obsidian 文件的 YAML `updated` 日期、Wiki Links、决策/进展/TODO 分类是否正确。

## 范围外

- 不安装不存在的 Source Han Serif Codex skill。
- 不克隆完整字体源码仓库，不自行编译字体。
- 不对字体做字符级裁剪；这是后续性能优化项，需结合最终剧本文字集单独验证。
- 不修改剧情、交互流程、页面结构或视觉参数。

## 失败处理

- 若官方 release 的 Variable WOFF2 下载结构变化，改用同一官方 release 中的简体中文 WOFF2 成品，并记录具体版本与来源。
- 若构建或浏览器检查发现可变字体兼容问题，退回同一字族的必要静态字重 WOFF2，而不恢复远程字体依赖。
