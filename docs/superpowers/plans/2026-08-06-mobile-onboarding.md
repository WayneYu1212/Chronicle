# Mobile Onboarding and Layout Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a concise first-run tutorial that explains the reading page, 手札, and 长编, while making the existing book shell stable at mobile widths.

**Architecture:** Keep tutorial copy and versioned browser completion state in a small `src/lib/tutorial.ts` module. Render a controlled `TutorialOverlay` from the existing `BookShell`, with `game/page.tsx` deciding when the first-run overlay appears and when completion is persisted. Apply focused CSS changes to the existing mobile breakpoints; do not add a bottom navigation item or modify story/save data.

**Tech Stack:** Next.js 15.5.21, React 19, TypeScript, CSS, Node test runner via `tsx`.

## Global Constraints

- Every tutorial title and description must remain at or below 30 characters.
- The tutorial must explicitly say that 手札 records observations, questions, and clues.
- The tutorial must explicitly say that 长编 organizes materials and records sources and judgments.
- The tutorial uses `chronicle-tutorial-v1` in browser storage and does not change the game save schema.
- Do not modify `src/story/*.json`, `src/types/game.ts`, `ActivityStage.tsx`, or unrelated dirty-worktree files.
- Do not add a bottom navigation item; use a compact `?` help trigger so narrow screens do not wrap the ribbon bar.
- Mobile acceptance includes approximately 390px portrait and landscape widths with no horizontal overflow.
- Preserve the existing Chinese system font fallback chain and manuscript visual direction.

---

### Task 1: Establish the tutorial contract and browser-state helpers

**Files:**
- Create: `src/lib/tutorial.ts`
- Create: `src/lib/tutorial.test.ts`

**Interfaces:**
- Produces `TUTORIAL_STORAGE_KEY: "chronicle-tutorial-v1"`.
- Produces `TUTORIAL_STEPS: readonly TutorialStep[]` with four `{ id, title, body }` entries.
- Produces `hasCompletedTutorial(value: string | null): boolean`.
- Produces `markTutorialComplete(storage: Pick<Storage, "setItem">): void`.
- Produces `readTutorialCompletion(): boolean` and `saveTutorialCompletion(): void`, both safe when `window` or `localStorage` is unavailable.
- Produces `shouldAutoOpenTutorial(pageReady: boolean, completed: boolean): boolean`.

- [ ] **Step 1: Write the failing tests**

  Add tests that assert the required copy and state behavior:

  ```ts
  import test from "node:test";
  import assert from "node:assert/strict";
  import {
    TUTORIAL_STEPS,
    hasCompletedTutorial,
    markTutorialComplete,
  } from "./tutorial";

  test("tutorial copy explains the two notebook views within 30 characters", () => {
    const copy = TUTORIAL_STEPS.flatMap((step) => [step.title, step.body]);
    assert.equal(TUTORIAL_STEPS.length, 4);
    assert.ok(copy.every((text) => Array.from(text).length <= 30));
    assert.ok(copy.some((text) => text.includes("手札") && text.includes("线索")));
    assert.ok(copy.some((text) => text.includes("长编") && text.includes("来源")));
  });

  test("tutorial completion recognizes only the current stored value", () => {
    assert.equal(hasCompletedTutorial("done"), true);
    assert.equal(hasCompletedTutorial(null), false);
    assert.equal(hasCompletedTutorial("chronicle-tutorial-v0"), false);
  });

  test("marking tutorial complete writes the versioned completion value", () => {
    let value = "";
    markTutorialComplete({ setItem: (_key, next) => { value = next; } });
    assert.equal(value, "done");
  });
  ```

- [ ] **Step 2: Run the focused test to verify it fails**

  Run: `npm.cmd test -- src/lib/tutorial.test.ts`

  Expected: FAIL because `src/lib/tutorial.ts` and its exported tutorial contract do not exist yet.

- [ ] **Step 3: Implement the minimal contract**

  Add the four short steps from the approved design:

  ```ts
  export const TUTORIAL_STEPS = [
    { id: "reading", title: "先看正文，再做选择", body: "人物名在左，“旁白”记录你的所见。" },
    { id: "notes", title: "手札：记下所见所疑", body: "手札记录观察、疑问和线索。" },
    { id: "compilation", title: "长编：整理史料判断", body: "长编整理材料，填写来源和判断。" },
    { id: "navigation", title: "点页翻读，底栏导航", body: "点正文翻页；底栏可打开其他页面。" },
  ] as const;
  ```

  Keep browser access behind `typeof window !== "undefined"`, catch storage access errors, and make `markTutorialComplete` write `TUTORIAL_STORAGE_KEY` with `"done"`.

- [ ] **Step 4: Run the focused test to verify it passes**

  Run: `npm.cmd test -- src/lib/tutorial.test.ts`

  Expected: the tutorial copy and storage helper tests pass with zero failures.

- [ ] **Step 5: Commit the isolated contract**

  ```powershell
  git add -- src/lib/tutorial.ts src/lib/tutorial.test.ts
  git commit -m "feat: add concise tutorial contract"
  ```

### Task 2: Build the accessible tutorial overlay

**Files:**
- Create: `src/components/TutorialOverlay.tsx`

**Interfaces:**
- Consumes `TUTORIAL_STEPS` from `src/lib/tutorial.ts`.
- Accepts `{ open: boolean; onClose: () => void; onComplete: () => void }`.
- Produces a four-step `role="dialog"` with previous, next, close, and final completion actions.

- [ ] **Step 1: Add the controlled overlay skeleton**

  Render nothing when `open` is false. When open, render a fixed backdrop and a dialog containing the current step title/body, `1 / 4` progress text, a close button, and a primary next/complete button. Use `aria-labelledby`, `aria-describedby`, `aria-live="polite"`, and a visible heading.

- [ ] **Step 2: Implement step transitions and focus behavior**

  Keep `stepIndex` in component state, reset it to `0` whenever the overlay opens, disable the previous button on step 1, label the last primary action `知道了`, and call `onComplete` only from that final action. Focus the close button on open and let the parent restore focus to the `?` trigger after close.

- [ ] **Step 3: Add the overlay styles**

  Add CSS in `src/app/globals.css` for a centered paper-toned dialog, a dim backdrop, 44px minimum controls, `max-width: 520px`, `max-height: calc(100dvh - 32px)`, `overflow-y: auto`, and `overflow-x: hidden`. Include a reduced-motion rule through the existing global preference handling.

- [ ] **Step 4: Run lint and the focused test**

  Run: `npm.cmd run lint` and `npm.cmd test -- src/lib/tutorial.test.ts`

  Expected: no lint errors and the tutorial contract tests remain green.

### Task 3: Connect first-run timing, help access, and reading labels

**Files:**
- Modify: `src/components/BookShell.tsx`
- Modify: `src/app/game/page.tsx`
- Modify: `src/components/ManuscriptPage.tsx`

**Interfaces:**
- `BookShell` receives `tutorialOpen`, `showTutorialHelp`, `onOpenTutorial`, and `tutorial` props, renders a compact `?` button, and returns focus to that button when the overlay closes.
- `GamePage` uses `readTutorialCompletion` and `saveTutorialCompletion`; it does not write tutorial state into `SaveData`.
- `ManuscriptPage` displays the explicit label `旁白` for narrator beats while preserving speaker names for dialogue.

- [ ] **Step 1: Add the failing integration expectation**

  Extend `src/lib/tutorial.test.ts` with the readiness decision used by the page:

  ```ts
  import { shouldAutoOpenTutorial } from "./tutorial";

  test("auto tutorial waits for the book and skips completed players", () => {
    assert.equal(shouldAutoOpenTutorial(false, false), false);
    assert.equal(shouldAutoOpenTutorial(true, false), true);
    assert.equal(shouldAutoOpenTutorial(true, true), false);
  });
  ```

  Run: `npm.cmd test -- src/lib/tutorial.test.ts`

  Expected: FAIL because `shouldAutoOpenTutorial` is not exported yet.

- [ ] **Step 2: Implement the readiness helper and wire the `?` trigger**

  Add `shouldAutoOpenTutorial(pageReady, completed) { return pageReady && !completed; }` to `src/lib/tutorial.ts`, then add a `tutorial-trigger` button outside the bottom ribbon list with `aria-label="打开新手指引"`, `title="新手指引"`, and a ref. Render the controlled overlay as a sibling of the book. Hide the trigger on the flyleaf by passing `showTutorialHelp={false}` from the game page during the opening animation.

- [ ] **Step 3: Show the tutorial once after the book is ready**

  In `GameContent`, keep a ref so the readiness effect runs once per mounted game. After `save` exists and `showFlyleaf` is false, call `readTutorialCompletion()` and open the overlay only when it is false. The manual `?` action opens it regardless of completion; the final `知道了` action calls `saveTutorialCompletion()` and closes it. Closing early does not mark it complete.

- [ ] **Step 4: Make narrator identity explicit**

  Change the existing narrator display mapping from `记` to `旁白`, retaining `speaker="我"` and named character speakers. Do not edit story JSON.

- [ ] **Step 5: Run the focused test and lint**

  Run: `npm.cmd test -- src/lib/tutorial.test.ts` and `npm.cmd run lint`

  Expected: tests pass and ESLint reports zero warnings/errors.

- [ ] **Step 6: Commit the connected UI behavior**

  ```powershell
  git add -- src/components/BookShell.tsx src/app/game/page.tsx src/components/ManuscriptPage.tsx src/components/TutorialOverlay.tsx src/app/globals.css src/lib/tutorial.ts src/lib/tutorial.test.ts
  git commit -m "feat: add first-run reading tutorial"
  ```

### Task 4: Harden the mobile book shell

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Keeps the existing `max-width: 900px`, `600px`, `480px`, and `420px` responsive behavior.
- Adds safe dynamic viewport sizing and width containment for the book page, mobile notebook leaf, tutorial overlay, bottom ribbons, and long activity content.

- [ ] **Step 1: Add mobile containment rules**

  Within the existing media queries, update the mobile book height to use `min-height: calc(100svh - 80px)` and `height: calc(100dvh - 80px)` with a fallback order. Add `min-width: 0`, `max-width: 100%`, and `overflow-x: hidden` to the relevant scroll containers. Keep `overflow-y: auto` for the page and notebook content.

- [ ] **Step 2: Protect the bottom navigation and safe area**

  Add bottom padding using `env(safe-area-inset-bottom)` without changing the number or order of existing ribbon controls. Ensure the ribbons use `max-width: calc(100vw - 16px)` and never create a horizontal scrollbar.

- [ ] **Step 3: Check CSS formatting and focused tests**

  Run: `git diff --check`, `npm.cmd test -- src/lib/tutorial.test.ts`, and `npm.cmd run lint`

  Expected: no whitespace errors, all tutorial tests pass, and lint remains clean.

- [ ] **Step 4: Commit the responsive fixes**

  ```powershell
  git add -- src/app/globals.css
  git commit -m "fix: stabilize mobile book layout"
  ```

### Task 5: Full verification, browser checks, ledger update, and publish

**Files:**
- Read/verify: all changed source files, `git diff --check`, and existing tests.
- Update after acceptance only: `C:\Users\UUWayne\Documents\Codex-Obsidian-Knowledge\projects\佣书项目\README.md`, `decisions.md`, `log.md`, and root `TODO.md`.

- [ ] **Step 1: Run the complete automated checks**

  Run: `npm.cmd test`, `npm.cmd run lint`, `npx.cmd tsc --noEmit --incremental false`, and `npm.cmd run build`.

  Expected: every command exits 0. If the tracked `.next` directory causes a Windows file-lock failure, run the same build in a clean temporary copy and report it as an environment limitation rather than changing unrelated generated files.

- [ ] **Step 2: Run browser acceptance at desktop and mobile widths**

  Start the app with `npm.cmd run dev -- --hostname 127.0.0.1`, then inspect `/Chronicle/game?mode=new` or the configured local route in the in-app browser. Verify the tutorial appears after the flyleaf, all copy is short, the `?` trigger reopens it, focus returns after closing, and the final action suppresses it after refresh.

  Verify at approximately 1280px desktop, 390px portrait, 390px landscape, and a narrow 360px viewport: no horizontal overflow, no clipped dialog, no wrapped/ragged bottom ribbons, scrollable long content, working 手札/长编 tabs, explicit `旁白` label, and unchanged desktop two-page reading.

- [ ] **Step 3: Perform an independent review pass**

  Check the implementation against every design acceptance criterion, inspect `git status --short`, and confirm no `src/story/*.json`, `.next`, `out`, `tsconfig.tsbuildinfo`, or unrelated user file is staged. Record browser/device gaps honestly; automated browser checks do not replace final iPhone/Android touch confirmation.

- [ ] **Step 4: Update the Chronicle ledger after acceptance**

  Append the verified tutorial/layout change and evidence to the project `README.md`, add the approved UI/storage decision to `decisions.md`, append the test/build/browser result to `log.md`, and leave P2 manual/Android items open in `TODO.md` unless the evidence actually closes them.

- [ ] **Step 5: Commit ledger updates and publish the requested online update**

  Stage only the four ledger files if they changed, commit them with `docs: record mobile onboarding release`, then inspect the current branch and remote. Push the current `codex/0731-acceptance-narrative-visual` branch only if it is the repository’s configured Pages source; otherwise follow the existing GitHub Actions/Pages source branch documented in the repository. Confirm the push result and the corresponding GitHub Actions deployment status before reporting the online update.
