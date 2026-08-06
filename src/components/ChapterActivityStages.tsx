"use client";

import { useState, type ReactNode } from "react";
import type {
  AccessLogConfig,
  AccessProtocolConfig,
  ActivityOption,
  AlignmentConfig,
  AssociationConfig,
  ChronicleDraftConfig,
  CustomActivityType,
  DeductionConfig,
  EdgeMatchConfig,
  ExplorationConfig,
  FacsimileLayoutConfig,
  GameVariables,
  InterviewConfig,
  InterviewPlanConfig,
  PackingConfig,
  RedactionConfig,
  SearchConfig,
  SpatialReconstructionConfig,
  StateSummaryConfig,
  StoryBeat,
  TranscriptionConfig,
  VersioningConfig,
} from "@/types/game";
import SentenceText from "./SentenceText";

export interface ChapterActivityResult {
  clues?: string[];
  effects?: Partial<GameVariables>;
}

interface ChapterActivityProps {
  beat: StoryBeat;
  onComplete: (result: ChapterActivityResult) => void;
}

const CUSTOM_ACTIVITY_TYPES = new Set<CustomActivityType>([
  "edge_match",
  "transcription",
  "packing",
  "alignment",
  "exploration",
  "interview_plan",
  "deduction",
  "state_summary",
  "search",
  "spatial_reconstruction",
  "facsimile_layout",
  "interview",
  "association",
  "access_protocol",
  "access_log",
  "redaction",
  "chronicle_draft",
  "versioning",
]);

export function isCustomActivityType(type: StoryBeat["type"]): type is CustomActivityType {
  return typeof type === "string" && CUSTOM_ACTIVITY_TYPES.has(type as CustomActivityType);
}

export function customActivityCompletion(beat: StoryBeat): string | undefined {
  const type = beat.type;
  if (!isCustomActivityType(type)) return undefined;
  const config = (beat as unknown as Record<string, unknown>)[type];
  if (!config || typeof config !== "object") return undefined;
  const completion = (config as { completion?: unknown }).completion;
  return typeof completion === "string" ? completion : undefined;
}

function Frame({ title, progress, children }: { title: string; progress?: string; children: ReactNode }) {
  return (
    <section className="activity chapter-activity" aria-label={title}>
      <div className="activity-heading"><span>{title}</span>{progress && <strong>{progress}</strong>}</div>
      {children}
    </section>
  );
}

function Complete({ label = "记录并继续", onClick }: { label?: string; onClick: () => void }) {
  return <button type="button" className="seal-action chapter-activity__complete" onClick={onClick}><span>录</span>{label}</button>;
}

function Feedback({ children }: { children: ReactNode }) {
  return <p className="work-feedback chapter-activity__feedback" aria-live="polite">{children}</p>;
}

function EdgeMatchActivity({ config, onComplete }: { config: EdgeMatchConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [choice, setChoice] = useState<string | null>(null);
  const correct = choice === "outer-layer";
  const options = [
    { id: "outer-layer", text: "只把蓝线包外层与潮州外包摹形相接，保留包内单页未知。", correct: true },
    { id: "folio-direct", text: "把蓝线外包摹形直接接到第十三页，认定第十三页就在包内。" },
    { id: "same-paper", text: "四个样本都来自同一册，只需记成同纸。" },
  ];
  return <Frame title="边角比对" progress={choice ? (correct ? "可记录" : "需修正") : "先看外层"}>
    <p className="activity-copy">把外包边角、包内页角和旧夹页分开比对。边缘关系能缩小范围，不能替所有纸张认亲。</p>
    <div className="chapter-activity__cards">{config.samples.map((sample) => <article className="chapter-activity__card" key={sample.id}><small>{sample.source}</small><strong>{sample.title}</strong><p>{sample.features.join(" · ")}</p></article>)}</div>
    <div className="chapter-activity__choices">{options.map((option) => <button type="button" key={option.id} className={`chapter-activity__choice ${choice === option.id ? "is-selected" : ""}`} onClick={() => setChoice(option.id)}>{option.text}</button>)}</div>
    <Feedback>{choice ? (correct ? "外层摹形只支持同一包的后续核验；第十三页仍需独立证据。" : "这会把外包关系扩大成包内单页关系，退回重写。") : "先选一条最窄的可复核结论。"}</Feedback>
    {correct && <Complete onClick={() => onComplete({ clues: [config.completion] })} />}
  </Frame>;
}

function TranscriptionActivity({ config, onComplete }: { config: TranscriptionConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const critical = config.items.filter((item) => selected.includes(item.id) && item.priority === "critical").length;
  const trace = config.items.some((item) => selected.includes(item.id) && item.priority !== "low");
  const complete = selected.length === config.slots && critical >= 5 && trace;
  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < config.slots ? [...current, id] : current);
  return <Frame title="限时誊录" progress={`${selected.length}/${config.slots}`}>
    <p className="activity-copy">巡检封簿前只能留下六条。优先保留数量、两次到岸、同柜验边和后补层，再给经手人留一处可追索的位置。</p>
    <div className="chapter-activity__list">{config.items.map((item) => <button type="button" key={item.id} className={`chapter-activity__choice ${selected.includes(item.id) ? "is-selected" : ""}`} onClick={() => toggle(item.id)}><span className={`chapter-activity__tag chapter-activity__tag--${item.priority}`}>{item.priority}</span>{item.text}</button>)}</div>
    <Feedback>{complete ? "摘要同时保住了五条关键层次和一条经手线索。" : `${critical}/5 条关键层次；还要保留一条非低优先级的来源信息。`}</Feedback>
    {complete && <Complete onClick={() => onComplete({ clues: [config.successCondition] })} />}
  </Frame>;
}

function PackingActivity({ config, onComplete }: { config: PackingConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [storage, setStorage] = useState(config.storageOptions[0]?.id ?? "");
  const requiredPresent = config.items.filter((item) => item.originalRequired).every((item) => selected.includes(item.id));
  const complete = selected.length > 0 && selected.length <= config.capacity && requiredPresent && Boolean(storage);
  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < config.capacity ? [...current, id] : current);
  return <Frame title="行装与寄存" progress={`${selected.length}/${config.capacity}`}>
    <p className="activity-copy">把真正要随身带走的材料和寄存物分开。已经离手的原件只能带摹本或收条，不能在清单里凭空复活。</p>
    <div className="chapter-activity__list">{config.items.map((item) => <button type="button" key={item.id} className={`chapter-activity__choice ${selected.includes(item.id) ? "is-selected" : ""}`} onClick={() => toggle(item.id)}><strong>{item.id}</strong><span>{item.need}</span><small>风险：{item.risk}{item.originalRequired ? " · 必须随身" : ""}</small></button>)}</div>
    <label className="chapter-activity__field">其余材料寄存在
      <select value={storage} onChange={(event) => setStorage(event.target.value)}>{config.storageOptions.map((option) => <option value={option.id} key={option.id}>{option.label} · {option.strength}</option>)}</select>
    </label>
    <Feedback>{complete ? "随身包、寄存处和副本边界都已写明。" : requiredPresent ? "数量或寄存地点还没有定妥。" : "先把必带的目验摘要放进随身包。"}</Feedback>
    {complete && <Complete onClick={() => onComplete({ clues: [config.completion] })} />}
  </Frame>;
}

function AlignmentActivity({ config, onComplete }: { config: AlignmentConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [columns, setColumns] = useState<Record<string, string>>({});
  const complete = config.items.every((item) => columns[item.id]);
  const correct = config.items.filter((item) => columns[item.id] === item.column).length;
  return <Frame title="译抄对读" progress={`${correct}/${config.items.length}`}>
    <p className="activity-copy">同一栏可以并列不同文本。把数量、时序、城市状态和传闻层分开，空白处不要用另一份材料自动补齐。</p>
    <div className="chapter-activity__list">{config.items.map((item) => <div className="chapter-activity__row" key={item.id}><span>{item.text}</span><select aria-label={`${item.id}归类`} value={columns[item.id] ?? ""} onChange={(event) => setColumns((current) => ({ ...current, [item.id]: event.target.value }))}><option value="">选择层次</option>{config.columns.map((column) => <option value={column} key={column}>{column}</option>)}</select><small>{item.source}</small></div>)}</div>
    <Feedback>{complete ? (correct === config.items.length ? "每一条都留在自己的证据层。" : "有些句子被放进了不相称的层次，仍可改回。") : "逐条选择来源层次。"}</Feedback>
    {complete && correct === config.items.length && <Complete onClick={() => onComplete({ clues: [config.completion] })} />}
  </Frame>;
}

function ExplorationActivity({ config, onComplete }: { config: ExplorationConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const complete = selected.length >= 2 && selected.length <= config.actionLimit;
  return <Frame title="梅花门房间勘查" progress={`${selected.length}/${config.actionLimit}`}>
    <p className="activity-copy">每次翻动都会改变现场。先选能回答目录、近期移动或未核压痕的问题，再把“亲见/移动原物”写进记录。</p>
    <div className="chapter-activity__cards">{config.spots.map((spot) => <button type="button" key={spot.id} className={`chapter-activity__card chapter-activity__card--button ${selected.includes(spot.id) ? "is-selected" : ""}`} onClick={() => setSelected((current) => current.includes(spot.id) ? current.filter((id) => id !== spot.id) : current.length < config.actionLimit ? [...current, spot.id] : current)}><strong>{spot.label}</strong><p>{selected.includes(spot.id) ? spot.detail : "点击查看，不自动移动原物"}</p></button>)}</div>
    <Feedback>{complete ? "至少两类线索已经留下现场记录。" : "还需要调查至少两处不同的线索。"}</Feedback>
    {complete && <Complete onClick={() => onComplete({ clues: [config.completion] })} />}
  </Frame>;
}

function InterviewPlanActivity({ config, onComplete }: { config: InterviewPlanConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const chosen = config.questions.filter((question) => selected.includes(question.id));
  const good = chosen.filter((question) => ["open", "evidence-based", "specific"].includes(question.quality)).length;
  const leading = chosen.filter((question) => question.quality === "leading").length;
  const complete = selected.length === config.slots && good >= 3 && leading <= 1;
  return <Frame title="访谈提纲" progress={`${selected.length}/${config.slots}`}>
    <p className="activity-copy">把问题写成能让梅介臣定位来源、时间和动作的句子。逼问“真相”的问题会把沉默误当成答案。</p>
    <div className="chapter-activity__list">{config.questions.map((question) => <button type="button" key={question.id} className={`chapter-activity__choice ${selected.includes(question.id) ? "is-selected" : ""}`} onClick={() => setSelected((current) => current.includes(question.id) ? current.filter((id) => id !== question.id) : current.length < config.slots ? [...current, question.id] : current)}><span className={`chapter-activity__tag chapter-activity__tag--${question.quality}`}>{question.quality}</span>{question.text}</button>)}</div>
    <Feedback>{complete ? "提纲保住了开放问题和证据追问，leading 问题没有超过一条。" : `${good}/3 个可核验问题；当前 leading ${leading} 条。`}</Feedback>
    {complete && <Complete onClick={() => onComplete({ clues: [config.completion] })} />}
  </Frame>;
}

function DeductionActivity({ config, onComplete }: { config: DeductionConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [solved, setSolved] = useState(false);
  return <Frame title="失页时间线" progress={solved ? "已分层" : "待推断"}>
    <p className="activity-copy">先把时间节点和可进入房间的人放在一起，再看灰烬、压痕、门闩和床侧拉绳。推断要说明“最高可能”，不能冒充亲见。</p>
    <div className="chapter-activity__timeline">{config.timeline.map((item, index) => <span key={item}><i>{index + 1}</i>{item}</span>)}</div>
    <div className="chapter-activity__cards">{config.persons.map((person) => <article className="chapter-activity__card" key={person.id}><strong>{person.name}</strong><small>{person.access.join("、") || "无现场进入记录"}</small><p>{person.known}</p></article>)}</div>
    <details className="chapter-activity__details"><summary>展开证据层</summary><ul>{config.evidence.map((item) => <li key={item.id}>{item.text}</li>)}</ul></details>
    {!solved && <button type="button" className="ink-action" onClick={() => setSolved(true)}>记录最高可能推断</button>}
    {solved && <><Feedback><SentenceText text={config.correctInference} /></Feedback><Complete onClick={() => onComplete({ clues: [config.correctInference] })} /></>}
  </Frame>;
}

function StateSummaryActivity({ config, onComplete }: { config: StateSummaryConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selected, setSelected] = useState(0);
  return <Frame title="状态摘要" progress={`方案 ${selected + 1}/${config.variants.length}`}>
    <p className="activity-copy">当前路线决定你能亲自声称什么。选择符合这次进入方式的查验范围，保存共同结论和限制。</p>
    <div className="chapter-activity__cards">{config.variants.map((variant, index) => <button type="button" key={`${variant.condition}-${index}`} className={`chapter-activity__card chapter-activity__card--button ${selected === index ? "is-selected" : ""}`} onClick={() => setSelected(index)}><small>{variant.condition || "当前路线"}</small><p>{variant.text}</p></button>)}</div>
    <article className="chapter-activity__note"><strong>两条路线共同保留</strong><p>{config.common}</p></article>
    <Complete onClick={() => onComplete({ clues: [config.variants[selected]?.text ?? config.common, config.common] })} />
  </Frame>;
}

function SearchActivity({ config, onComplete }: { config: SearchConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const item = config.items.find((entry) => entry.id === selected);
  const complete = item?.result === "重点";
  return <Frame title="封皮检索" progress={complete ? "找到目标" : "逐册排查"}>
    <p className="activity-copy">先称重、记旧线，再拆一册。每次查看都要登记原位置，不能因为找到目标就把其他排除项抹掉。</p>
    <div className="chapter-activity__protocol">{config.protocol.map((step, index) => <span key={step}><i>{index + 1}</i>{step}</span>)}</div>
    <div className="chapter-activity__cards">{config.items.map((entry) => <button type="button" key={entry.id} className={`chapter-activity__card chapter-activity__card--button ${selected === entry.id ? "is-selected" : ""}`} onClick={() => setSelected(entry.id)}><strong>{entry.title}</strong><p>{selected === entry.id ? entry.clues.join(" · ") : "点击登记重量与封皮线索"}</p>{selected === entry.id && <small>{entry.result}</small>}</button>)}</div>
    <Feedback>{complete ? "《幼学琼林》残册的封皮鼓起和针孔组成了可复核的目标。" : item ? `当前结果：${item.result}。继续按协议排查。` : "选择一册，先做非破坏性检查。"}</Feedback>
    {complete && <Complete onClick={() => onComplete({ clues: [config.completion] })} />}
  </Frame>;
}

function SpatialReconstructionActivity({ config, onComplete }: { config: SpatialReconstructionConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const complete = config.zones.every((zone) => selected[zone.id]);
  const correct = config.zones.filter((zone) => selected[zone.id] === zone.classification).length;
  return <Frame title="巷道复原" progress={`${correct}/${config.zones.length}`}>
    <p className="activity-copy">把纸背草图、分家图和陈阿葵视线叠放。年代不同的图可以互相提出问题，不能替旧图补画不存在的门。</p>
    <div className="chapter-activity__layers">{config.layers.map((layer) => <article key={layer.id}><strong>{layer.title}</strong><small>{layer.date}</small><p>{layer.features.join(" · ")}</p></article>)}</div>
    <div className="chapter-activity__list">{config.zones.map((zone) => <div className="chapter-activity__row" key={zone.id}><span>{zone.label}</span><select aria-label={`${zone.label}可见性`} value={selected[zone.id] ?? ""} onChange={(event) => setSelected((current) => ({ ...current, [zone.id]: event.target.value }))}><option value="">选择范围</option><option value="可见">可见</option><option value="不可见">不可见</option><option value="年代变动未知">年代变动未知</option></select></div>)}</div>
    <Feedback>{complete ? (correct === config.zones.length ? "所有区域都按可见范围和年代不确定性分层。" : "有区域的可见性判断还超出了口述范围。") : "给每个区域标上可见、不可见或年代变动未知。"}</Feedback>
    {complete && correct === config.zones.length && <Complete onClick={() => onComplete({ clues: [config.completion] })} />}
  </Frame>;
}

function FacsimileLayoutActivity({ config, onComplete }: { config: FacsimileLayoutConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [choice, setChoice] = useState<ActivityOption | null>(null);
  return <Frame title="副本版式" progress={choice?.correct ? "保留层级" : "先选版式"}>
    <p className="activity-copy">第七页的正文、同墨旁注和后补小字必须同时可见。可读转录和原位摹图共享一个材料号，不能让整齐抹平形成层。</p>
    <div className="chapter-activity__choices">{config.options.map((option) => <button type="button" key={option.id} className={`chapter-activity__choice ${choice?.id === option.id ? "is-selected" : ""}`} onClick={() => setChoice(option)}>{option.text}</button>)}</div>
    <Feedback>{choice?.feedback ?? "选择一种既可读又保留原位关系的副本。"}</Feedback>
    {choice?.correct && <Complete onClick={() => onComplete({ clues: [config.completion] })} />}
  </Frame>;
}

type TranscriptOption = { id: string; text: string; quality?: string };

function InterviewActivity({ config, onComplete }: { config: InterviewConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState<TranscriptOption[]>([]);
  const current = config.rounds[round];
  const options = (current?.transcriptions ?? []).map((item) => typeof item === "string" ? { id: item, text: item } : item as TranscriptOption);
  const finished = round >= config.rounds.length;
  const correct = answers.filter((answer) => answer.quality === "correct").length;
  const hasChoices = config.rounds.some((item) => (item.transcriptions?.length ?? 0) > 0);
  const advance = (answer?: TranscriptOption) => {
    if (answer) setAnswers((currentAnswers) => [...currentAnswers, answer]);
    setRound((currentRound) => currentRound + 1);
  };
  if (finished) {
    const canComplete = !hasChoices || correct >= 3;
    return <Frame title="病榻访谈" progress={`${correct}/${config.rounds.length} 保留层`}>
      <p className="activity-copy">访谈已逐轮落笔。原话、整理语和疑问仍分栏保存，错误转录不会删除梅介臣说过的话。</p>
      <Feedback>{canComplete ? "访谈记录可以进入长编，并保留停顿与整理说明。" : "至少三轮需要选择限定范围的 correct 转录；返回重修一轮。"}</Feedback>
      {!canComplete && <button type="button" className="ink-action" onClick={() => { setRound(0); setAnswers([]); }}>重做转录</button>}
      {canComplete && <Complete onClick={() => onComplete({ clues: [config.completion] })} />}
    </Frame>;
  }
  return <Frame title="病榻访谈" progress={`${round + 1}/${config.rounds.length}`}>
    <p className="activity-copy">问题：{current.prompt ?? current.question}</p>
    <article className="chapter-activity__answer"><small>答复</small><p>{current.answer}</p></article>
    {options.length ? <div className="chapter-activity__choices">{options.map((option) => <button type="button" className="chapter-activity__choice" key={option.id} onClick={() => advance(option)}>{option.text}</button>)}</div> : <button type="button" className="ink-action" onClick={() => advance()}>保留原话与范围，进入下一轮</button>}
    {config.forbiddenPrompts && round === 0 && <details className="chapter-activity__details"><summary>不可替代的提问边界</summary><ul>{config.forbiddenPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul></details>}
  </Frame>;
}

function AssociationActivity({ config, onComplete }: { config: AssociationConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const complete = config.aliases.every((alias) => selected[alias.id]);
  return <Frame title="代称关联" progress={`${Object.keys(selected).length}/${config.aliases.length}`}>
    <p className="activity-copy">代称可以跨时段复用。只有两类独立线索或本人确认，才足以把代称暂时贴近姓名；其余保持原称。</p>
    <div className="chapter-activity__list">{config.aliases.map((alias) => <fieldset className="chapter-activity__fieldset" key={alias.id}><legend>{alias.alias}</legend><small>{alias.evidence}</small><div className="chapter-activity__choices">{alias.candidates.map((candidate) => <button type="button" key={candidate} className={`chapter-activity__choice ${selected[alias.id] === candidate ? "is-selected" : ""}`} onClick={() => setSelected((current) => ({ ...current, [alias.id]: candidate }))}>{candidate}</button>)}</div></fieldset>)}</div>
    {complete && <><Feedback>“海上人”仍只获得疑与何姓药商及潮州取件有关的暂时关联。</Feedback><Complete onClick={() => onComplete({ clues: [config.completion] })} /></>}
  </Frame>;
}

function AccessProtocolActivity({ config, onComplete }: { config: AccessProtocolConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const groups = [
    ["witness", "在场见证", config.witnessOptions],
    ["copy", "复制权", config.copyOptions],
    ["oral", "口述展示", config.oralOptions],
    ["custody", "阅后保管", config.custodyOptions],
  ] as const;
  const complete = groups.every(([id]) => selections[id]);
  return <Frame title="许家亲阅协议" progress={`${Object.keys(selections).length}/${groups.length}`}>
    <p className="activity-copy">访问不是无限复制权。为第七页同时设置在场人、誊录范围、陈阿葵访谈展示方式和阅后保管。</p>
    <div className="chapter-activity__protocol-groups">{groups.map(([id, title, options]) => <fieldset className="chapter-activity__fieldset" key={id}><legend>{title}</legend>{options.map((option) => <button type="button" className={`chapter-activity__choice ${selections[id] === option ? "is-selected" : ""}`} key={option} onClick={() => setSelections((current) => ({ ...current, [id]: option }))}>{option}</button>)}</fieldset>)}</div>
    <details className="chapter-activity__details"><summary>硬规则</summary><ul>{config.hardRules.map((rule) => <li key={rule}>{rule}</li>)}</ul></details>
    {complete && <Complete onClick={() => onComplete({ clues: [...Object.values(selections), ...config.hardRules] })} />}
  </Frame>;
}

function AccessLogActivity({ config, onComplete }: { config: AccessLogConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  return <Frame title="首次亲阅记录" progress="待落印">
    <p className="activity-copy">把这次访问写成可复核的记录，不把“看过”写成“取得所有权”。</p>
    <article className="chapter-activity__note"><dl><div><dt>日期</dt><dd>{config.date}</dd></div><div><dt>阅览人</dt><dd>{config.viewer}</dd></div><div><dt>材料</dt><dd>{config.materials.join("；")}</dd></div><div><dt>结果</dt><dd>{config.result}</dd></div></dl></article>
    <div className="chapter-activity__protocol">{config.conditions.map((condition, index) => <span key={condition}><i>{index + 1}</i>{condition}</span>)}</div>
    <Complete label="落印并继续" onClick={() => onComplete({ clues: [config.result, ...config.conditions] })} />
  </Frame>;
}

function RedactionActivity({ config, onComplete }: { config: RedactionConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [reason, setReason] = useState("");
  const complete = config.entries.every((entry) => selected[entry.id]) && reason.trim().length >= 4;
  return <Frame title="姓名著录" progress={`${Object.keys(selected).length}/${config.entries.length}`}>
    <p className="activity-copy">每个名字都要单独决定公开范围。选择结果之外，再留下理由和未来何时可以改写的条件。</p>
    <div className="chapter-activity__list">{config.entries.map((entry) => <fieldset className="chapter-activity__fieldset" key={entry.id}><legend>{entry.name}</legend><small>{entry.role}</small>{entry.options.map((option) => <button type="button" className={`chapter-activity__choice ${selected[entry.id] === option ? "is-selected" : ""}`} key={option} onClick={() => setSelected((current) => ({ ...current, [entry.id]: option }))}>{option}</button>)}</fieldset>)}</div>
    <label className="chapter-activity__field">共同校记：为什么这样著录、谁可复核、何种新证据可修改<textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={3} placeholder="例如：保留未核旁注，并由许家、梅家和修志局共同复核。" /></label>
    <Feedback>{complete ? config.consequence : `还需完成所有人物选择，并写下至少一条校记（${config.requiredFields.join("、")}）。`}</Feedback>
    {complete && <Complete onClick={() => onComplete({ clues: [reason.trim(), ...Object.values(selected)] })} />}
  </Frame>;
}

function ChronicleDraftActivity({ config, onComplete }: { config: ChronicleDraftConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [target, setTarget] = useState(config.sections[0]?.id ?? "");
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const total = Object.values(selected).reduce((sum, ids) => sum + ids.length, 0);
  const targetSection = config.sections.find((section) => section.id === target);
  const selectedIds = new Set(Object.values(selected).flat());
  const complete = total === config.sections.reduce((sum, section) => sum + section.slots, 0) && config.sections.every((section) => (selected[section.id]?.length ?? 0) === section.slots);
  const add = (id: string) => {
    if (!targetSection || selectedIds.has(id) || (selected[target]?.length ?? 0) >= targetSection.slots || total >= config.sections.reduce((sum, section) => sum + section.slots, 0)) return;
    setSelected((current) => ({ ...current, [target]: [...(current[target] ?? []), id] }));
  };
  const remove = (sectionId: string, id: string) => setSelected((current) => ({ ...current, [sectionId]: (current[sectionId] ?? []).filter((item) => item !== id) }));
  return <Frame title="史实记录初稿" progress={`${total}/8`}>
    <p className="activity-copy">先选段落，再从现有碎片中放入八项。传播记录不能替事件事实，陈阿葵只能支持门内具体所见，每一段都要留下空缺。</p>
    <div className="chapter-activity__draft-targets">{config.sections.map((section) => <button type="button" key={section.id} className={`chapter-activity__choice ${target === section.id ? "is-selected" : ""}`} onClick={() => setTarget(section.id)}>{section.title} {selected[section.id]?.length ?? 0}/{section.slots}</button>)}</div>
    <div className="chapter-activity__fragment-bank">{config.eligibleFragments.map((id) => <button type="button" key={id} disabled={selectedIds.has(id)} className={selectedIds.has(id) ? "is-used" : ""} onClick={() => add(id)}>{id}</button>)}</div>
    <div className="chapter-activity__draft-sections">{config.sections.map((section) => <article key={section.id}><strong>{section.title}</strong>{(selected[section.id] ?? []).map((id) => <button type="button" key={id} onClick={() => remove(section.id, id)}>{id} ×</button>)}</article>)}</div>
    <details className="chapter-activity__details"><summary>写作约束</summary><ul>{config.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul></details>
    <Feedback>{complete ? "八项材料已经按形成、传播、编页、个案和缺口分栏。点击已入稿材料可以撤回重排。" : `当前段落：${targetSection?.title ?? "未选"}；先把每段填满规定席位。`}</Feedback>
    {complete && <Complete onClick={() => onComplete({ clues: [config.sampleValidOutput, config.completion] })} />}
  </Frame>;
}

function VersioningActivity({ config, onComplete }: { config: VersioningConfig; onComplete: ChapterActivityProps["onComplete"] }) {
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const complete = config.suggestions.every((suggestion) => decisions[suggestion.id]);
  return <Frame title="初稿版本管理" progress={`${Object.keys(decisions).length}/${config.suggestions.length}`}>
    <p className="activity-copy">每条修改都保留原文、作者、证据和采用状态。拒绝建议不等于删除它，部分采用也要留下边界。</p>
    <div className="chapter-activity__list">{config.suggestions.map((suggestion) => <fieldset className="chapter-activity__fieldset" key={suggestion.id}><legend>{suggestion.author}</legend><p><strong>{suggestion.change}</strong></p><small>依据：{suggestion.evidence}</small><div className="chapter-activity__segmented">{["accept", "partial", "reject"].map((decision) => <button type="button" className={decisions[suggestion.id] === decision ? "is-selected" : ""} key={decision} onClick={() => setDecisions((current) => ({ ...current, [suggestion.id]: decision }))}>{decision === "accept" ? "采用" : decision === "partial" ? "部分采用" : "保留校记"}</button>)}</div></fieldset>)}</div>
    <Feedback>{complete ? `${config.baseVersion}已生成 v0.2；未采用建议仍在校记栏。` : config.rule}</Feedback>
    {complete && <Complete onClick={() => onComplete({ clues: [config.completion, ...Object.values(decisions)] })} />}
  </Frame>;
}

export default function ChapterActivityStage({ beat, onComplete }: ChapterActivityProps) {
  switch (beat.type) {
    case "edge_match": return <EdgeMatchActivity config={beat.edge_match!} onComplete={onComplete} />;
    case "transcription": return <TranscriptionActivity config={beat.transcription!} onComplete={onComplete} />;
    case "packing": return <PackingActivity config={beat.packing!} onComplete={onComplete} />;
    case "alignment": return <AlignmentActivity config={beat.alignment!} onComplete={onComplete} />;
    case "exploration": return <ExplorationActivity config={beat.exploration!} onComplete={onComplete} />;
    case "interview_plan": return <InterviewPlanActivity config={beat.interview_plan!} onComplete={onComplete} />;
    case "deduction": return <DeductionActivity config={beat.deduction!} onComplete={onComplete} />;
    case "state_summary": return <StateSummaryActivity config={beat.state_summary!} onComplete={onComplete} />;
    case "search": return <SearchActivity config={beat.search!} onComplete={onComplete} />;
    case "spatial_reconstruction": return <SpatialReconstructionActivity config={beat.spatial_reconstruction!} onComplete={onComplete} />;
    case "facsimile_layout": return <FacsimileLayoutActivity config={beat.facsimile_layout!} onComplete={onComplete} />;
    case "interview": return <InterviewActivity config={beat.interview!} onComplete={onComplete} />;
    case "association": return <AssociationActivity config={beat.association!} onComplete={onComplete} />;
    case "access_protocol": return <AccessProtocolActivity config={beat.access_protocol!} onComplete={onComplete} />;
    case "access_log": return <AccessLogActivity config={beat.access_log!} onComplete={onComplete} />;
    case "redaction": return <RedactionActivity config={beat.redaction!} onComplete={onComplete} />;
    case "chronicle_draft": return <ChronicleDraftActivity config={beat.chronicle_draft!} onComplete={onComplete} />;
    case "versioning": return <VersioningActivity config={beat.versioning!} onComplete={onComplete} />;
    default: return null;
  }
}
