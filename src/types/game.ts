export interface GameVariables {
  paper: number;
  trust: number;
  trust_people: number;
  wage: number;
  trust_yimin: number;
  trust_qing: number;
  trust_priest: number;
  risk: number;
}

export type FragmentDisposition =
  | "unfiled"
  | "recorded"
  | "doubtful"
  | "sold"
  | "destroyed"
  | "transferred"
  | "retained-illicit"
  | "retained-mei"
  | "transferred-bookshop"
  | "transferred-sealed"
  | "joint-custody";
export type CompilationSection = "main" | "appendix" | "doubtful";
export type ReliabilityLevel = "low" | "medium" | "high";
export type SourceClarity = "unknown" | "unclear" | "identified";
export type TransmissionState = "original" | "copy" | "translated-copy" | "oral" | "oral-copy";

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

export interface EvidenceConclusion {
  title: string;
  text: string;
  actionLabel?: string;
  clue?: string;
}

export interface ComparisonConfig {
  documents: ManuscriptDocument[];
  question: string;
  options?: { id: string; text: string; correct?: boolean; feedback: string }[];
  conclusion?: EvidenceConclusion;
  completionClue?: string;
}

export interface AssemblyTile {
  id: string;
  text: string;
  back: string;
  edge: string;
  order: number;
}

export interface AssemblyConfig {
  fragments: { id: string; text: string; back: string; edge: string; order: number }[];
  grid?: { rows: number; columns: number };
  tiles?: AssemblyTile[];
  question: string;
  options?: { id: string; text: string; correct?: boolean; feedback: string }[];
  conclusion?: EvidenceConclusion;
  completionClue: string;
}

export interface ActivityOption {
  id: string;
  text: string;
  correct?: boolean;
  feedback?: string;
}

export interface EdgeMatchConfig {
  samples: { id: string; title: string; features: string[]; source: string }[];
  correctMatches: { from: string; to: string; strength: string; note: string }[];
  completion: string;
}

export interface TranscriptionConfig {
  slots: number;
  items: { id: string; text: string; priority: string }[];
  successCondition: string;
  failureConsequence: string;
}

export interface PackingConfig {
  capacity: number;
  items: { id: string; need: string; risk: string; originalRequired: boolean }[];
  storageOptions: { id: string; label: string; strength: string }[];
  completion: string;
}

export interface AlignmentConfig {
  columns: string[];
  items: { id: string; text: string; source: string; column: string }[];
  rule: string;
  completion: string;
}

export interface ExplorationConfig {
  actionLimit: number;
  spots: { id: string; label: string; detail: string }[];
  successCondition: string;
  completion: string;
}

export interface InterviewPlanConfig {
  slots: number;
  questions: { id: string; text: string; quality: string }[];
  successCondition: string;
  completion: string;
}

export interface DeductionConfig {
  timeline: string[];
  persons: { id: string; name: string; access: string[]; known: string }[];
  evidence: { id: string; text: string }[];
  correctInference: string;
}

export interface StateSummaryConfig {
  variants: { condition: string; text: string }[];
  common: string;
}

export interface SearchConfig {
  items: { id: string; title: string; clues: string[]; result: string }[];
  protocol: string[];
  completion: string;
}

export interface SpatialReconstructionConfig {
  layers: { id: string; title: string; date: string; features: string[] }[];
  zones: { id: string; label: string; classification: string }[];
  completion: string;
}

export interface FacsimileLayoutConfig {
  options: ActivityOption[];
  completion: string;
}

export interface InterviewConfig {
  rounds: { category?: string; prompt?: string; question: string; answer: string; transcriptions?: string[] }[];
  forbiddenPrompts?: string[];
  successCondition?: string;
  completion: string;
}

export interface AssociationConfig {
  aliases: { id: string; alias: string; candidates: string[]; evidence: string }[];
  rules: string[];
  completion: string;
}

export interface AccessProtocolConfig {
  witnessOptions: string[];
  copyOptions: string[];
  oralOptions: string[];
  custodyOptions: string[];
  hardRules: string[];
}

export interface AccessLogConfig {
  date: string;
  viewer: string;
  materials: string[];
  conditions: string[];
  result: string;
}

export interface RedactionConfig {
  entries: { id: string; name: string; role: string; options: string[] }[];
  requiredFields: string[];
  consequence: string;
}

export interface ChronicleDraftConfig {
  sections: { id: string; title: string; slots: number }[];
  eligibleFragments: string[];
  constraints: string[];
  sampleValidOutput: string;
  completion: string;
}

export interface VersioningConfig {
  baseVersion: string;
  suggestions: { id: string; author: string; change: string; evidence: string }[];
  rule: string;
  completion: string;
}

export type CustomActivityType =
  | "edge_match"
  | "transcription"
  | "packing"
  | "alignment"
  | "exploration"
  | "interview_plan"
  | "deduction"
  | "state_summary"
  | "search"
  | "spatial_reconstruction"
  | "facsimile_layout"
  | "interview"
  | "association"
  | "access_protocol"
  | "access_log"
  | "redaction"
  | "chronicle_draft"
  | "versioning";

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
  locationUpdates?: {
    unlock?: string[];
    investigate?: string[];
    unlockEntrances?: string[];
  };
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
  type?: "dialogue" | "choice" | "title" | "sorting" | "inspection" | "comparison" | "assembly" | "map" | "compilation" | CustomActivityType;
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
  edge_match?: EdgeMatchConfig;
  transcription?: TranscriptionConfig;
  packing?: PackingConfig;
  alignment?: AlignmentConfig;
  exploration?: ExplorationConfig;
  interview_plan?: InterviewPlanConfig;
  deduction?: DeductionConfig;
  state_summary?: StateSummaryConfig;
  search?: SearchConfig;
  spatial_reconstruction?: SpatialReconstructionConfig;
  facsimile_layout?: FacsimileLayoutConfig;
  interview?: InterviewConfig;
  association?: AssociationConfig;
  access_protocol?: AccessProtocolConfig;
  access_log?: AccessLogConfig;
  redaction?: RedactionConfig;
  chronicle_draft?: ChronicleDraftConfig;
  versioning?: VersioningConfig;
  fragmentAction?: FragmentAction & { fragmentId: string };
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
  trust_people: 0,
  wage: 0,
  trust_yimin: 0,
  trust_qing: 0,
  trust_priest: 0,
  risk: 0,
};

export const SAVE_KEY = "chronicle-save";
