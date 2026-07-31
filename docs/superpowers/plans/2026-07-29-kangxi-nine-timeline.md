# 康熙九年时间轴迁正 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将《佣书》当前叙事时间从误设的康熙六年（1667）统一恢复为康熙九年（1670），并保持既有出生年、1650 年事件年龄、故事节点和存档兼容。

**Architecture:** 新增一个小型运行时时间轴常量供 UI 与故事校验器共同消费；故事 JSON 继续承载章节和材料日期，但校验器拒绝与当前时间轴不一致的章日期和当年材料日期。不新增存档字段。旧决策和日志保留历史记录，只追加取代说明。

**Tech Stack:** Next.js 15、React 19、TypeScript、JSON 故事数据、Node `tsx --test`、Markdown 项目台账。

## Global Constraints

- 当前叙事时间固定为康熙九年（1670），距 1650 年庚寅之劫二十年。
- 保留既有出生年与 1650 年事件年龄；当前年龄统一增加三岁，不改变亲历资格。
- 主角与周砚秋约 23 岁，约生于 1647 年，1650 年约三岁且无可靠亲历记忆。
- 1650、1653、顺治七年及文献出版年份属于史料自身时间，不得机械改写。
- `nanhai-zhou` 的周家祖父死亡间隔按原来锚定 1650 的设定改为二十年。
- 不改变 story ID、beat 顺序／数组索引、存档 schema、路线入口或永久处置。
- 只对目标文件定点补丁；不执行 reset、clean、批量格式化、全量暂存、提交、推送、部署或生成物清理。
- `TODO.md` 中《苹果落下之前》的 1667 属于另一项目，禁止修改。

---

### Task 1: 建立时间一致性回归测试

**Files:**
- Modify: `src/lib/story-data.test.ts`
- Modify: `src/lib/story-validation.ts`
- Create: `src/lib/timeline.ts`
- Read: `src/story/chapter01.json`
- Read: `src/story/chapter02-guangzhou.json`
- Read: `src/story/chapter02-nanhai.json`
- Read: `src/story/fragments.json`

**Interfaces:**
- Consumes: 现有 `validateStoryData`、`StoryChapter` 与 `SourceFragment` JSON 数据。
- Produces: `GAME_TIMELINE` 运行时常量，以及自动拒绝错误章日期／当年史料日期的故事校验门。

- [ ] **Step 1: 写入失败测试**

```ts
test("validator rejects chapters and contemporary fragments outside the approved timeline", () => {
  const wrongChapter = structuredClone(chapterRegistry) as Record<string, StoryChapter>;
  wrongChapter["chapter02-guangzhou"].date = "康熙六年 · 九月廿四";
  const chapterIssues = validateStoryData(wrongChapter, fragments, archiveJson, locations, routeEntranceIds, getFirstChapterId());
  assert.ok(chapterIssues.some((issue) => issue.includes("康熙九年")));

  const wrongFragments = fragments.map((fragment) =>
    fragment.id === "gazetteer-secret-copy" ? { ...fragment, estimatedDate: "康熙六年" } : fragment
  );
  const fragmentIssues = validateStoryData(chapterRegistry, wrongFragments, archiveJson, locations, routeEntranceIds, getFirstChapterId());
  assert.ok(fragmentIssues.some((issue) => issue.includes("gazetteer-secret-copy") && issue.includes("康熙九年")));
});
```

- [ ] **Step 2: 运行测试并确认按预期失败**

Run: `npx.cmd tsx --test src/lib/story-data.test.ts`

Expected: FAIL，两个错误 fixture 都没有被现有校验器报告。

- [ ] **Step 3: 保存 RED 证据**

记录失败断言与退出码。随后新增：

```ts
export const GAME_TIMELINE = {
  reignLabel: "康熙九年",
  gregorianYear: 1670,
  gregorianLabel: "一六七〇",
  eventYear: 1650,
  yearsSinceEvent: 20,
  firstChapterDate: "康熙九年 · 九月廿三",
} as const;

export const CONTEMPORARY_FRAGMENT_IDS = new Set(["gazetteer-new-entry", "gazetteer-secret-copy"]);
```

让 `validateStoryData` 检查所有已登记章节的 `date` 以 `GAME_TIMELINE.reignLabel` 开头，并检查上述两份当年材料的 `estimatedDate` 等于该年号。

### Task 2: 迁正运行时和剧情文本

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/game/page.tsx`
- Modify: `src/components/PlayerNotebook.tsx`
- Modify: `src/story/chapter01.json`
- Modify: `src/story/chapter02-guangzhou.json`
- Modify: `src/story/chapter02-nanhai.json`
- Modify: `src/story/fragments.json`

**Interfaces:**
- Consumes: Task 1 的时间一致性测试。
- Produces: 玩家可见的康熙九年、二十年间隔和 1670 当年材料元数据；不改变任何 ID 或索引。

- [ ] **Step 1: 更新 UI 日期**

首页、游戏扉页和手札默认日期改为读取 `GAME_TIMELINE.reignLabel`、`gregorianLabel` 与 `firstChapterDate`，保留九月廿三。

- [ ] **Step 2: 更新章节与史料元数据**

第一章新增 `date: "康熙九年 · 九月廿三"`；两份第二章 `date` 改为“康熙九年 · 九月廿四”；`gazetteer-new-entry` 与 `gazetteer-secret-copy` 的 `estimatedDate` 改为“康熙九年”。

- [ ] **Step 3: 更新有明确语义的相对时间**

```text
小满：十三岁 → 十六岁
与庚寅之劫的距离：十七年前／十七年过去／十七年间 → 二十年前／二十年过去／二十年间
周家祖父：已经去世十七年 → 已经去世二十年
广州副本：康熙六年的今天 → 康熙九年的今天
```

保留 `visitor-admit` 的“藏了近二十年”，因为九月距离顺治七年冬尚不足整二十年。

- [ ] **Step 4: 验证 JSON 可解析**

Run: `node -e "for (const f of ['src/story/chapter01.json','src/story/chapter02-guangzhou.json','src/story/chapter02-nanhai.json','src/story/fragments.json']) JSON.parse(require('fs').readFileSync(f,'utf8')); console.log('json ok')"`

Expected: `json ok`

### Task 3: 迁正产品真相、人物与研究基线

**Files:**
- Modify: `AGENT.md`
- Modify: `PROJECT.md`
- Modify: `docs/product/PRD.md`
- Modify: `docs/narrative/CHARACTERS.md`
- Move: `docs/research/GUANGZHOU_1667.md` → `docs/research/GUANGZHOU_1670.md`
- Modify: `docs/research/CLAIMS.md`
- Modify: `docs/superpowers/specs/2026-07-29-p2-demo-closeout-design.md`
- Modify: `docs/superpowers/specs/2026-07-29-chapter03-design.md`

**Interfaces:**
- Consumes: 创始人 1670 决策与固定出生年策略。
- Produces: 唯一当前产品／人物／研究时间基线；历史来源年份保持原样。

- [ ] **Step 1: 更新产品真相**

`AGENT.md` 与 PRD 固定“康熙九年（1670）／距庚寅之劫二十年／主角约二十三岁、事件时约三岁”；`PROJECT.md` 将“康熙九年前后”收紧为“康熙九年”。

- [ ] **Step 2: 更新人物算术**

```text
主角 23（1647／事件时3）
沈掌柜 48（1622／事件时28）
小满 16（1654／事件后出生）
周砚秋 23（1647／事件时3）
周母 50（1620／事件时30）
梁老人 75（1595／事件时55）
县署书吏 37（1633／事件时17）
陌生客 38—53
沈掌柜旧友 53—68
西樵僧人／相关僧侣至少53
```

梁老人“十七年前长对白”改为“二十年前长对白”；所有亲历资格与知识边界不变。

- [ ] **Step 3: 迁移广州研究基线文件**

将文件名、标题、状态和正文中的 1667 改为 1670；同步 `AGENT.md` 引用。保留“资料只能证明词物可用，不能证明 1670 某日必然如此”的边界。

- [ ] **Step 4: 更新历史断言台账**

`HIST-003` 的虚构修志语境改为 1670；`HIST-004` 的职业体验边界明确为未证 1670 广州行业通例；`HIST-006` 记录人物网络已按 1670 复核。HIST-001、002、005 的 1650／1653 史料年份不得修改。

- [ ] **Step 5: 更新已批准规格**

P2 增加时间轴候选构建回归；第三章约束、元数据、摹写年代、西樵人物门槛和研究门全部使用 1670。

### Task 4: 完成 RED→GREEN 与全量验证

**Files:**
- Test: `src/lib/story-data.test.ts`
- Test: `src/lib/research-data.test.ts`
- Test: `src/lib/save.test.ts`

**Interfaces:**
- Consumes: Tasks 1—3 的目标文件。
- Produces: 时间一致性、故事数据、研究边界和旧存档兼容证据。

- [ ] **Step 1: 运行时间测试确认 GREEN**

Run: `npx.cmd tsx --test src/lib/story-data.test.ts`

Expected: 新时间校验测试与既有故事数据测试全部 PASS。

- [ ] **Step 2: 运行全量自动化**

Run: `npm.cmd run test`

Expected: 原 28 项加 1 项时间校验测试全部 PASS。

- [ ] **Step 3: 运行静态检查**

Run: `npm.cmd run lint`

Expected: exit 0, no warnings。

Run: `npx.cmd tsc --noEmit --incremental false`

Expected: exit 0。

- [ ] **Step 4: 执行允许清单残留扫描**

Run: `rg -n '康熙六年|1667|十七年前|十七年间|十七年过去|十三岁' AGENT.md PROJECT.md docs/product docs/narrative docs/research docs/superpowers/specs src/app src/components src/story`

Expected: 当前真相与运行时无命中；若史料书目或旧历史记录命中，逐项解释而非机械删除。

- [ ] **Step 5: 保存目标文件 diff 检查点**

Run: `git diff --check -- AGENT.md PROJECT.md docs src/app src/components src/lib/timeline.ts src/lib/story-data.test.ts src/lib/story-validation.ts src/story`

Expected: no whitespace errors。不要暂存或提交。

### Task 5: 验收后回写 Obsidian 台账

**Files:**
- Modify: `C:\Users\UUWayne\Documents\Codex-Obsidian-Knowledge\projects\佣书项目\README.md`
- Modify: `C:\Users\UUWayne\Documents\Codex-Obsidian-Knowledge\projects\佣书项目\decisions.md`
- Modify: `C:\Users\UUWayne\Documents\Codex-Obsidian-Knowledge\projects\佣书项目\log.md`
- Modify: `C:\Users\UUWayne\Documents\Codex-Obsidian-Knowledge\TODO.md`

**Interfaces:**
- Consumes: Task 4 的验证证据和工作室评审。
- Produces: 1670 当前真相、取代决策、实施日志和可追踪任务状态。

- [ ] **Step 1: 更新当前真相**

README 将当前时间改为康熙九年（1670）、主角约 23 岁、距事件二十年，并记录存档 schema 不变。

- [ ] **Step 2: 追加取代决策**

在 decisions 顶部追加“康熙九年（1670）取代误设的康熙六年（1667）”；旧 1667 决策保留并标注已被取代，不静默改写历史。

- [ ] **Step 3: 追加验证日志**

记录修改范围、测试数量、lint、TypeScript、构建／浏览器实际执行范围和仍未完成的 P2 人工门禁。

- [ ] **Step 4: 更新根 TODO**

保留旧 P0 完成项的历史记录并标注被新决策取代；新增或完成 1670 再基线任务。不得修改《苹果落下之前》的 1667 条目。

- [ ] **Step 5: 最终定点检查**

再次读取四份台账目标文件，确认其他项目条目未改变；不要提交、推送或发布。
