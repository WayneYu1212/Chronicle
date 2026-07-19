import WoodButton from "@/components/WoodButton";

const PLACEHOLDER_ITEMS = [
  {
    id: "fragment-13",
    title: "残页·第十三页",
    source: "未知",
    author: "未知",
    acquired: "第一章",
    locked: false,
    preview: "雨已经下了三天。其中一页，没有第一页。",
  },
  {
    id: "priest-manuscript",
    title: "教士口述稿",
    source: "□□□□",
    author: "□□□□",
    acquired: "未获得",
    locked: true,
    preview: "庚寅之劫的真相，在不同的人看来，都是不同的。",
  },
];

export default function ArchivePage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 text-center">
          <p className="chapter-label">史料</p>
          <h1 className="mt-3 font-title text-3xl tracking-[0.3em]">残卷库</h1>
          <p className="mt-4 text-sm leading-relaxed tracking-wide text-ink-light">
            旅途中获得的残页、书信与口述，将在此汇集。
          </p>
        </header>

        <div className="space-y-5">
          {PLACEHOLDER_ITEMS.map((item) => (
            <article
              key={item.id}
              className={`dialogue-box ${item.locked ? "opacity-60" : ""}`}
            >
              <h2 className="font-title text-lg tracking-[0.2em] text-cinnabar">
                {item.locked ? "□□□□□□□□" : item.title}
              </h2>
              <dl className="mt-4 space-y-2 text-sm tracking-wide text-ink-light">
                <div className="flex gap-3">
                  <dt className="text-ink-faint">来源</dt>
                  <dd>{item.source}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-ink-faint">作者</dt>
                  <dd>{item.author}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-ink-faint">获得</dt>
                  <dd>{item.acquired}</dd>
                </div>
              </dl>
              {!item.locked && (
                <p className="mt-4 border-t border-paper-edge/40 pt-4 leading-relaxed text-ink">
                  {item.preview}
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <WoodButton href="/">返回首页</WoodButton>
        </div>
      </div>
    </main>
  );
}
