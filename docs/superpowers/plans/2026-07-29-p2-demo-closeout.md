# P2 正式 Demo 收口实施计划

> 按已批准的 `2026-07-29-p2-demo-closeout-design.md` 执行。P2 只有在真实玩家、Firefox 与真机证据齐全并由创始人批准后才能过门。

## Task 1：地图触控与验收包

**文件：** `src/app/globals.css`、`docs/qa/P2-DEMO-ACCEPTANCE.md`

1. 将 `.map-location` 命中区从 36×36px 提升到 44×44px，保持中心坐标和视觉红点不变。
2. 建立验收矩阵，预填当前已验证证据，将 Firefox、200%、完整键盘、iPhone／微信长编触摸与五名目标玩家明确标为待执行。
3. 在本地 Chromium 复核六个地点、键盘焦点、200% 缩放、窄屏与信息栏滚动；记录版本、路径与结果。

## Task 2：补丁依赖升级

**文件：** `package.json`、`package-lock.json`、`docs/technical/DEPENDENCY_AUDIT.md`、`docs/qa/P2-DEMO-ACCEPTANCE.md`

1. 只将 `next` 与 `eslint-config-next` 锁定为 `15.5.21`，不升级其他依赖，不运行 `npm audit fix --force`。
2. 执行升级后的 `npm audit` 并记录完整结论；网络失败则保持 `YS-P2-05` 未完成。
3. 运行全量 test、lint、TypeScript、UTF-8 JSON 解析和隔离生产构建。

## Task 3：P2 状态审查与台账

1. QA 总监复核代码、浏览器证据和依赖结果；独立审查确认没有把缺失证据误记为完成。
2. 只关闭具有当期证据的任务。五名目标玩家、Firefox 和创始人真机流程未完成时，P2 保持“进行中”。
3. 验收通过的子项写回 Obsidian README、log 与 TODO；不提交、推送或发布。

