export interface GameVariables {
  paper: number;
  trust: number;
  wage: number;
  trust_yimin: number;
  trust_qing: number;
  trust_priest: number;
  risk: number;
}

export type FragmentDisposition = "unfiled" | "recorded" | "doubtful" | "sold" | "destroyed" | "transferred";
export type CompilationSection = "main" | "appendix" | "doubtful";
export type ReliabilityLevel = "low" | "medium" | "high";
export type SourceClarity = "unknown" | "unclear" | "identified";
export type TransmissionState = "original" | "copy" | "translated-copy" | "oral";

export interface SourceFragment {
  id: string;
  title: string;
  content: string;
  fragmentary: boolean;
  sourcePerson: string;
  foundAt: string;
  estimatedDate: string;
  medium: string;
  paper: string;
  ink: string;
  handwriting: string;
  marks: string[];
  value: number;
  politicalRisk: number;
  relatedPeople: string[];
  relatedEvents: string[];
  transmission: TransmissionState;
  suggestedInterpretation?: string;
  suggestedMissingEvidence?: string;
}

export interface CompilationEntry {
  fragmentId: string;
  disposition: FragmentDisposition;
  section?: CompilationSection;
  interpretation: string;
  sourceClarity: SourceClarity;
  reliability: ReliabilityLevel;
  missingEvidence: string;
  focused: boolean;
  updatedAt: number;
}

export interface FragmentHistoryEntry {
  fragmentId: string;
  action: FragmentDisposition | "focus" | "unfocus";
  at: number;
}

export interface CompilationState {
  fragments: Record<string, SourceFragment>;
  entries: Record<string, CompilationEntry>;
  history: FragmentHistoryEntry[];
  focusLimit: number;
}

export interface FragmentAction {
  disposition: FragmentDisposition;
  section?: CompilationSection;
  interpretation?: string;
  sourceClarity?: SourceClarity;
  reliability?: ReliabilityLevel;
  missingEvidence?: string;
}

export type LocationStatus = "undiscovered" | "discovered" | "investigated";

export interface MapLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  record: string;
  clue: string;
  investigatedRecord: string;
}

export interface MapConfig {
  available: string[];
  selectable: string[];
  destination?: string;
  confirmLabel?: string;
}

export type DocumentCategory = "家书" | "契约" | "佛经" | "地方志" | "诗稿" | "账本" | "杂纸";

export interface ManuscriptDocument {
  id: string;
  title: string;
  excerpt: string;
  category?: DocumentCategory;
  paper: string;
  ink: string;
  handwriting: string;
  mark?: string;
  clue?: string;
  archiveId?: string;
  anomalous?: boolean;
}

export interface SortingConfig {
  documents: ManuscriptDocument[];
  categories: DocumentCategory[];
  required: number;
}

export interface InspectionConfig {
  document: ManuscriptDocument;
  verso?: string;
  hotspots: {
    id: string;
    label: string;
    detail: string;
    x?: number;
    y?: number;
    side?: "front" | "back";
  }[];
  required: number;
}

export interface ComparisonConfig {
  documents: ManuscriptDocument[];
  question: string;
  options: { id: string; text: string; correct?: boolean; feedback: string }[];
}

export interface AssemblyConfig {
  fragments: { id: string; text: string; back: string; edge: string; order: number }[];
  question: string;
  options: { id: string; text: string; correct?: boolean; feedback: string }[];
  completionClue: string;
}

export interface CompilationConfig {
  fragmentId: string;
  prompt: string;
  routes: Record<string, string>;
  routeEffects?: Record<string, Partial<GameVariables>>;
}

export interface StoryChoice {
  id: string;
  text: string;
  effects?: Partial<GameVariables>;
  goto?: string;
  chapter?: string;
  unlockLocations?: string[];
  fragmentAction?: FragmentAction & { fragmentId: string };
}

export type PlayerNoteType = "observation" | "judgement" | "question" | "to_check" | "clue";

export interface PlayerNote {
  id: string;
  type: PlayerNoteType;
  title: string;
  content: string;
  confidence?: 1 | 2 | 3 | 4 | 5;
  status?: "active" | "resolved";
  sourceBeatId?: string;
}

export interface NoteUpdates {
  add?: PlayerNote[];
  update?: (Partial<PlayerNote> & { id: string })[];
  remove?: string[];
}

export interface StoryBeat {
  id: string;
  type?: "dialogue" | "choice" | "title" | "sorting" | "inspection" | "comparison" | "assembly" | "map" | "compilation";
  speaker?: string;
  text: string;
  terminal?: boolean;
  next?: string;
  choices?: StoryChoice[];
  sorting?: SortingConfig;
  inspection?: InspectionConfig;
  comparison?: ComparisonConfig;
  assembly?: AssemblyConfig;
  compilation?: CompilationConfig;
  map?: MapConfig;
  unlockArchive?: string[];
  noteUpdates?: NoteUpdates;
  locationUpdates?: {
    unlock?: string[];
    investigate?: string[];
    unlockEntrances?: string[];
  };
  grantFragments?: string[];
}

export interface StoryChapter {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  place?: string;
  weather?: string;
  beats: StoryBeat[];
}

export interface SaveData {
  chapterId: string;
  beatIndex: number;
  variables: GameVariables;
  unlockedArchive: string[];
  unlockedCharacters: string[];
  completedActivities: string[];
  clues: string[];
  playerNotes: PlayerNote[];
  unlockedLocations: string[];
  investigatedLocations: string[];
  unlockedEntrances: string[];
  compilation: CompilationState;
  savedAt: number;
}

export const DEFAULT_VARIABLES: GameVariables = {
  paper: 0,
  trust: 0,
  wage: 0,
  trust_yimin: 0,
  trust_qing: 0,
  trust_priest: 0,
  risk: 0,
};

export const SAVE_KEY = "chronicle-save";
