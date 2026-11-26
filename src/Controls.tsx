import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/**
 * 控件试验田：把能想到的控件都堆一遍。
 * 每个卡片里的东西都是真的能用的，只是没什么用。
 */

const CARD = "rounded-xl border border-[#fbf0df]/15 bg-[#1a1a1a]/60 p-4";
const BTN =
  "rounded-md border border-[#fbf0df]/25 px-2.5 py-1 font-mono text-[12px] text-[#fbf0df]/75 transition-colors hover:border-[#fbf0df]/60 hover:text-white";
const BTN_ON = "border-[#fbf0df]/70 bg-[#fbf0df]/10 text-white";
const INPUT =
  "w-full rounded-md border border-[#fbf0df]/20 bg-[#141414] px-2 py-1.5 font-mono text-[12px] text-[#fbf0df] outline-none focus:border-[#fbf0df]/50";
const LABEL = "mb-2 font-mono text-[10.5px] uppercase tracking-[0.15em] text-[#fbf0df]/35";

function Card({
  title,
  hint,
  className = "",
  children,
}: {
  title: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`${CARD} ${className}`}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className={LABEL}>{title}</h3>
        {hint && <span className="font-mono text-[10px] text-[#fbf0df]/25">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/* ── 可复用的基础控件 ─────────────────────────────────── */

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-md px-1 py-1 text-left hover:bg-[#fbf0df]/5"
    >
      <span className="font-mono text-[12px] text-[#fbf0df]/70">{label}</span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors ${
          checked ? "border-[#fbf0df]/60 bg-[#fbf0df]/40" : "border-[#fbf0df]/20 bg-[#fbf0df]/5"
        }`}
      >
        <span
          className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-[#fbf0df] transition-all ${
            checked ? "left-4.5" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}

function Stars({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="评分">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} 星`}
          onClick={() => onChange(n === value ? 0 : n)}
          className={`text-lg leading-none transition-transform hover:scale-110 ${
            n <= value ? "text-[#fbf0df]" : "text-[#fbf0df]/20"
          }`}
        >
          ★
        </button>
      ))}
      <span className="ml-2 font-mono text-[11px] text-[#fbf0df]/35">{value}/5</span>
    </div>
  );
}

/* ── 对比度计算 ───────────────────────────────────────── */

function channel(hex: string, i: number) {
  const v = parseInt(hex.slice(i, i + 2), 16) / 255;
  if (Number.isNaN(v)) return 0;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  return 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
}

function contrast(a: string, b: string) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/* ── 主体 ─────────────────────────────────────────────── */

export function Controls() {
  // 开关组
  const [flags, setFlags] = useState({ hmr: true, console: false, minify: true, sourcemap: false });
  // 强调色
  const [hue, setHue] = useState(42);
  // 字号 / 圆角
  const [size, setSize] = useState<"S" | "M" | "L">("M");
  const [radius, setRadius] = useState(12);
  // 步进器
  const [count, setCount] = useState(3);
  // 文本
  const [text, setText] = useState("随便写点什么，下面有计数。");
  // 标签
  const [tags, setTags] = useState<string[]>(["bun", "react"]);
  const [tagDraft, setTagDraft] = useState("");
  // 搜索
  const [query, setQuery] = useState("");
  // tabs
  const [tab, setTab] = useState(0);
  // accordion
  const [open, setOpen] = useState<number[]>([0]);
  // modal
  const [modal, setModal] = useState(false);
  // 评分
  const [stars, setStars] = useState(4);
  // 进度
  const [progress, setProgress] = useState(8);
  const [running, setRunning] = useState(false);
  // 秒表
  const [ms, setMs] = useState(0);
  const [clockOn, setClockOn] = useState(false);
  // 点赞
  const [likes, setLikes] = useState(12);
  // 危险操作
  const [armAt, setArmAt] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);
  // 密码
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState("hunter2");
  // 日期
  const [date, setDate] = useState("");
  // 复制
  const [copied, setCopied] = useState(false);
  // 像素板
  const [pixels, setPixels] = useState<boolean[]>(() => Array(64).fill(false));
  // 排序列表
  const [order, setOrder] = useState(["build.ts", "src/App.tsx", "package.json", "bun.lock"]);
  // 分页
  const [page, setPage] = useState(1);
  // 建议输入
  const [pick, setPick] = useState("");
  // 按键
  const [lastKey, setLastKey] = useState("—");
  // 单选（密度）
  const [density, setDensity] = useState<"紧凑" | "普通" | "宽松">("普通");
  // 区间选择
  const [range, setRange] = useState({ min: 2, max: 9 });
  // 对比度
  const [bgColor, setBgColor] = useState("#1a1a1a");
  const [fgColor, setFgColor] = useState("#fbf0df");
  // 购物车
  const [cart, setCart] = useState([
    { name: "咖啡", price: 18, qty: 2 },
    { name: "耳机", price: 299, qty: 1 },
    { name: "线材", price: 39, qty: 0 },
  ]);
  // emoji
  const [mood, setMood] = useState("");

  const accent = `hsl(${hue} 82% 74%)`;

  /* 进度条自动增长 */
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 120);
    return () => clearInterval(id);
  }, [running]);

  /* 秒表 */
  useEffect(() => {
    if (!clockOn) return;
    const id = setInterval(() => setMs((m) => m + 100), 100);
    return () => clearInterval(id);
  }, [clockOn]);

  /* 危险操作的二次确认 3 秒倒计时 */
  useEffect(() => {
    if (armAt === null) {
      setArmed(false);
      return;
    }
    setArmed(true);
    const id = setTimeout(() => setArmAt(null), 3000);
    return () => clearTimeout(id);
  }, [armAt]);

  /* Esc 关闭弹窗 */
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ["TypeScript", "React", "Bun", "Tailwind", "Python", "Docker"];
    return ["TypeScript", "React", "Bun", "Tailwind", "Python", "Docker"].filter((s) =>
      s.toLowerCase().includes(q),
    );
  }, [query]);

  const fontSize = size === "S" ? 12 : size === "L" ? 18 : 14;
  const gapPx = density === "紧凑" ? 2 : density === "宽松" ? 10 : 6;

  const pages = 4;
  const pageItems = Array.from({ length: 6 }, (_, i) => (page - 1) * 6 + i + 1);

  const addTag = () => {
    const t = tagDraft.trim();
    if (!t) return;
    setTags((prev) => (prev.includes(t) ? prev : [...prev, t]));
    setTagDraft("");
  };

  const move = (i: number, dir: -1 | 1) => {
    setOrder((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      const a = next[i];
      const b = next[j];
      if (a === undefined || b === undefined) return prev;
      next[i] = b;
      next[j] = a;
      return next;
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`hsl(${hue} 82% 74%)`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {/* 开关组 */}
      <Card title="开关组" hint="点一下会改右边的配置">
        <div className="flex flex-col gap-0.5">
          <Switch
            label="hmr"
            checked={flags.hmr}
            onChange={(v) => setFlags((f) => ({ ...f, hmr: v }))}
          />
          <Switch
            label="echo console"
            checked={flags.console}
            onChange={(v) => setFlags((f) => ({ ...f, console: v }))}
          />
          <Switch
            label="minify"
            checked={flags.minify}
            onChange={(v) => setFlags((f) => ({ ...f, minify: v }))}
          />
          <Switch
            label="sourcemap"
            checked={flags.sourcemap}
            onChange={(v) => setFlags((f) => ({ ...f, sourcemap: v }))}
          />
        </div>
        <pre className="mt-3 overflow-x-auto rounded-md bg-[#141414] p-2 font-mono text-[11px] leading-relaxed text-[#fbf0df]/55">
{`Bun.serve({
  development: {
    hmr: ${flags.hmr},
    console: ${flags.console},
  },
  minify: ${flags.minify},
  sourcemap: ${flags.sourcemap ? '"linked"' : "false"},
})`}
        </pre>
      </Card>

      {/* 强调色 */}
      <Card title="强调色" hint={`hsl(${hue} 82% 74%)`}>
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
          className="w-full accent-[#fbf0df]"
          aria-label="色相"
        />
        <div className="mt-3 flex items-center gap-3">
          <div
            className="h-10 w-10 shrink-0 rounded-lg border"
            style={{ backgroundColor: accent, borderColor: accent }}
          />
          <button
            type="button"
            onClick={copy}
            className={`${BTN} ${copied ? BTN_ON : ""}`}
          >
            {copied ? "已复制 ✓" : "复制色值"}
          </button>
          <input
            type="color"
            defaultValue="#fbf0df"
            className="h-7 w-9 cursor-pointer rounded border border-[#fbf0df]/20 bg-transparent"
            aria-label="取色"
            onChange={(e) => {
              const hex = e.target.value;
              const r = parseInt(hex.slice(1, 3), 16) / 255;
              const g = parseInt(hex.slice(3, 5), 16) / 255;
              const b = parseInt(hex.slice(5, 7), 16) / 255;
              const max = Math.max(r, g, b);
              const min = Math.min(r, g, b);
              const d = max - min;
              if (d === 0) return setHue(0);
              let h = 0;
              if (max === r) h = ((g - b) / d) % 6;
              else if (max === g) h = (b - r) / d + 2;
              else h = (r - g) / d + 4;
              setHue(Math.round(((h * 60) % 360 + 360) % 360));
            }}
          />
        </div>
        <p className="mt-3 text-[12px]" style={{ color: accent }}>
          这段文字会用当前强调色渲染。
        </p>
      </Card>

      {/* 分段控件 + 预览 */}
      <Card title="分段控件" hint={`字号 ${fontSize}px`}>
        <div className="inline-flex overflow-hidden rounded-md border border-[#fbf0df]/20">
          {(["S", "M", "L"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`px-3 py-1 font-mono text-[12px] transition-colors ${
                size === s ? "bg-[#fbf0df]/15 text-white" : "text-[#fbf0df]/50 hover:bg-[#fbf0df]/5"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <p
          className="mt-3 leading-relaxed text-[#fbf0df]/70 transition-all"
          style={{ fontSize }}
        >
          预览文字。改上面的按钮，这段会跟着变。
        </p>
      </Card>

      {/* 圆角 + 密度单选 */}
      <Card title="圆角 / 密度" hint={`r=${radius} · ${density}`}>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={28}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-[#fbf0df]"
            aria-label="圆角"
          />
          <span className="w-8 shrink-0 text-right font-mono text-[11px] text-[#fbf0df]/40">
            {radius}
          </span>
        </div>
        <div
          className="mt-3 border border-[#fbf0df]/30 bg-[#fbf0df]/5 px-3 py-2 font-mono text-[11px] text-[#fbf0df]/60"
          style={{ borderRadius: radius }}
        >
          border-radius: {radius}px
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="密度">
          {(["紧凑", "普通", "宽松"] as const).map((d) => (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={density === d}
              onClick={() => setDensity(d)}
              className={`${BTN} ${density === d ? BTN_ON : ""}`}
            >
              {d}
            </button>
          ))}
        </div>
        <ul className="mt-3 flex flex-col" style={{ gap: gapPx }}>
          {["一", "二", "三"].map((n) => (
            <li
              key={n}
              className="rounded border border-[#fbf0df]/12 px-2 py-1 font-mono text-[11px] text-[#fbf0df]/50"
            >
              第 {n} 行
            </li>
          ))}
        </ul>
      </Card>

      {/* 步进器 + 点赞 */}
      <Card title="步进器 / 计数" hint="最多减到 0">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setCount((c) => Math.max(0, c - 1))} className={BTN}>
            −
          </button>
          <span className="w-10 text-center font-mono text-[15px] text-white">{count}</span>
          <button type="button" onClick={() => setCount((c) => c + 1)} className={BTN}>
            +
          </button>
          <button type="button" onClick={() => setCount(3)} className={`${BTN} ml-auto`}>
            reset
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setLikes((n) => n + 1)} className={BTN}>
            👍 {likes}
          </button>
          <button
            type="button"
            onClick={() => setLikes((n) => Math.max(0, n - 1))}
            className={BTN}
          >
            撤回
          </button>
          <span className="font-mono text-[11px] text-[#fbf0df]/25">
            {likes > 100 ? "有点多了" : likes === 0 ? "清零了" : "还行"}
          </span>
        </div>
      </Card>

      {/* 文本输入 */}
      <Card title="文本输入" hint={`${text.length}/60`}>
        <input
          value={text}
          maxLength={60}
          onChange={(e) => setText(e.target.value)}
          className={INPUT}
          aria-label="文本"
        />
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#fbf0df]/10">
          <div
            className="h-full rounded-full bg-[#fbf0df]/50 transition-all"
            style={{ width: `${(text.length / 60) * 100}%` }}
          />
        </div>
        <p className="mt-2 min-h-[18px] font-mono text-[11px] text-[#fbf0df]/30">
          {text.length >= 60 ? "到上限了" : text.length === 0 ? "空的" : "还在写"}
        </p>
      </Card>

      {/* 标签输入 */}
      <Card title="标签输入" hint="回车添加">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded bg-[#fbf0df]/10 px-2 py-1 font-mono text-[11px] text-[#fbf0df]/70"
            >
              {t}
              <button
                type="button"
                aria-label={`删除 ${t}`}
                onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
                className="text-[#fbf0df]/40 hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
          {tags.length === 0 && (
            <span className="font-mono text-[11px] text-[#fbf0df]/25">没有标签了</span>
          )}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            value={tagDraft}
            onChange={(e) => setTagDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="加一个"
            className={INPUT}
            aria-label="新标签"
          />
          <button type="button" onClick={addTag} className={BTN}>
            加
          </button>
        </div>
      </Card>

      {/* 搜索 */}
      <Card title="搜索过滤" hint={`${filtered.length} 条`}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入 ts / bu / py…"
          className={INPUT}
          aria-label="搜索"
        />
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {filtered.map((f) => (
            <li key={f} className="rounded bg-[#fbf0df]/8 px-2 py-1 text-[11.5px] text-[#fbf0df]/60">
              {f}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="font-mono text-[11px] text-[#fbf0df]/25">没有匹配</li>
          )}
        </ul>
      </Card>

      {/* Tabs */}
      <Card title="标签页" hint={`第 ${tab + 1} 个`}>
        <div className="flex gap-1 border-b border-[#fbf0df]/15 pb-1">
          {["说明", "参数", "吐槽"].map((t, i) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(i)}
              className={`rounded-t px-2.5 py-1 font-mono text-[12px] transition-colors ${
                tab === i
                  ? "bg-[#fbf0df]/10 text-white"
                  : "text-[#fbf0df]/45 hover:text-[#fbf0df]/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-2 min-h-[52px] text-[12.5px] leading-relaxed text-[#fbf0df]/60">
          {tab === 0 && <p>切换上面的标签，这里会换内容。内容都是写死的。</p>}
          {tab === 1 && (
            <p className="font-mono text-[11.5px] text-[#fbf0df]/50">
              tab = {tab} · pages = {pages} · density = {density}
            </p>
          )}
          {tab === 2 && <p>标签页是最没技术含量、但最不容易出错的一种控件。</p>}
        </div>
      </Card>

      {/* Accordion */}
      <Card title="折叠面板" hint={`展开 ${open.length}/3`}>
        <div className="flex flex-col divide-y divide-[#fbf0df]/10">
          {[
            { q: "这个站怎么部署的", a: "推 main，Actions 构建，产物直接发到 Pages。" },
            { q: "为什么不用数据库", a: "因为内容都是我手写的，存代码里就够了。" },
            { q: "以后会加评论吗", a: "大概不会。要加也是很后面的事。" },
          ].map((item, i) => {
            const isOpen = open.includes(i);
            return (
              <div key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))
                  }
                  className="flex w-full items-center justify-between gap-2 py-2 text-left text-[12.5px] text-[#fbf0df]/75 hover:text-white"
                >
                  {item.q}
                  <span className={`font-mono text-[11px] transition-transform ${isOpen ? "rotate-90" : ""}`}>
                    ›
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-2 text-[12px] leading-relaxed text-[#fbf0df]/50">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* 弹窗 */}
      <Card title="弹窗" hint="Esc 可关">
        <button type="button" onClick={() => setModal(true)} className={BTN}>
          打开弹窗
        </button>
        <p className="mt-2 font-mono text-[11px] text-[#fbf0df]/25">
          状态：{modal ? "开着" : "关着"}
        </p>
        {modal && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
            onClick={() => setModal(false)}
          >
            <div
              className="w-full max-w-sm rounded-xl border border-[#fbf0df]/25 bg-[#1a1a1a] p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-[15px] font-bold text-[#fbf0df]">一个弹窗</h4>
              <p className="mt-2 text-[13px] leading-relaxed text-[#fbf0df]/60">
                点遮罩、点按钮或者按 Esc 都能关掉。它出现在所有内容之上，因为 z-50。
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setModal(false)} className={`${BTN} ${BTN_ON}`}>
                  知道了
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Tooltip + 星级 */}
      <Card title="提示与评分" hint="悬停看提示">
        <div className="flex items-center gap-4">
          <div className="group relative inline-block">
            <button type="button" className={BTN}>
              悬停我
            </button>
            <span className="pointer-events-none absolute -top-8 left-0 whitespace-nowrap rounded bg-[#fbf0df] px-2 py-1 font-mono text-[10.5px] text-[#1a1a1a] opacity-0 transition-opacity group-hover:opacity-100">
              这是个 tooltip
            </span>
          </div>
          <Stars value={stars} onChange={setStars} />
        </div>
        <p className="mt-3 text-[12px] text-[#fbf0df]/45">
          {stars === 0
            ? "还没评分"
            : stars >= 4
              ? "评价不错，谢谢"
              : stars >= 2
                ? "中规中矩"
                : "看来不行"}
        </p>
      </Card>

      {/* 进度条 */}
      <Card title="进度条" hint={`${progress}%`}>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#fbf0df]/10">
          <div
            className="h-full rounded-full bg-[#fbf0df]/60 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className={`${BTN} ${running ? BTN_ON : ""}`}
          >
            {running ? "暂停" : "播放"}
          </button>
          <button type="button" onClick={() => setProgress(0)} className={BTN}>
            归零
          </button>
          <button type="button" onClick={() => setProgress(100)} className={BTN}>
            直接满
          </button>
        </div>
      </Card>

      {/* 秒表 */}
      <Card title="秒表" hint="100ms 一跳">
        <div className="font-mono text-2xl text-[#fbf0df]">
          {(ms / 1000).toFixed(1)}
          <span className="ml-1 text-[12px] text-[#fbf0df]/35">s</span>
        </div>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => setClockOn((c) => !c)}
            className={`${BTN} ${clockOn ? BTN_ON : ""}`}
          >
            {clockOn ? "停" : "开始"}
          </button>
          <button
            type="button"
            onClick={() => {
              setClockOn(false);
              setMs(0);
            }}
            className={BTN}
          >
            清零
          </button>
        </div>
      </Card>

      {/* 密码 + 日期 */}
      <Card title="输入类" hint="密码 / 日期">
        <div className="flex gap-2">
          <input
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={INPUT}
            aria-label="密码"
          />
          <button type="button" onClick={() => setShowPass((s) => !s)} className={BTN}>
            {showPass ? "隐藏" : "显示"}
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={INPUT}
            aria-label="日期"
          />
        </div>
        <p className="mt-2 font-mono text-[11px] text-[#fbf0df]/35">
          {date
            ? `距今 ${Math.round((Date.now() - new Date(date).getTime()) / 86400000)} 天`
            : "选一个日期"}
        </p>
      </Card>

      {/* 危险操作 */}
      <Card title="危险操作" hint="二次确认 3 秒">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (armed) {
                setArmAt(null);
                setLikes(0);
              } else {
                setArmAt(Date.now());
              }
            }}
            className={`${BTN} ${armed ? "border-red-400/60 text-red-300" : ""}`}
          >
            {armed ? "真的点我（3s）" : "清除点赞数"}
          </button>
          <span className="font-mono text-[11px] text-[#fbf0df]/25">
            {armed ? "倒计时中，点一下才生效" : "第一次点只是待命"}
          </span>
        </div>
        <p className="mt-2 text-[12px] text-[#fbf0df]/45">
          按钮状态由三秒的定时器控制，超时就自动收回。
        </p>
      </Card>

      {/* 像素板 */}
      <Card title="像素板" hint="64 个开关" className="sm:col-span-2">
        <div className="mx-auto grid grid-cols-8 gap-1" style={{ maxWidth: 300 }}>
          {pixels.map((on, i) => (
            <button
              key={i}
              type="button"
              aria-label={`像素 ${i + 1}`}
              aria-pressed={on}
              onClick={() =>
                setPixels((prev) => {
                  const next = [...prev];
                  next[i] = !next[i];
                  return next;
                })
              }
              className={`aspect-square rounded-sm border transition-colors ${
                on ? "border-[#fbf0df]/70 bg-[#fbf0df]/80" : "border-[#fbf0df]/15 bg-[#fbf0df]/5"
              }`}
              style={on ? { backgroundColor: accent, borderColor: accent } : undefined}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setPixels(Array(64).fill(false))} className={BTN}>
            清空
          </button>
          <button
            type="button"
            onClick={() => setPixels(Array(64).fill(true))}
            className={BTN}
          >
            全亮
          </button>
          <button
            type="button"
            onClick={() =>
              setPixels(Array.from({ length: 64 }, () => Math.random() > 0.6))
            }
            className={BTN}
          >
            随机
          </button>
          <span className="font-mono text-[11px] text-[#fbf0df]/35">
            亮了 {pixels.filter(Boolean).length} 个
          </span>
        </div>
      </Card>

      {/* 排序 */}
      <Card title="排序列表" hint="上移 / 下移">
        <ul className="flex flex-col gap-1">
          {order.map((f, i) => (
            <li
              key={f}
              className="flex items-center gap-2 rounded border border-[#fbf0df]/12 px-2 py-1"
            >
              <span className="flex-1 font-mono text-[11.5px] text-[#fbf0df]/65">{f}</span>
              <button
                type="button"
                aria-label={`${f} 上移`}
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="px-1 font-mono text-[11px] text-[#fbf0df]/45 hover:text-white disabled:opacity-20"
              >
                ↑
              </button>
              <button
                type="button"
                aria-label={`${f} 下移`}
                onClick={() => move(i, 1)}
                disabled={i === order.length - 1}
                className="px-1 font-mono text-[11px] text-[#fbf0df]/45 hover:text-white disabled:opacity-20"
              >
                ↓
              </button>
            </li>
          ))}
        </ul>
      </Card>

      {/* 分页 */}
      <Card title="分页" hint={`第 ${page}/${pages} 页`}>
        <div className="flex flex-wrap gap-1">
          {pageItems.map((n) => (
            <span
              key={n}
              className="rounded border border-[#fbf0df]/12 px-2 py-1 font-mono text-[11px] text-[#fbf0df]/50"
            >
              #{n}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`${BTN} disabled:opacity-25`}
          >
            上一页
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={page === n}
              className={`h-7 w-7 rounded-md border font-mono text-[11px] ${
                page === n
                  ? "border-[#fbf0df]/60 bg-[#fbf0df]/15 text-white"
                  : "border-[#fbf0df]/20 text-[#fbf0df]/50 hover:text-white"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
            className={`${BTN} disabled:opacity-25`}
          >
            下一页
          </button>
        </div>
      </Card>

      {/* 区间选择 */}
      <Card title="区间选择" hint={`${range.min} – ${range.max}`}>
        <div className="flex items-end gap-1">
          {Array.from({ length: 12 }, (_, i) => {
            const active = i >= range.min && i <= range.max;
            return (
              <div
                key={i}
                className={`w-full rounded-t-sm transition-colors ${
                  active ? "bg-[#fbf0df]/70" : "bg-[#fbf0df]/12"
                }`}
                style={{ height: 12 + ((i * 7) % 26) }}
              />
            );
          })}
        </div>
        <div className="mt-3 flex flex-col gap-1">
          <input
            type="range"
            min={0}
            max={11}
            value={range.min}
            onChange={(e) =>
              setRange((r) => ({ ...r, min: Math.min(Number(e.target.value), r.max) }))
            }
            className="w-full accent-[#fbf0df]"
            aria-label="区间起点"
          />
          <input
            type="range"
            min={0}
            max={11}
            value={range.max}
            onChange={(e) =>
              setRange((r) => ({ ...r, max: Math.max(Number(e.target.value), r.min) }))
            }
            className="w-full accent-[#fbf0df]"
            aria-label="区间终点"
          />
        </div>
      </Card>

      {/* 色板 */}
      <Card title="色板预设" hint={`色相 ${hue}°`}>
        <div className="flex flex-wrap gap-1.5">
          {[0, 20, 42, 90, 150, 190, 230, 280, 330].map((h) => (
            <button
              key={h}
              type="button"
              aria-label={`色相 ${h}`}
              onClick={() => setHue(h)}
              className={`h-7 w-7 rounded-md border transition-transform hover:scale-110 ${
                hue === h ? "border-white" : "border-transparent"
              }`}
              style={{ backgroundColor: `hsl(${h} 82% 74%)` }}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] text-[#fbf0df]/35">
          点一下会把上面的强调色切过去，像素板也会跟着变。
        </p>
      </Card>

      {/* 对比度检查 */}
      <Card
        title="对比度检查"
        hint={`${contrast(bgColor, fgColor).toFixed(2)}:1`}
      >
        <div
          className="rounded-md p-3 text-[13px]"
          style={{ backgroundColor: bgColor, color: fgColor }}
        >
          这段文字用所选的两个颜色渲染，看这里就知道难不难读。
        </div>
        <div className="mt-3 flex items-center gap-2">
          <label className="flex items-center gap-1 font-mono text-[11px] text-[#fbf0df]/40">
            背景
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-6 w-8 cursor-pointer rounded border border-[#fbf0df]/20 bg-transparent"
            />
          </label>
          <label className="flex items-center gap-1 font-mono text-[11px] text-[#fbf0df]/40">
            文字
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-6 w-8 cursor-pointer rounded border border-[#fbf0df]/20 bg-transparent"
            />
          </label>
        </div>
        <p className="mt-2 font-mono text-[11px] text-[#fbf0df]/35">
          正文 AA {contrast(bgColor, fgColor) >= 4.5 ? "✓" : "✗"} · 大字 AA{" "}
          {contrast(bgColor, fgColor) >= 3 ? "✓" : "✗"}
        </p>
      </Card>

      {/* 购物车 */}
      <Card
        title="购物车"
        hint={`${cart.reduce((n, i) => n + i.qty, 0)} 件 / ¥${cart.reduce(
          (n, i) => n + i.qty * i.price,
          0,
        )}`}
      >
        <ul className="flex flex-col gap-1">
          {cart.map((item, i) => (
            <li key={item.name} className="flex items-center gap-2">
              <span className="flex-1 font-mono text-[11.5px] text-[#fbf0df]/65">
                {item.name} <span className="text-[#fbf0df]/30">¥{item.price}</span>
              </span>
              <button
                type="button"
                aria-label={`${item.name} 减少`}
                onClick={() =>
                  setCart((prev) =>
                    prev.map((x, j) => (j === i ? { ...x, qty: Math.max(0, x.qty - 1) } : x)),
                  )
                }
                className="h-5 w-5 rounded border border-[#fbf0df]/20 font-mono text-[11px] text-[#fbf0df]/50 hover:text-white"
              >
                −
              </button>
              <span className="w-4 text-center font-mono text-[11.5px] text-[#fbf0df]">
                {item.qty}
              </span>
              <button
                type="button"
                aria-label={`${item.name} 增加`}
                onClick={() =>
                  setCart((prev) => prev.map((x, j) => (j === i ? { ...x, qty: x.qty + 1 } : x)))
                }
                className="h-5 w-5 rounded border border-[#fbf0df]/20 font-mono text-[11px] text-[#fbf0df]/50 hover:text-white"
              >
                +
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-mono text-[11px] text-[#fbf0df]/25">
          合计由上面每一行的数量算出来，不需要「更新」按钮。
        </p>
      </Card>

      {/* Emoji */}
      <Card title="表情选择" hint={mood ? `${mood.length} 个字符` : "未选"}>
        <div className="grid grid-cols-8 gap-1">
          {["🙂", "😴", "🔥", "🐛", "☕", "🌱", "🧩", "🫠", "✨", "📦", "🛠️", "🥲", "🐈", "🍥", "🎈", "🪄"].map(
            (e) => (
              <button
                key={e}
                type="button"
                onClick={() => setMood((m) => m + e)}
                className="aspect-square rounded border border-[#fbf0df]/15 text-base leading-none transition-colors hover:border-[#fbf0df]/50 hover:bg-[#fbf0df]/10"
              >
                {e}
              </button>
            ),
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="min-h-[20px] flex-1 break-all text-[13px] text-[#fbf0df]/70">
            {mood || "点上面的格子"}
          </span>
          <button
            type="button"
            onClick={() => setMood("")}
            className={`${BTN} shrink-0`}
          >
            清空
          </button>
        </div>
      </Card>

      {/* 建议输入 + 按键 */}
      <Card title="建议 / 按键" hint="键盘事件">
        <input
          value={pick}
          onChange={(e) => setPick(e.target.value)}
          onKeyDown={(e) => setLastKey(e.key)}
          list="suggest"
          placeholder="输入或从建议里选"
          className={INPUT}
          aria-label="建议输入"
        />
        <datalist id="suggest">
          <option value="bun run build" />
          <option value="bun run typecheck" />
          <option value="git push origin main" />
          <option value="gh run watch" />
        </datalist>
        <p className="mt-2 font-mono text-[11px] text-[#fbf0df]/35">
          最近一次按键：<span className="text-[#fbf0df]/70">{lastKey}</span>
        </p>
        <p className="mt-1 font-mono text-[11px] text-[#fbf0df]/25">
          当前值：{pick || "（空）"}
        </p>
      </Card>
    </div>
  );
}
