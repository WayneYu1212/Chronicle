# 0731 验收剧情与视觉修订 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `0731验收.txt` 的剧情、证据交互、空间连续性、视觉层次与可读性要求落实到《佣书》，并沉淀为一份项目专用 rules 与一份跨项目通用 rules。

**Architecture:** 故事事实继续保存在 `src/story/*.json`，React 组件只负责呈现和交互。比较与拼合交互增加可选的“固定证据结论”数据形态，以移除只有一个正确答案的选择题，同时保留第三章已有的多选判断兼容性。残页 ImageGen 资产只提供纸张材质与氛围，可靠文字由界面叠加。

**Tech Stack:** Next.js 15、React 19、TypeScript、JSON story graph、CSS、Node `tsx --test`、ESLint、Next production build、Codex ImageGen。

## Global Constraints

- 只修改 `C:\Users\UUWayne\Desktop\Chronicle`，不修改《苹果落下之前》的代码、剧情或资源。
- 不提交、不推送、不切换主分支；保留工作树中的既有用户修改，所有写入使用 `apply_patch`，二进制 ImageGen 资产用明确的资源复制步骤放入指定目录。
- 故事内容只能进入 `src/story/*.json`；React 不硬编码剧情事实。
- 继续遵守康熙九年（1670）广州、主角约二十三岁、无 1650 年可靠亲历记忆和 H1/H2/H3/H4 史实等级边界。
- 第一章仍只提出“谁写、沈掌柜为何认识、还有谁在找”，不在本轮提前回答全部问题。
- 纸张、页码、葡文和 ImageGen 材质都不是单项定论证据；无法证明时使用“看上去、或许、我猜、待查”。
- 任何“完成、通过、已修复”的交付表述都必须附本轮新鲜命令输出或浏览器/图像检查证据。

---

## 文件地图

### Create

- `src/lib/notes.ts`：手札倒叙排序的纯函数。
- `src/lib/notes.test.ts`：手札最新条目优先的回归测试。
- `src/lib/text.test.ts`：中文语义片段换行的回归测试。
- `src/lib/narrative-quality.test.ts`：故事标题、角色显示名、固定结论和验收禁用表达的静态回归测试。
- `docs/narrative/佣书-剧情写作规则.md`：项目专用写作规则。
- `docs/narrative/历史互动游戏-剧情写作通用规则.md`：可复用于《苹果落下之前》的通用规则。
- `public/assets/folio-13-residual.png`：ImageGen 生成并复核过的残页材质图。

### Modify

- `src/types/game.ts`：增加可选的固定证据结论类型，兼容现有选项式比较与拼合。
- `src/lib/text.ts`、`src/components/SentenceText.tsx`：将句内换行从单纯句号切分扩展为语义片段包装。
- `src/components/PlayerNotebook.tsx`：使用最新条目优先的纯函数，并修正最新标记。
- `src/components/ActivityStage.tsx`：固定结论按钮、P29 材质资源、正常方向纸背文字、拼合完成后的新信息节译。
- `src/components/LingnanMap.tsx`：路线确认状态、短暂确认反馈、键盘与触摸一致性。
- `src/app/globals.css`：开屏光线、残页材质、纸背方向、语义片段换行、地图卡布局与明确点击态。
- `src/story/chapter01.json`：P29/P40、书坊空间、沈掌柜/小满档案、访客、工钱和第一章口语修订。
- `src/story/chapter02-nanhai.json`：标题、出发转场、沈掌柜信息边界、长段拆页与推测标记。
- `src/story/chapter02-guangzhou.json`：标题、留守场景、长段拆页、书吏压力和全知式句子修订。
- `src/story/fragments.json`、`src/story/archive.json`：与残页/夹层碎片的新材料描述保持一致。
- `docs/narrative/CHARACTERS.md`：补充沈掌柜的虚构姓名说明与小满档案约束。
- `docs/research/CLAIMS.md`：记录新使用的 PDF 句子、葡文节译边界、姓名启发和工钱的 H3/H4 状态。
- `src/lib/story-data.test.ts`：更新新增拆页后的章节图前缀和新增质量断言。

### Do not modify

- 《苹果落下之前》所在目录和任何独立项目文件。
- `src/story/chapter03.json` 的既有剧情数据；只确保新增交互类型不破坏其旧的选项式 assembly。
- 与本任务无关的工作树修改。

---

## Task 1: 建立可回归的规则与数据接口

**Files:**

- Modify: `src/types/game.ts`
- Modify: `src/lib/text.ts`
- Create: `src/lib/notes.ts`
- Create: `src/lib/text.test.ts`
- Create: `src/lib/notes.test.ts`
- Create: `src/lib/narrative-quality.test.ts`

**Interfaces:**

- `splitSentenceTokens(text: string): string[]`：把一条已经按句末标点切出的文本拆成可保持完整的语义片段。
- `notesNewestFirst(notes: PlayerNote[]): PlayerNote[]`：返回新数组，不修改保存状态原数组。
- `EvidenceConclusion`：`{ title: string; text: string; actionLabel?: string }`。
- `ComparisonConfig.options` 与 `AssemblyConfig.options` 改为可选；两者都增加可选 `conclusion?: EvidenceConclusion`。原有第三章 option 数据仍按旧路径渲染。

- [ ] **Step 1: 写失败测试**

  在 `src/lib/text.test.ts` 中测试：

  ```ts
  import { splitSentenceTokens } from "./text";

  test("keeps Chinese evidence phrases together", () => {
    const tokens = splitSentenceTokens("沈掌柜把第十三页夹进空账簿。");
    expect(tokens).toContain("沈掌柜");
    expect(tokens).toContain("第十三页");
    expect(tokens).not.toContain("第");
  });
  ```

  在 `src/lib/notes.test.ts` 中测试传入 `[旧, 新]` 后返回 `[新, 旧]`，并确认原数组顺序未变。

  在 `src/lib/narrative-quality.test.ts` 中导入三章 story JSON，先写出以下失败断言：

  ```ts
  assert.equal(chapter01.beats.some((beat) => beat.speaker === "老板"), false);
  assert.equal(chapter01.beats.find((beat) => beat.id === "comparison-01")?.comparison?.options?.length ?? 0, 0);
  assert.ok(chapter01.beats.find((beat) => beat.id === "comparison-01")?.comparison?.conclusion);
  assert.ok(chapter01.beats.find((beat) => beat.id === "assembly-01")?.assembly?.conclusion);
  ```

- [ ] **Step 2: 运行失败测试**

  Run: `npm.cmd test -- src/lib/text.test.ts src/lib/notes.test.ts src/lib/narrative-quality.test.ts`

  Expected: FAIL，因为三个新接口尚未实现，且当前剧情仍使用“老板”和选项式 P40。

- [ ] **Step 3: 实现最小数据接口**

  在 `src/types/game.ts` 添加 `EvidenceConclusion`，让 `options` 可选并保留原字段兼容；在 `src/lib/text.ts` 使用 `Intl.Segmenter("zh", { granularity: "word" })`，对标点附着到前一片段；在 `src/lib/notes.ts` 使用 `[...notes].reverse()` 实现纯排序函数。

- [ ] **Step 4: 运行基础测试**

  Run: `npm.cmd test -- src/lib/text.test.ts src/lib/notes.test.ts`

  Expected: PASS，文本片段与手札排序测试通过；故事质量测试继续保持 FAIL，等待剧情数据任务完成。

## Task 2: 修订第一章叙事与证据数据

**Files:**

- Modify: `src/story/chapter01.json`
- Modify: `src/story/fragments.json`
- Modify: `src/story/archive.json`
- Modify: `docs/narrative/CHARACTERS.md`
- Modify: `docs/research/CLAIMS.md`

**Interfaces:**

- P29 的 `inspection` 使用正常方向的 `verso` 文案，ink hotspot 只描述墨层事实。
- P40 的 `comparison` 使用 `conclusion`，`options` 为空或省略。
- `assembly-01` 的三片仍可拼合，背面改为新的葡文节译；使用 `conclusion`，不再要求玩家从唯一正确选项中猜答案。

- [ ] **Step 1: 先完成数据层回归测试**

  在 `narrative-quality.test.ts` 增加：

  ```ts
  const inspect = chapter01.beats.find((beat) => beat.id === "inspect-01")!;
  assert.match(inspect.inspection?.document.excerpt ?? "", /坟墓/);
  assert.doesNotMatch(inspect.inspection?.hotspots.find((spot) => spot.id === "ink")?.detail ?? "", /不能当作现场写成/);
  assert.equal(inspect.inspection?.verso?.includes("Relação"), true);
  assert.equal(chapter01.beats.find((beat) => beat.id === "opening-05")?.noteUpdates?.add?.some((note) => note.content.includes("小满")), true);
  ```

- [ ] **Step 2: 修订书坊开场与角色记录**

  将第一章所有主要剧情里的 `speaker: "老板"` 改为 `speaker: "沈掌柜"`；开场补充门槛、柜台、门内小几、后院和茶盏相对位置；在 `opening-05` 的 `noteUpdates` 中加入“沈子壮”为虚构姓名启发的人物记录，并增加小满人物档案。将 `opening-wage`、`evening-04`、`ending-stay-02`、`ending-01` 的第一日工钱改成同一套低额、明确为书坊内部虚构记账的数值。

- [ ] **Step 3: 修订 P29 物证和 P40 空间顺序**

  使用验收提供的“当整个城市更像一座坟墓……”句子，并在实施前从 PDF 复核上下文；删去 ink hotspot 的“不能当作现场写成的原稿”；把青砖写成位于第二箱上方、旧封套就在砖下，说明夹层三片来自封套而不是再次出现 P29 原页；将“希望下一个开箱的人……”改为主角可见的堆放事实和带“似乎”的推测。

- [ ] **Step 4: 重写比较与拼合文案**

  `comparison-01` 保留两张物证卡，但 question 改为“比较封套夹层与第十三页的层次”，加入固定 `conclusion`，内容只确认转抄层迹象。`assembly-01` 的背面改成一条依据 PDF 中文译文转译的连续葡文节译，例如围绕“第二天午后到城墙、帮助己方人员、聆听告解、士兵逃离城墙”的完整句子；游戏内标签必须写明“按译注中文转译的节译”，不宣称是发现了原始葡文底本。将碎片 edge 改成观察线索，不直接暴露左中右顺序。

- [ ] **Step 5: 修订访客、物理动作和第一章口语**

  门环改为主角听见的笃定节奏；访客具体描述窄幅白棉纸、密集横折、后添“十三”、纸背西文墨迹；移除“西关”和“陌生客”，改为“陌生客人”；门槛、铜钱、门内小几和空茶盏写清楚，删除炭火箸；“问店里几个人”改为“问掌柜在不在”；`便` 在对话中改为“就”，`第二箱先别动` 改为“第二箱别动着先”。访客报价改成低于 50 文的具体小额溢价，不能把白棉纸单项写成罕见标记。

- [ ] **Step 6: 运行第一章数据测试**

  Run: `npm.cmd test -- src/lib/narrative-quality.test.ts src/lib/story-data.test.ts`

  Expected: 第一章相关断言 PASS；若 story graph 因文本 beat 拆分而改变，记录需要同步更新的前缀索引，不能跳过图完整性测试。

## Task 3: 修订第二章空间、视角与章节阅读节奏

**Files:**

- Modify: `src/story/chapter02-nanhai.json`
- Modify: `src/story/chapter02-guangzhou.json`
- Modify: `src/lib/story-data.test.ts`

- [ ] **Step 1: 为长段拆页写回归断言**

  在 `narrative-quality.test.ts` 中断言：

  ```ts
  assert.equal(nanhai.beats.find((beat) => beat.id === "nanhai-title")?.text, "第二章 · 南海旧稿");
  assert.equal(guangzhou.beats.find((beat) => beat.id === "guangzhou-title")?.text, "第二章 · 书坊旧稿");
  assert.equal(nanhai.beats.filter((beat) => beat.id.startsWith("nanhai-departure")).length, 2);
  assert.equal(guangzhou.beats.filter((beat) => beat.id.startsWith("guangzhou-terms")).length, 2);
  assert.doesNotMatch(nanhai.beats.find((beat) => beat.id === "nanhai-boss-01")?.text ?? "", /误传/);
  assert.doesNotMatch(nanhai.beats.find((beat) => beat.id === "nanhai-departure")?.text ?? "", /青布轿|没有携带兵器/);
  ```

- [ ] **Step 2: 拆开南海出发段并补足空间转场**

  将 `nanhai-departure` 拆成两个连续 beat：第一段从书坊后门搬出箱笼，经过城西水埠；第二段写船家、登船点、珠江雾和离岸后的可见地标。删除兵器、隐去船家收什么书、青布轿和无法由主角确认的来路推断。

- [ ] **Step 3: 修订南海信息边界**

  将“误传成”改为“也有人说，这是澳门传来的见闻”；把“二十年间每个经手人都……”改成沈掌柜明确听来的两三种说法；把“不知道哪一层最早”保留为人物自述；将 `nanhai-yard-03` 的“说明”改为“或许说明”，并拆开过长的连续判断。

- [ ] **Step 4: 拆开广州留守长段并清理全知表达**

  删除 `留守路线`，将 `guangzhou-terms` 拆成“工钱与白撞雨”和“顺治七年指示为何可疑”两个页面；`guangzhou-morning` 移除未铺垫的青布轿；`guangzhou-discovery` 将“从不”“说明”改成主角根据钥匙涩、摆放位置和旧抄本差异做出的有限推测；`guangzhou-pressure` 改成书吏的实际动作与案上代价，不使用只为论证服务的“没有……也没有……”。

- [ ] **Step 5: 更新章节图断言**

  在 `src/lib/story-data.test.ts` 的 `chapter02Prefixes` 和跨章节 beat 数量断言中加入新 beat id；保持所有 `goto`、chapter route、location entrance 与旧的 chapter03 分支目标不变。

- [ ] **Step 6: 运行第二章测试**

  Run: `npm.cmd test -- src/lib/narrative-quality.test.ts src/lib/story-data.test.ts`

  Expected: chapter graph、location、fragment、route entrance 和新质量断言全部 PASS。

## Task 4: 实现固定结论交互并保持第三章兼容

**Files:**

- Modify: `src/components/ActivityStage.tsx`
- Modify: `src/types/game.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: 为固定结论定义渲染分支**

  `ComparisonActivity` 的行为：当 `config.conclusion` 存在时显示物证卡、结论标题、结论正文和一个“收下判断”按钮；点击后调用 `onComplete({ clues: ["残页同源"] })` 或数据指定 clue。此分支不渲染 `.comparison-options`。当 `conclusion` 不存在时继续渲染现有 options，保证第三章等旧数据不变。

  `AssemblyActivity` 的行为：先保留放置、翻面、透光和错误反馈；拼合成功后若有 `config.conclusion`，显示新葡文节译对应的固定结论和“收下判断”；没有 conclusion 时继续使用旧的 source options。

- [ ] **Step 2: 修正 P29 纸背方向和材质入口**

  从 `public/assets/folio-13-residual.png` 引入静态资源，在 inspection sheet 上设置 CSS 自定义属性；正面与背面文字都使用正常方向，移除 `.inspection-sheet--back p` 的 `transform: scaleX(-1)`。图片只作为纸面底图，热点与文字仍由 DOM 提供。

- [ ] **Step 3: 加入交互回归检查**

  运行 TypeScript 类型检查和故事测试，确认 `options` 可选不会让 `config.options.map` 产生运行时错误；手动检查 chapter01 的 comparison/assembly 走 conclusion 分支，chapter03 assembly 仍走 options 分支。

  Run: `npm.cmd test -- src/lib/story-data.test.ts`

  Expected: story graph 与 JSON schema 测试 PASS；浏览器检查留到 Task 7。

## Task 5: 完成手札、中文排版、地图和开屏视觉

**Files:**

- Modify: `src/components/SentenceText.tsx`
- Modify: `src/components/PlayerNotebook.tsx`
- Modify: `src/components/LingnanMap.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/lib/text.ts`
- Modify: `src/lib/notes.ts`

- [ ] **Step 1: 接入语义片段和手札倒叙**

  `SentenceText` 在每个 `.sentence-line` 内渲染 `splitSentenceTokens(line)` 返回的 `<span className="sentence-token">`；`PlayerNotebook` 使用 `notesNewestFirst(notes)`，将索引 `0` 标记为 `is-latest`。排序不得改变保存数组。

- [ ] **Step 2: 修正换行 CSS**

  增加 `.sentence-token { display:inline-block; white-space:nowrap; }`，保留句末标点与词组相邻；在 `.sentence-line` 上使用 `line-break: strict` 与必要的降级 `overflow-wrap:anywhere`，只允许极长无分隔专名降级断行。桌面、390px 和 420px 以下字号都保持现有阅读层级。

- [ ] **Step 3: 重做开屏光线层**

  将 `.cover-scene` 当前细密棕色网格替换为暖棕/纸金/低饱和灰紫的多层 radial/conic light rays；通过 `::before` 和 `::after` 做柔散光，不改变开书动画、按钮语义和减少动态偏好行为。

- [ ] **Step 4: 改地图布局与点击反馈**

  删除 `map-scale-note`；桌面地图卡改为内容驱动高度，取消 docket 内部滚动；移动端保持可读的完整卡片。`LingnanMap` 增加 `traveling` 状态，点击路线后按钮进入 `is-confirmed`，显示“已选定”，短暂反馈后调用 `onComplete`；键盘 Enter/Space、地图按钮和指针点击都应产生同样的 selected 状态。

- [ ] **Step 5: 运行文本与组件静态检查**

  Run: `npm.cmd test -- src/lib/text.test.ts src/lib/notes.test.ts src/lib/story-data.test.ts`

  Expected: 新旧文本、手札和故事测试 PASS；随后由 lint/build 检查 JSX/TypeScript 细节。

## Task 6: 生成并插入残页视觉资产

**Files:**

- Create: `public/assets/folio-13-residual.png`
- Modify: `src/components/ActivityStage.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: 使用 ImageGen 生成材质草图**

  使用 imagegen 生成横向窄幅、略旧白棉纸、密集横折、青灰墨迹渗化、暗红封蜡碎屑和潮痕的残页材质。提示词明确禁止可读文字、现代物件、镜像文字和印刷字体；目标是可作为界面底图的纸面，不让模型承担史料正文排版。

- [ ] **Step 2: 图像复核并放入资源目录**

  用 `view_image` 检查生成结果：纸张方向正常、折痕不形成现代表格、蜡屑不过度抢主体、没有明显现代物件。确认后复制为 `public/assets/folio-13-residual.png`；若图像不满足条件，重新生成，不把不合格草图接入页面。

- [ ] **Step 3: 将材质接入 P29**

  让 inspection sheet 的 front/back 共享材质层，DOM 文本盖在上方；保持热点可访问，且纸背葡文仍是正常从左到右方向。检查资源路径在 Next dev 与 production build 中均可解析。

## Task 7: 写入两份 rules 与项目研究记录

**Files:**

- Create: `docs/narrative/佣书-剧情写作规则.md`
- Create: `docs/narrative/历史互动游戏-剧情写作通用规则.md`
- Modify: `docs/narrative/CHARACTERS.md`
- Modify: `docs/research/CLAIMS.md`

- [ ] **Step 1: 写《佣书》专用规则**

  固定写入：1670 广州时间/地理边界、主角知识边界、沈掌柜/小满行为与语言、H1/H2/H3/H4 分类、纸墨证据写法、书坊工作/记账、第一章三问、材料不可逆处置、故事 JSON 边界、P29/P40 验收示例和逐场检查表。

- [ ] **Step 2: 写跨项目通用规则**

  只保留可迁移规则：叙事 POV、知识来源标记、物理空间状态、自然对白、线索公平性、玩家 agency、交互必要性、分支后果、证据等级、排版可读性、视觉资产与文字分工、独立复核。不写广州、佣书、沈掌柜或《苹果落下之前》的未确认设定。

- [ ] **Step 3: 更新研究断言**

  在 `CLAIMS.md` 中注明残页句子来自指定 PDF 的译注语境；葡文是依据附近中文译文的游戏内节译，不冒充原始葡文底本；“沈子壮”是虚构人物命名启发；工钱与买卖价格是 H3/H4 叙事经济，不外推为 1670 年广州行业统计；ImageGen 图是表现资产，不是史料证据。

## Task 8: 完整验证与 Game Studio 复核

**Files:**

- Read/verify: `0731验收.txt`
- Read/verify: all changed files and `git diff --check`
- Update only after acceptance: `C:\Users\UUWayne\Documents\Codex-Obsidian-Knowledge\projects\佣书项目\README.md`, `decisions.md`, `log.md`, root `TODO.md`

- [ ] **Step 1: 运行完整测试**

  Run: `npm.cmd test`

  Expected: exit code 0，输出无失败测试。

- [ ] **Step 2: 运行 lint 和 production build**

  Run: `npm.cmd run lint`

  Expected: exit code 0，`--max-warnings=0` 无警告。

  Run: `npm.cmd run build`

  Expected: exit code 0；若 Windows `.next` 锁文件导致环境错误，复制到干净临时目录重跑，并把环境问题与源码问题分开记录。

- [ ] **Step 3: 做桌面与移动端浏览器检查**

  检查 `/` 开屏光线与开书动画、第一章 P29 翻面/拖灯/热点、P40 conclusion、三片拼合、访客场景、手札最新条目、第二章地图选中反馈、390px 左右视口和全键盘操作。特别确认：纸背不镜像、中文不出现单字孤行、地图卡不需要内部滚动。

- [ ] **Step 4: 做视觉资产与 diff 检查**

  用 `view_image` 再次检查最终资源；运行 `git diff --check`；用 `git status --short` 确认只包含本任务新增/修改和原有用户改动，不出现 Apple 项目文件。

- [ ] **Step 5: 完成 Studio 分层复核**

  由叙事导演检查验收逐条对应；技术导演检查类型、资源路径、旧 assembly 兼容；视觉导演检查光线、残页材质、地图反馈与移动端卡片；QA 导演检查测试、键盘和布局；Independent Review Director 做一次不依赖上一轮结论的全量复读，列出通过、失败、待设备确认三类结果。

- [ ] **Step 6: 只有验收通过后更新 Obsidian**

  将真实完成状态、验证证据、未完成的真实设备检查和 rules 路径同步到 Chronicle Obsidian；不提前把“已完成”写入知识库。

## Execution Handoff

计划已保存。由于当前请求涉及多个相互依赖的子系统，推荐采用 **Inline Execution + checkpoints**：在本会话按 Task 1→8 执行，每完成一个可测试任务就进行一次局部验证；ImageGen 资产在 Task 6 单独复核。用户未授权提交 Git，因此计划不包含 commit 步骤。
