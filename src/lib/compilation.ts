import type {
  CompilationEntry,
  CompilationState,
  FragmentAction,
  FragmentDisposition,
  SourceFragment,
} from "../types/game";

const LOST_DISPOSITIONS = new Set<FragmentDisposition>(["sold", "destroyed", "transferred"]);

export function createCompilationEntry(fragmentId: string): CompilationEntry {
  return {
    fragmentId,
    disposition: "unfiled",
    interpretation: "",
    sourceClarity: "unknown",
    reliability: "low",
    missingEvidence: "",
    focused: false,
    updatedAt: Date.now(),
  };
}

export function createEmptyCompilationState(): CompilationState {
  return { fragments: {}, entries: {}, history: [], focusLimit: 2 };
}

export function migrateCompilationState<T extends Record<string, unknown>>(data: T): T & { compilation: CompilationState } {
  const existing = data.compilation as CompilationState | undefined;
  return {
    ...data,
    compilation: existing
      ? {
          fragments: existing.fragments ?? {},
          entries: existing.entries ?? {},
          history: existing.history ?? [],
          focusLimit: existing.focusLimit ?? 2,
        }
      : createEmptyCompilationState(),
  };
}

export function grantFragments(state: CompilationState, fragments: SourceFragment[]): CompilationState {
  if (!fragments.length) return state;
  const nextFragments = { ...state.fragments };
  const nextEntries = { ...state.entries };
  for (const fragment of fragments) {
    nextFragments[fragment.id] = { ...nextFragments[fragment.id], ...fragment };
    nextEntries[fragment.id] ??= createCompilationEntry(fragment.id);
  }
  return { ...state, fragments: nextFragments, entries: nextEntries };
}

export function applyFragmentAction(
  state: CompilationState,
  fragmentId: string,
  action: FragmentAction,
): CompilationState {
  const fragment = state.fragments[fragmentId];
  if (!fragment) throw new Error(`找不到史料：${fragmentId}`);
  const current = state.entries[fragmentId] ?? createCompilationEntry(fragmentId);
  if (LOST_DISPOSITIONS.has(current.disposition) && action.disposition !== current.disposition) {
    throw new Error("这份史料已经永久离手，无法重新收入长编。");
  }
  if ((action.disposition === "recorded" || action.disposition === "doubtful") && !action.section) {
    throw new Error("收入长编时必须指定正文、附录或存疑卷。");
  }
  const now = Date.now();
  return {
    ...state,
    entries: {
      ...state.entries,
      [fragmentId]: {
        ...current,
        ...action,
        focused: LOST_DISPOSITIONS.has(action.disposition) ? false : current.focused,
        section: action.disposition === "unfiled" ? undefined : action.section ?? current.section,
        updatedAt: now,
      },
    },
    history: [...state.history, { fragmentId, action: action.disposition, at: now }],
  };
}

export function toggleFocus(state: CompilationState, fragmentId: string): CompilationState {
  const entry = state.entries[fragmentId] ?? createCompilationEntry(fragmentId);
  if (LOST_DISPOSITIONS.has(entry.disposition)) throw new Error("已经离手的史料不能加朱记。");
  const nextFocused = !entry.focused;
  const focusedCount = Object.values(state.entries).filter((item) => item.focused).length;
  if (nextFocused && focusedCount >= state.focusLimit) {
    throw new Error(`朱记最多保留 ${state.focusLimit} 处。`);
  }
  const now = Date.now();
  return {
    ...state,
    entries: { ...state.entries, [fragmentId]: { ...entry, focused: nextFocused, updatedAt: now } },
    history: [...state.history, { fragmentId, action: nextFocused ? "focus" : "unfocus", at: now }],
  };
}

export function resolveCompilationRoute(
  state: CompilationState,
  fragmentId: string,
  routes: Record<string, string>,
): string | undefined {
  const entry = state.entries[fragmentId];
  if (!entry || entry.disposition === "unfiled") return undefined;
  const exact = entry.section ? `${entry.disposition}:${entry.section}` : entry.disposition;
  return routes[exact] ?? routes[entry.disposition];
}

export function preserveCompilationProgress<
  T extends { compilation: CompilationState; variables: { wage: number; risk: number } },
>(previous: T, current: T): T {
  return {
    ...previous,
    compilation: current.compilation,
    variables: {
      ...previous.variables,
      wage: current.variables.wage,
      risk: current.variables.risk,
    },
  };
}
