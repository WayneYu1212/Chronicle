# 第三章《半印相合》实施计划

> 按已批准的 `2026-07-29-chapter03-design.md` 执行；研究简报未过门前不写入正式剧情断言。

## Task 1：研究与人物门

**文件：** `docs/research/CHAPTER03_BRIEF.md`、`docs/research/CLAIMS.md`、`docs/narrative/CHARACTERS.md`

1. 核对 1670 水路表达、封签／私印／收条／递送簿、修志誊抄与西樵僧侣网络。
2. 按 H1—H4 登记采用断言、版本、页码和不可证边界；真实寺名与真实法号无可靠证据时不用。
3. 固定虚构西樵誊稿僧在 1670 年至少 53 岁及其见证层级。

## Task 2：先写第三章行为测试

**文件：** `src/lib/story-data.test.ts`、必要时 `src/lib/save.test.ts`

1. 冻结两份第二章修改前八个 ending 的数组索引，并断言修改后不变。
2. 断言八个 ending 经追加 continue 唯一跨章进入八个处置前导，旧存档停在 ending 后仍可确定性继续。
3. 断言五入口可达、三广州入口汇入版本链、两南海入口汇入传播链、两线汇入唯一肇庆终点。
4. 断言五份史料、三份档案引用有效；已售／已毁／已交还／入署原件不会被重新授予。
5. 先运行目标测试观察 RED，再实施最小数据与注册改动。

## Task 3：实现兼容转场与第三章数据

**文件：** `src/story/chapter02-guangzhou.json`、`src/story/chapter02-nanhai.json`、`src/story/chapter03.json`、`src/lib/story.ts`、`src/lib/route-entrances.ts`

1. 仅修改八个既有 ending：移除 `terminal`、增加 `next`；所有 continue 追加到数组末尾，不插入或重排既有 beat。
2. 每个 continue 提供单一“启程”选择，以 `chapter + goto` 指向唯一处置前导。
3. 实现八前导、五入口劳动、广州版本链、南海传播链、共享肇庆劳动和唯一安全终点；复用既有 activity type 与状态字段。
4. 进入每个前导时幂等补登记入口；第四章未实现前只解锁 `zhaoqing-common-ledger` 并留在第三章安全终点。

## Task 4：材料、档案和研究边界

**文件：** `src/story/fragments.json`、`src/story/archive.json`、`docs/research/CLAIMS.md`

1. 添加五份固定材料及完整来源、载体、风险、传播、建议解释和缺失旁证。
2. 添加三份固定档案；广州线、南海线和共享汇合分别解锁对应项。
3. 材料文本只支持版本层、经手和传播关系；半印不得成为正文内容互证或作者身份证明。

## Task 5：验证、审查与台账

1. 运行目标测试、全量 test、lint、TypeScript、UTF-8 JSON 解析和隔离生产构建。
2. Chromium 走通八入口代表路径；Firefox 和真实 iPhone／微信仍按发布门记录，不以自动化替代。
3. 叙事／历史、技术／QA及独立审查完成后，按真实结论回写 Obsidian；未通过浏览器／真机门时不宣称第三章发布验收完成。

