# 依赖安全审计

基线审计日期：2026-07-29  
基线命令：`npm.cmd audit --json`  
基线结论：0 critical、12 high。“12”是 npm 统计的受影响依赖节点，不是十二条彼此独立且在本游戏中都可利用的攻击链。

2026-07-29 已将 `next` 与 `eslint-config-next` 精确升级到 15.5.21，`npm.cmd ls next eslint-config-next --depth=0` 已确认实际解析版本。升级后的 `npm.cmd audit --json` 首次经代理 90 秒无响应；再次执行明确返回“Client network socket disconnected before secure TLS connection was established”及 audit endpoint error。官方同版本 WASM fallback 的隔离 production build 与静态导出已经通过，但下面的 12 节点仍只是升级前基线，不得解释成升级后结果，`YS-P2-05` 继续保持未完成。

## 十二个高危依赖节点

| # | 依赖 | 当前解析版本 | 类型 | 传播关系／判断 |
|---:|---|---|---|---|
| 1 | `next` | 15.5.20（基线）；当前已装 15.5.21 | 直接、生产／构建 | 多条 Next.js 公告；静态导出降低可达性，升级后 audit 尚未取得结果 |
| 2 | `postcss`（Next 内） | 8.4.31 | 间接、构建 | 公告涉及 style 上下文 XSS、任意文件读取／信息披露与 source map 路径遍历；无不可信 CSS 输入，静态运行时不可达 |
| 3 | `sharp` | 0.34.5 | 可选间接、构建 | libvips 图像解析公告可能影响机密性、完整性与可用性；当前不处理用户提交的 GIF／TIFF／VIPS 等图像 |
| 4 | `eslint` | 9.39.5 | 直接、开发 | 配置／glob 链带入；不进入静态站运行时 |
| 5 | `eslint-config-next` | 15.5.20（基线）；当前已装 15.5.21 | 直接、开发 | 已与 Next 同步升级；升级后 audit 尚未取得结果 |
| 6 | `@eslint/eslintrc` | 3.3.6 | 直接、开发 | 配置解析链，仅开发／CI |
| 7 | `@eslint/config-array` | 0.21.2 | 间接、开发 | glob／匹配链，仅开发／CI |
| 8 | `eslint-plugin-import` | 2.32.0 | 间接、开发 | 依赖受影响匹配组件，仅开发／CI |
| 9 | `eslint-plugin-jsx-a11y` | 6.10.2 | 间接、开发 | 依赖受影响匹配组件，仅开发／CI |
| 10 | `eslint-plugin-react` | 7.37.5 | 间接、开发 | 依赖受影响匹配组件，仅开发／CI |
| 11 | `minimatch` | 3.1.5、10.2.5 | 间接、lint／CI | 特制模式拒绝服务；受信配置下较低，仍属供应链面 |
| 12 | `brace-expansion` | 1.1.16、5.0.7 | 间接、lint／CI | 特制嵌套模式可耗尽内存；不是玩家输入面 |

## 可达性与处理方案

当前 GitHub Pages 版本使用 Next.js 静态导出，没有 Node 常驻服务器、Server Actions、自定义服务端、动态重写、用户 CSS 上传或用户图片处理。因此多数公告在玩家访问静态站时不可达，但仍影响本地和 CI 构建链。

1. 将 `next` 与 `eslint-config-next` 同步升级至 `15.5.21`，刷新 lockfile。
2. 运行依赖树复核、测试、lint、生产构建和 Pages 静态导出检查。
3. 重跑 `npm audit`，登记仍由 ESLint／构建链带入的节点。
4. 只能通过主版本解决的剩余项另开兼容性任务，不强压间接版本。

禁止直接运行 `npm audit fix --force`：审计给出的强制修复目标包含跨主版本或回退式变更（当前输出包括 ESLint 10 与旧版 `eslint-config-next`），不保证与 Next 15 兼容。禁止用 `overrides` 强压未验证版本；每次处理前以当次审计输出为准。

主要公告：Next.js GHSA-m99w-x7hq-7vfj、GHSA-89xv-2m56-2m9x、GHSA-p9j2-gv94-2wf4；PostCSS GHSA-qx2v-qp2m-jg93、GHSA-6g55-p6wh-862q、GHSA-r28c-9q8g-f849；sharp GHSA-f88m-g3jw-g9cj；brace-expansion GHSA-mh99-v99m-4gvg。

发布门禁：15.5.21 补丁、lockfile、39 项测试、lint、TypeScript 及 WASM 隔离构建／静态导出已完成，但仍须取得升级后的新 audit 结果，并为失效的原生 SWC 固定可复现的长期构建路径。可以继续本地内容开发，但不得把当前状态称为“已消除高危项”或关闭 `YS-P2-05`。
