export interface GameVariables {
  paper: number;
  trust: number;
  trust_yimin: number;
  trust_qing: number;
  trust_priest: number;
}

export interface StoryChoice {
  id: string;
  text: string;
  effects?: Partial<GameVariables>;
  goto?: string;
}

export interface StoryBeat {
  id: string;
  type?: "dialogue" | "choice" | "title";
  speaker?: string;
  text: string;
  next?: string;
  choices?: StoryChoice[];
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
  savedAt: number;
}

export const DEFAULT_VARIABLES: GameVariables = {
  paper: 0,
  trust: 0,
  trust_yimin: 0,
  trust_qing: 0,
  trust_priest: 0,
};

export const SAVE_KEY = "chronicle-save";
