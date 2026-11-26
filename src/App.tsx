import type { ReactNode } from "react";
import { Controls } from "./Controls";
import "./index.css";

type Project = {
  name: string;
  desc: string;
  state: "活着" | "勉强维护" | "画饼中" | "荒废" | "维护中";
  meta: string;
  href?: string;
};

const projects: Project[] = [
  {
    name: "gh.plana.pw",
    desc: "就是这个站。Bun 打包、React 渲染，推一手 main 就自动部署，本地连构建脚本都不用跑。",
    state: "活着",
    meta: "Bun · React · Tailwind",
    href: "https://github.com/zhangnjsd/zhangnjsd.github.io",
  },
  {
    name: "MyGo Music Rev",
    desc: "Egoist 留下的 MyGo Cloudmusic, 我想继续用，好壳子。",
    state: "维护中",
    meta: "Go",
    href: "https://github.com/zhangnjsd/mygo-music/releases",
  },
  {
    name: "極東魔術昼寝結社",
    desc: "我的主页，它用 WordPress ，现在依旧很脆弱。",
    state: "活着",
    meta: "PHP · WordPress",
    href: "https://plana.pw",
  },
  {
    name: "Skyscraper Solver",
    desc: "一次 CTF 里写的解题工具，毫无意义。",
    state: "荒废",
    meta: "Rust",
    href: "https://github.com/zhangnjsd/skyscraper-solver",
  },
  {
    name: "Markdown Coworker",
    desc: "写的服务端实验性的 Markdown 协作工具。",
    state: "活着",
    meta: "Rust",
    href: "https://github.com/zhangnjsd/md-coworker",
  },
  {
    name: "Xclip",
    desc: "刚换到 Linux，想写个像 Windows 上的 My Phone 一样的工具。",
    state: "画饼中",
    meta: "只存在于文档",
  },
];

const timeline = [
  { date: "2026-11-26", what: "改了 AI 写的文字，懒得写这些玩意" },
  { date: "2026-11-26", what: "刚刚起来" },
];

const notes = [
  {
    date: "2026-11-26",
    title: "试试 GitHub Actions",
    body: "我觉得这个玩意很好啊，但是⏰网络是依托呢。",
  },
];

const reading = [
  { title: "终将成为你", progress: 52, note: "上次在飞机上没看完的番" },
  { title: "cuda-oxide", progress: 2, note: "我很敬仰写 Kernel 的人" },
  { title: "CTF Wiki", progress: 18, note: "怎么就是看不懂呢？" }
];

const todo = [
  { text: "喵喵喵～", done: true },
  { text: "把这个站填满", done: false },
];

const stack = [
  "React（其实根本没用过，全是 AI Slop）",
  "Rust（姑且算会了）",
  "Go（slop, slop, slop!!!）",
  "C",
  "C++（其实也没学过）",
  "JavaScript（最早学习的前端语言）",
  "TypeScript（只会一点点🤏）",
  "Linux",
  "PHP（🤷‍♀️）",
  "Pwn & Reverse"
];

const bookmarks = [
  { group: "常看的", items: [
    { label: "MDN", href: "https://developer.mozilla.org" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Hacker News（有教育意义）", href: "https://news.ycombinator.com" },
    { label: "Telegram", href: "#" },
  ]},
  { group: "偶尔翻的", items: [
    { label: "CTF Wiki", href: "https://ctf-wiki.org" },
  ]},
];

const links = [
  { label: "GitHub", href: "https://github.com/zhangnjsd", note: "@zhangnjsd" },
  { label: "Email", href: "mailto:shizukuaqua@outlook.com", note: "shizukuaqua@outlook.com" },
  { label: "Blog", href: "https://plana.pw", note: "@shizukuaqua" },
  { label: "Bilibili", href: "#", note: "@shizukuaqua" },
  { label: "RSS", href: "#", note: "还没有" },
];

function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <h2 className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-2xl font-bold">{children}</span>
      {hint && <span className="font-mono text-xs text-[#fbf0df]/35">{hint}</span>}
    </h2>
  );
}

export function App() {
  const aliveCount = projects.filter((p) => p.state === "活着").length;
  const doneCount = todo.filter((t) => t.done).length;

  return (
    <div className="relative z-10 mx-auto w-full max-w-4xl px-5 py-14 text-left sm:px-8">
      {/* ── 头部 ─────────────────────────────────────────── */}
      <header className="relative mb-14">
        <span className="absolute -top-6 right-2 rotate-6 rounded-md border border-dashed border-[#fbf0df]/40 px-2 py-1 font-mono text-[11px] text-[#fbf0df]/60 sm:right-10">
          施工中
        </span>

        <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
          Shizuku Aqua
        </h1>

        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#fbf0df]/70">
          写点测试的东西。这里扔一些项目、随笔和杂七杂八的东西。
          <span className="text-[#fbf0df]/35"> 不保证顺序，也不保证写完。</span>
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-[#fbf0df]/45">
          <span>📍 PRC</span>
          <span className="text-[#fbf0df]/20">/</span>
          <span>状态：{new Date().getFullYear()} 年还在原地踏步，什么都想学但是什么都学不会。</span>
          <span className="text-[#fbf0df]/20">/</span>
          <span className="-rotate-2 rounded bg-[#fbf0df]/10 px-1.5 py-0.5">
            最近在想啥做啥
          </span>
        </div>
      </header>

      {/* ── Now：三块小卡，故意不等高 ─────────────────────── */}
      <section className="mb-16">
        <SectionTitle hint="最后更新 2026-11">现在</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#fbf0df]/15 bg-[#1a1a1a]/60 p-4">
            <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#fbf0df]/35">
              在做
            </h3>
            <p className="text-[13.5px] leading-relaxed text-[#fbf0df]/70">
              写点脚本，写点后端，写点前端，然后只有枯燥的生活。
            </p>
          </div>
          <div className="rounded-xl border border-[#fbf0df]/15 bg-[#1a1a1a]/60 p-4 sm:-rotate-[0.6deg]">
            <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#fbf0df]/35">
              在读
            </h3>
            <p className="text-[13.5px] leading-relaxed text-[#fbf0df]/70">
              不读！
            </p>
          </div>
          <div className="rounded-xl border border-[#fbf0df]/15 bg-[#1a1a1a]/60 p-4">
            <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#fbf0df]/35">
              在听
            </h3>
            <p className="text-[13.5px] leading-relaxed text-[#fbf0df]/70">
              ？
            </p>
          </div>
        </div>
      </section>

      {/* ── 关于 ─────────────────────────────────────────── */}
      <section className="mb-16 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="border-l-2 border-[#fbf0df]/25 pl-4">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#fbf0df]/40">
            About
          </h2>
          <p className="text-[15px] leading-[1.8] text-[#fbf0df]/75">
            不想自我介绍。
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-[#fbf0df]/50">
            写代码之外的时间大概花在：折腾 Linux，没有一点功名心。
            这个站是有事也要写来耍的东西。
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#fbf0df]/45">
            这里本该有一段更认真的自我介绍，等我想到怎么写再补。
          </p>
        </div>

        <div className="rotate-1 justify-self-start rounded-lg border-2 border-[#fbf0df]/20 bg-[#1a1a1a] p-3 font-mono text-[11px] leading-relaxed text-[#fbf0df]/55 sm:justify-self-end">
          <div>uptime: 若干年</div>
          <div>coffee: 依赖</div>
          <div>sleep: 待定</div>
          <div>人话: 暂时不想说</div>
        </div>
      </section>

      {/* ── 项目 ─────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionTitle hint={`${aliveCount} 个还能跑 / 共 ${projects.length} 个`}>
          项目
        </SectionTitle>

        <ul className="flex flex-col gap-3">
          {projects.map((p, i) => (
            <li
              key={p.name}
              className={`rounded-xl border border-[#fbf0df]/15 bg-[#1a1a1a]/60 p-4 transition-colors hover:border-[#fbf0df]/35 ${
                i % 2 === 1 ? "sm:ml-8" : ""
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-mono text-[15px] font-bold text-[#fbf0df]">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-[#fbf0df]/25 underline-offset-4 hover:decoration-white"
                    >
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </h3>
                <span
                  className={`rounded px-1.5 py-0.5 text-[11px] ${
                    p.state === "活着"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : p.state === "荒废"
                        ? "bg-[#fbf0df]/10 text-[#fbf0df]/40 line-through"
                        : "bg-[#fbf0df]/10 text-[#fbf0df]/55"
                  }`}
                >
                  {p.state}
                </span>
                <span className="ml-auto font-mono text-[11px] text-[#fbf0df]/30">
                  {p.meta}
                </span>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#fbf0df]/60">
                {p.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 折腾记录（时间线） ─────────────────────────────── */}
      <section className="mb-16">
        <SectionTitle hint="只记到我还记得住的部分">折腾记录</SectionTitle>
        <ol className="ml-1 border-l border-[#fbf0df]/15">
          {timeline.map((t) => (
            <li key={t.date} className="relative -ml-px mb-4 border-l-2 border-transparent pl-5">
              <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#fbf0df]/40" />
              <time className="font-mono text-[11px] text-[#fbf0df]/35">{t.date}</time>
              <p className="mt-1 text-[13.5px] leading-relaxed text-[#fbf0df]/65">{t.what}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 随笔 ─────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionTitle hint="想到就写，不保证更新">随笔</SectionTitle>
        <div className="flex flex-col gap-2">
          {notes.map((n, i) => (
            <article
              key={n.title}
              className={`border-b border-dashed border-[#fbf0df]/12 pb-3 ${
                i === 1 ? "sm:-rotate-[0.4deg]" : ""
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3">
                <time className="font-mono text-[11px] text-[#fbf0df]/30">{n.date}</time>
                <h3
                  className={`${
                    i === 0 ? "text-[17px] font-bold" : "text-[14px] font-semibold"
                  } text-[#fbf0df]/85`}
                >
                  {n.title}
                </h3>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-[#fbf0df]/50">{n.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 -rotate-1 font-mono text-[11px] text-[#fbf0df]/30">
          更多内容……还没写。
        </p>
      </section>

      {/* ── 在读 ─────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionTitle hint="进度条大概准">在读 / 在看</SectionTitle>
        <ul className="flex flex-col gap-3">
          {reading.map((r) => (
            <li key={r.title} className="font-mono text-[12.5px]">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[#fbf0df]/75">{r.title}</span>
                <span className="text-[11px] text-[#fbf0df]/35">{r.progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#fbf0df]/10">
                <div
                  className="h-full rounded-full bg-[#fbf0df]/50"
                  style={{ width: `${r.progress}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-[#fbf0df]/30">{r.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 待办 + 技术栈 ────────────────────────────────── */}
      <section className="mb-16 sm:flex sm:gap-8">
        <div className="sm:w-1/2">
          <SectionTitle hint={`${doneCount}/${todo.length}`}>还欠着的</SectionTitle>
          <ul className="flex flex-col gap-2 font-mono text-[12.5px]">
            {todo.map((t) => (
              <li key={t.text} className="flex items-start gap-2">
                <span className={t.done ? "text-emerald-400/80" : "text-[#fbf0df]/25"}>
                  [{t.done ? "x" : " "}]
                </span>
                <span
                  className={t.done ? "text-[#fbf0df]/35 line-through" : "text-[#fbf0df]/65"}
                >
                  {t.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 sm:mt-0 sm:w-1/2">
          <SectionTitle hint="用过不代表精通">常用工具</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {stack.map((s, i) => (
              <span
                key={s}
                className={`rounded-md bg-[#fbf0df]/8 px-2 py-1 text-[12px] text-[#fbf0df]/60 ${
                  i % 5 === 0 ? "rotate-1" : i % 7 === 0 ? "-rotate-1" : ""
                }`}
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[#fbf0df]/30">标得出来的都是写过的，没写过的没标。</p>

          <div className="mt-6 rounded-lg border border-dashed border-[#fbf0df]/20 p-3 font-mono text-[11px] leading-relaxed text-[#fbf0df]/45">
            <div className="mb-1 text-[#fbf0df]/30"># 今天用的命令</div>
            <div>bun install</div>
            <div>bun run build</div>
            <div>git push origin main</div>
            <div className="text-[#fbf0df]/25"># 然后等 Actions</div>
          </div>
        </div>
      </section>

      {/* ── 收藏夹 ───────────────────────────────────────── */}
      <section className="mb-16">
        <SectionTitle hint="点了就跳走">收藏夹</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          {bookmarks.map((b) => (
            <div key={b.group}>
              <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#fbf0df]/35">
                {b.group}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {b.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      className="text-[13.5px] text-[#fbf0df]/70 underline decoration-[#fbf0df]/20 underline-offset-4 hover:text-white hover:decoration-white"
                      {...(it.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── 控件试验田 ───────────────────────────────────── */}
      <section className="mb-16">
        <SectionTitle hint="每个都能点，但都没什么用">控件试验田</SectionTitle>
        <p className="mb-4 max-w-xl text-[13px] leading-relaxed text-[#fbf0df]/45">
          从这里开始往下的东西基本没什么用，属于「想到了就塞一个进来」。
          开关会改配置、滑块会改圆角、进度条会自己跑。
        </p>
        <Controls />
      </section>

      {/* ── 空白占位 ─────────────────────────────────────── */}
      <section className="mb-16 rounded-xl border-2 border-dashed border-[#fbf0df]/15 p-6 text-center">
        <p className="font-mono text-xs text-[#fbf0df]/30">
          这块还没想好放什么（大概是「作品截图」或者「现在在读的书」）
        </p>
      </section>

      {/* ── 关于本站 ─────────────────────────────────────── */}
      <section className="mb-16 rounded-xl border border-[#fbf0df]/15 bg-[#1a1a1a]/50 p-5">
        <h2 className="mb-3 text-sm font-bold text-[#fbf0df]/80">关于本站</h2>
        <ul className="flex flex-col gap-1.5 font-mono text-[11.5px] leading-relaxed text-[#fbf0df]/45">
          <li>· 构建：Bun 打包 React，Tailwind 出样式，产物是纯静态文件</li>
          <li>· 部署：推 main 触发 GitHub Actions，构建完直接发布到 Pages</li>
          <li>· 后端：没有。所有内容写在前端代码里，改一个字要重新构建一次</li>
          <li>· 统计：无追踪、无 cookie、无弹窗</li>
          <li>· 维护成本：故意压到最低，不然我就不想写了</li>
        </ul>
      </section>

      {/* ── 链接 ─────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionTitle>找到我</SectionTitle>
        <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group flex items-baseline gap-2 text-[14px] text-[#fbf0df]/75 hover:text-white"
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                <span className="underline decoration-[#fbf0df]/25 underline-offset-4 group-hover:decoration-white">
                  {l.label}
                </span>
                <span className="font-mono text-[11px] text-[#fbf0df]/30">{l.note}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] text-[#fbf0df]/35">
          有事直接发邮件，是个人就能发，回不回看心情。
        </p>
      </section>

      <footer className="border-t border-[#fbf0df]/10 pt-5 font-mono text-[11px] leading-relaxed text-[#fbf0df]/25">
        <div>Shizuku Aqua · 用 Bun + React + Tailwind 搭，GitHub Actions 部署</div>
        <div>内容随时会改，链接随时会挂。</div>
      </footer>
    </div>
  );
}

export default App;
