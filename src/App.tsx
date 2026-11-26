import type { ReactNode } from "react";
import "./index.css";

/**
 * 个人主页骨架 —— 内容全是占位/随手写的，直接改成你自己的就行。
 * 排版故意松散、有点歪，方便以后随手往里塞东西。
 */

type Project = {
  name: string;
  desc: string;
  state: "活着" | "勉强维护" | "画饼中" | "荒废";
  meta: string;
  href?: string;
};

const projects: Project[] = [
  {
    name: "zhangnjsd.github.io",
    desc: "就是这个站。Bun 打包、React 渲染，推一手 main 就自动部署，本地连构建脚本都不用跑。",
    state: "活着",
    meta: "Bun · React · Tailwind",
    href: "https://github.com/zhangnjsd/zhangnjsd.github.io",
  },
  {
    name: "一个还没想好名字的笔记工具",
    desc: "目标是「记东西不要超过三秒」。现在三秒能打开，但打不开的第三秒用来想名字了。",
    state: "画饼中",
    meta: "本地优先 · 无云",
  },
  {
    name: "某爬虫",
    desc: "当初为了不手动翻 200 页写的。现在每周修一次反爬，收益已经低于维护成本，但舍不得删。",
    state: "勉强维护",
    meta: "Python · 正则地狱",
  },
  {
    name: "dotfiles",
    desc: "第 11 次重写。前 10 次的备份还躺在 ~/.backup 里，我一次都没回去看过。",
    state: "荒废",
    meta: "fish · nvim",
  },
  {
    name: "一些小脚本合集",
    desc: "批量改名、批量压图、批量把 JSON 转成表格。全是 20 行以内的东西，攒了一堆。",
    state: "活着",
    meta: "Bun · 一次性的",
  },
  {
    name: "想写的那个游戏",
    desc: "设计文档写了 40 页，代码 0 行。每年年底拿出来看一次，然后放回去。",
    state: "画饼中",
    meta: "只存在于文档",
  },
];

const timeline = [
  { date: "2026-11-26", what: "把站点从「本地构建 + 手动推」换成 GitHub Actions 部署，顺手删掉了模板里的 API 演示。" },
  { date: "2026-11-20", what: "花两小时调一个 CSS 对齐问题，最后发现是父元素少写了一个 flex。" },
  { date: "2026-10-14", what: "第一次认真读了一遍 Bun 的 bundler 文档，发现之前很多绕路都是没必要的。" },
  { date: "2026-09-08", what: "把 Node 项目迁到 Bun。装的依赖少了三分之一，启动快了，但踩了两个兼容坑。" },
  { date: "2026-07-30", what: "重装系统，花了整个周末恢复环境，然后意识到应该早点写 dotfiles。" },
  { date: "2026-05-02", what: "建了这个仓库，最初只想放一个「正在建设中」的页面。" },
];

const notes = [
  {
    date: "2026-11-26",
    title: "把站点搬到 GitHub Actions",
    body: "省掉了本地构建再推静态分支那一步。真正的好处不是省事，是「写完了推上去就行」这件事让人更愿意写。",
  },
  {
    date: "2026-11-03",
    title: "关于「先把东西跑起来」",
    body: "重构三次里最有用的一次，是十分钟随便糊的那个原型。它难看，但它证明路是通的。",
  },
  {
    date: "2026-10-09",
    title: "配置文件的诅咒",
    body: "任何超过 30 行的配置，半年后你都不会记得为什么这么写。所以能少写就少写，能默认就默认。",
  },
  {
    date: "2026-08-31",
    title: "无题",
    body: "换了个字体，觉得整个项目都变好了。其实什么都没变，只是心理作用。但它确实让我多看了两眼。",
  },
  {
    date: "2026-07-02",
    title: "整理书签",
    body: "删到只剩 40 条，一周后涨回 300 条。这是自然规律，跟意志力无关。",
  },
  {
    date: "2026-06-15",
    title: "读代码比写代码累",
    body: "尤其是三个月前自己写的。每次都要先重新建立世界观，才能改一行。",
  },
];

const reading = [
  { title: "某本讲分布式系统的书", progress: 62, note: "第三次从头开始读" },
  { title: "某本小说", progress: 90, note: "剩下 10% 拖了两个月" },
  { title: "某本设计相关的书", progress: 18, note: "每次都停在第一章" },
  { title: "一份开源项目的源码", progress: 35, note: "当书读，读到一半发现分支变了" },
];

const todo = [
  { text: "把这里的每段占位文字换成真要写的内容", done: false },
  { text: "换个 favicon，现在还是 Bun 的图标", done: false },
  { text: "给随笔加详情页（或者干脆砍掉这块）", done: false },
  { text: "接 RSS", done: false },
  { text: "补一个 404 页面", done: false },
  { text: "把 actions 升到 Node 24 版本", done: false },
  { text: "加暗色/亮色切换（其实现在只有暗色）", done: false },
  { text: "删掉模板里的 API 演示", done: true },
  { text: "配置 GitHub Actions 部署", done: true },
  { text: "把首页从模板换成自己的内容", done: true },
];

const stack = [
  "TypeScript", "React", "Bun", "Tailwind", "Vite", "Python", "Go（很久没写）",
  "Postgres", "Redis", "Docker", "Linux", "Neovim", "fish", "Nginx", "正则（靠搜索）",
  "Git", "SQLite", "curl（贴进终端就算调试过）",
];

const bookmarks = [
  { group: "常看的", items: [
    { label: "MDN", href: "https://developer.mozilla.org" },
    { label: "Bun 文档", href: "https://bun.com/docs" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Hacker News", href: "https://news.ycombinator.com" },
  ]},
  { group: "偶尔翻的", items: [
    { label: "Tailwind 文档", href: "https://tailwindcss.com/docs" },
    { label: "can i use", href: "https://caniuse.com" },
    { label: "某个博客", href: "#" },
    { label: "收藏了但没看过", href: "#" },
  ]},
];

const links = [
  { label: "GitHub", href: "https://github.com/zhangnjsd", note: "@zhangnjsd" },
  { label: "Email", href: "mailto:shizukuaqua@outlook.com", note: "shizukuaqua@outlook.com" },
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
          施工中 · 内容随手写的
        </span>

        <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
          Shizuku Aqua
        </h1>

        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#fbf0df]/70">
          写代码，偶尔写点别的。这里扔一些项目、随笔和没做完的东西。
          <span className="text-[#fbf0df]/35"> 不保证顺序，也不保证写完。</span>
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-[#fbf0df]/45">
          <span>📍 某地</span>
          <span className="text-[#fbf0df]/20">/</span>
          <span>状态：{new Date().getFullYear()} 年还在折腾 Bun</span>
          <span className="text-[#fbf0df]/20">/</span>
          <span className="-rotate-2 rounded bg-[#fbf0df]/10 px-1.5 py-0.5">
            最近在补 TypeScript 类型
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
              把这个站填满。然后大概会去补那个笔记工具的第一行代码。
            </p>
          </div>
          <div className="rounded-xl border border-[#fbf0df]/15 bg-[#1a1a1a]/60 p-4 sm:-rotate-[0.6deg]">
            <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#fbf0df]/35">
              在读
            </h3>
            <p className="text-[13.5px] leading-relaxed text-[#fbf0df]/70">
              一本讲分布式系统的书，进度卡在第三章已经两个月。
            </p>
          </div>
          <div className="rounded-xl border border-[#fbf0df]/15 bg-[#1a1a1a]/60 p-4">
            <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#fbf0df]/35">
              在听
            </h3>
            <p className="text-[13.5px] leading-relaxed text-[#fbf0df]/70">
              同一张专辑循环了三个月。这不算懒，这叫稳定。
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
            前端为主，顺手写点后端和脚本。喜欢能一次跑通的东西，讨厌配置。
            目前在做的事情列在下面，但它们大多会变成「正在进行」状态然后一直停在那。
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-[#fbf0df]/50">
            写代码之外的时间大概花在：看别人的代码、后悔自己写的代码、以及给编辑器换主题。
            这个站是我唯一坚持下来的长期项目 —— 因为它需要维护的东西足够少。
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#fbf0df]/45">
            这里本该有一段更认真的自我介绍，等我想到怎么写再补。
          </p>
        </div>

        <div className="rotate-1 justify-self-start rounded-lg border-2 border-[#fbf0df]/20 bg-[#1a1a1a] p-3 font-mono text-[11px] leading-relaxed text-[#fbf0df]/55 sm:justify-self-end">
          <div>uptime: 若干年</div>
          <div>coffee: 依赖</div>
          <div>sleep: 待定</div>
          <div>人话: 会一点</div>
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
          <li>· 维护成本：故意压到最低，不然我会放弃</li>
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
          有事直接发邮件，不用寒暄，说清楚要做什么就行。
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
