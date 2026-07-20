export interface GameVariables {
  paper: number;
  trust: number;
  wage: number;
  trust_yimin: number;
  trust_qing: number;
  trust_priest: number;
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
  hotspots: { id: string; label: string; detail: string }[];
  required: number;
}

export interface ComparisonConfig {
  documents: ManuscriptDocument[];
  question: string;
  options: { id: string; text: string; correct?: boolean; feedback: string }[];
}

export interface AssemblyConfig {
  fragments: { id: string; text: string; order: number }[];
}

export interface StoryChoice {
  id: string;
  text: string;
  effects?: Partial<GameVariables>;
  goto?: string;
}

export interface StoryBeat {
  id: string;
  type?: "dialogue" | "choice" | "title" | "sorting" | "inspection" | "comparison" | "assembly";
  speaker?: string;
  text: string;
  next?: string;
  choices?: StoryChoice[];
  sorting?: SortingConfig;
  inspection?: InspectionConfig;
  comparison?: ComparisonConfig;
  assembly?: AssemblyConfig;
  unlockArchive?: string[];
}

export interface StoryChapter {
  id: string;
  title: string;
  subtitle?: string;
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
  savedAt: number;
}

export const DEFAULT_VARIABLES: GameVariables = {
  paper: 0,
  trust: 0,
  wage: 0,
  trust_yimin: 0,
  trust_qing: 0,
  trust_priest: 0,
};

export const SAVE_KEY = "chronicle-save";
