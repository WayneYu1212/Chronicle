# Source Han Serif and Obsidian Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Locally host Source Han Serif SC for all Chronicle typography and record the verified project state, decisions, progress, and open work in the user's Obsidian Vault.

**Architecture:** A versioned WOFF2 asset and license live under `public/fonts/source-han-serif`; global CSS owns the sole font-face and fallback declarations. Project memory remains in the Vault's existing `projects/佣书项目` pages and root `TODO.md`, with facts derived from repository files and Git history.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, CSS `@font-face`, Obsidian Markdown.

## Global Constraints

- Use an official Source Han Serif Simplified Chinese Variable WOFF2 release asset.
- Host the font locally; remove Google Fonts and LXGW WenKai network imports.
- Keep existing typography metrics, page structure, story, and interactions unchanged.
- Preserve the font license alongside the asset.
- Update existing Vault notes instead of creating duplicate project pages.
- Do not modify or discard unrelated working-tree files.

---

### Task 1: Add the local font asset and global declaration

**Files:**
- Create: `public/fonts/source-han-serif/SourceHanSerifSC-VF.woff2`
- Create: `public/fonts/source-han-serif/LICENSE.txt`
- Modify: `src/app/globals.css:1-8`
- Modify: `src/app/layout.tsx:17-26`

**Interfaces:**
- Consumes: `assetPath(path: string): string` from `src/lib/assets.ts` for GitHub Pages base-path support.
- Produces: CSS custom property `--source-han-serif-url` and font family `Source Han Serif SC` used by `--font-title` and `--font-body`.

- [ ] **Step 1: Record the official release identity**

Query the official GitHub release API and record the selected tag, asset URL, byte size, and SHA-256 digest in the implementation notes.

- [ ] **Step 2: Download the font and license**

Download only the Simplified Chinese Variable WOFF2 release asset and official `LICENSE.txt` into `public/fonts/source-han-serif/`.

- [ ] **Step 3: Verify the downloaded files**

Run:

```powershell
Get-Item public/fonts/source-han-serif/* | Select-Object Name,Length
Get-FileHash public/fonts/source-han-serif/SourceHanSerifSC-VF.woff2 -Algorithm SHA256
```

Expected: both files are non-empty and the font has a stable SHA-256 digest.

- [ ] **Step 4: Inject the base-path-safe font URL**

Extend `assetVars` in `src/app/layout.tsx` with:

```tsx
"--source-han-serif-url": `url("${assetPath("/fonts/source-han-serif/SourceHanSerifSC-VF.woff2")}")`,
```

- [ ] **Step 5: Replace remote imports with the local face**

At the top of `src/app/globals.css`, use:

```css
@font-face {
  font-family: "Source Han Serif SC";
  src: var(--source-han-serif-url) format("woff2-variations");
  font-style: normal;
  font-weight: 200 900;
  font-display: swap;
}
```

Set both typography variables to:

```css
--font-title:"Source Han Serif SC","Songti SC","SimSun",serif;
--font-body:"Source Han Serif SC","Songti SC","SimSun",serif;
```

- [ ] **Step 6: Run static verification**

Run:

```powershell
rg -n "fonts.googleapis.com|lxgw-wenkai|Noto Serif SC" src
rg -n "Source Han Serif SC|source-han-serif-url" src/app
npm run lint
npm run build
```

Expected: the first search returns no matches; the second finds the face, variables, and URL; lint and build exit successfully.

### Task 2: Update the Obsidian project memory

**Files:**
- Modify: `C:/Users/UUWayne/Documents/Codex-Obsidian-Knowledge/projects/佣书项目/README.md`
- Modify: `C:/Users/UUWayne/Documents/Codex-Obsidian-Knowledge/projects/佣书项目/decisions.md`
- Modify: `C:/Users/UUWayne/Documents/Codex-Obsidian-Knowledge/projects/佣书项目/log.md`
- Modify: `C:/Users/UUWayne/Documents/Codex-Obsidian-Knowledge/TODO.md`

**Interfaces:**
- Consumes: verified repository state from `AGENT.md`, `PROJECT.md`, `README.md`, `package.json`, `src/story`, and Git history.
- Produces: a current project index, dated decision log, dated progress log, and actionable global TODO list linked with Obsidian Wiki Links.

- [ ] **Step 1: Rewrite the project index**

Set `updated: 2026-07-26`; document the portfolio-demo goal, Chapter One scope, historical-interactive-narrative identity, current Next.js stack, completed map/route work, and immediate next steps.

- [ ] **Step 2: Record confirmed decisions**

Add dated entries covering: Chapter One quality over additional chapters; work actions rather than dialogue as the narrative engine; book/manuscript visual language; local Source Han Serif hosting. Each entry includes decision, rationale, and consequence.

- [ ] **Step 3: Extend the progress log**

Record repository-backed milestones through commit `010f06e`, plus the selected Source Han Serif release version, downloaded asset digest, code verification results, and modified files.

- [ ] **Step 4: Reconcile the root TODO list**

Mark the 佣书 background task complete and retain it under 已完成. Add unchecked tasks for desktop/mobile font visual regression, a full Chapter One playthrough, performance review of the font payload, and confirmation of whether Chapter Two routes remain exploratory or enter active scope.

- [ ] **Step 5: Validate note structure**

Run:

```powershell
rg -n "updated: 2026-07-26|\[\[projects/佣书项目|Source Han Serif|思源宋体" C:/Users/UUWayne/Documents/Codex-Obsidian-Knowledge/projects/佣书项目 C:/Users/UUWayne/Documents/Codex-Obsidian-Knowledge/TODO.md
```

Expected: all four files show the updated date and project links/typography decision appear in their appropriate pages.

### Task 3: Final verification and scoped commit

**Files:**
- Verify: all files from Tasks 1 and 2
- Modify: `docs/superpowers/plans/2026-07-26-source-han-serif-and-obsidian.md` checkboxes only

**Interfaces:**
- Consumes: Task 1 build result and Task 2 note validation.
- Produces: a verified implementation commit in Chronicle; the Vault remains a separate Git repository and is committed separately only if its status contains solely the intended note edits.

- [ ] **Step 1: Inspect scoped diffs**

Run `git diff --check` and inspect only intended Chronicle paths. Run `git -C C:/Users/UUWayne/Documents/Codex-Obsidian-Knowledge diff --check` and inspect only the four intended note paths.

- [ ] **Step 2: Re-run required verification**

Run `npm run lint`, `npm run build`, the remote-font search, and both Vault structure searches from Tasks 1 and 2.

- [ ] **Step 3: Commit Chronicle changes**

Stage only the plan, local font directory, `src/app/layout.tsx`, and `src/app/globals.css`; commit with `feat: use locally hosted Source Han Serif`.

- [ ] **Step 4: Commit Vault changes if safely isolated**

If the Vault diff contains only the four intended files, stage those paths and commit with `docs: update Chronicle project memory`. If unrelated changes exist, leave all Vault changes unstaged and report them.
