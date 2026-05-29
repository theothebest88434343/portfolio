"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
  type Variants,
} from "framer-motion";
import React, { useRef, useState, useEffect, type ReactNode } from "react";

/* ─── animation primitives ─────────────────────────────── */

const curve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: curve }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: curve } },
};

/* ─── data ──────────────────────────────────────────────── */


const leagues = [
  { flag: "🏆",  name: "WORLD CUP 2026",  preview: "BRA 2–1 ARG", prob: "64% home" },
  { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "PREMIER LEAGUE",  preview: "MCI 1–0 ARS", prob: "58% home" },
  { flag: "🇪🇸",  name: "LA LIGA",         preview: "REA 2–1 BAR", prob: "52% home" },
  { flag: "🇩🇪",  name: "BUNDESLIGA",      preview: "BAY 3–1 BVB", prob: "61% home" },
  { flag: "🇫🇷",  name: "LIGUE 1",         preview: "PSG 2–0 LYO", prob: "72% home" },
  { flag: "🇮🇹",  name: "SERIE A",         preview: "INT 1–1 MIL", prob: "44% draw" },
  { flag: "🇧🇷",  name: "BRASILEIRÃO",     preview: "FLA 2–1 PAL", prob: "49% away" },
  { flag: "🇳🇱",  name: "EREDIVISIE",      preview: "AJA 2–0 PSV", prob: "53% home" },
  { flag: "🇵🇹",  name: "PRIMEIRA LIGA",   preview: "POR 1–1 BEN", prob: "51% draw" },
];

const otherProjects = [
  {
    n: "01",
    title: "Collab.",
    desc: "Project management with kanban boards, real-time comments, Groq AI task generation, and Cmd+K global search.",
    tags: ["Next.js", "Supabase", "Groq AI", "PostgreSQL RLS"],
    backPoints: ["Supabase RLS policies for per-user data isolation", "Groq AI task generation via streaming API", "Real-time Postgres subscriptions for live comments", "Cmd+K global search with fuzzy filtering"],
    live: "https://creator-collab-app.vercel.app",
    github: "https://github.com/theothebest88434343/creator-collab-app",
    accent: true,
  },
  {
    n: "02",
    title: "Linktab",
    desc: "Link-in-bio SaaS with public profiles at /username and a 7-day analytics dashboard tracking every click.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "TailwindCSS"],
    backPoints: ["Server-side click tracking with IP + user-agent logging", "Public /username profiles with SSR for SEO", "7-day click chart with daily aggregation queries", "Custom short-link management dashboard"],
    live: "https://linktab.vercel.app",
    github: "https://github.com/theothebest88434343/linktab",
    accent: false,
  },
];

const playerCards = [
  {
    ovr: 92, pos: "ML", name: "MATCHIQ", icon: "⚽", accent: "#d4a820",
    url: "https://matchiq-lyve.onrender.com",
    stats: [{ k: "ELO", v: 94 }, { k: "API", v: 91 }, { k: "MOD", v: 93 }, { k: "DAT", v: 90 }, { k: "AI", v: 88 }, { k: "UX", v: 85 }],
  },
  {
    ovr: 87, pos: "FS", name: "COLLAB.", icon: "📋", accent: "#4d7fff",
    url: "https://creator-collab-app.vercel.app",
    stats: [{ k: "RT", v: 90 }, { k: "AI", v: 88 }, { k: "UX", v: 87 }, { k: "DB", v: 85 }, { k: "API", v: 84 }, { k: "SCH", v: 89 }],
  },
  {
    ovr: 84, pos: "SaaS", name: "LINKTAB", icon: "🔗", accent: "#00c98a",
    url: "https://linktab.vercel.app",
    stats: [{ k: "UX", v: 88 }, { k: "ANL", v: 86 }, { k: "DB", v: 84 }, { k: "API", v: 83 }, { k: "PRF", v: 82 }, { k: "RT", v: 80 }],
  },
];

const stackTabs = [
  { cat: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "HTML / CSS"] },
  { cat: "Frontend",  items: ["React", "Next.js", "TailwindCSS", "Framer Motion", "Vite"] },
  { cat: "Backend",   items: ["Node.js", "Express", "FastAPI", "REST APIs", "WebSockets"] },
  { cat: "Database",  items: ["PostgreSQL", "Supabase"] },
  { cat: "Data / ML", items: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"] },
  { cat: "Tools",     items: ["Git", "GitHub", "VS Code", "Vercel", "Render"] },
];

/* ─── MatchIQ league selector ───────────────────────────── */

function MatchIQTable() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeLeague, setActiveLeague] = useState(0);
  const [progress, setProgress] = useState(0);
  const INTERVAL = 2200;

  useEffect(() => {
    setProgress(0);
    const steps = 60;
    const stepMs = INTERVAL / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setProgress((step / steps) * 100);
      if (step >= steps) {
        step = 0;
        setProgress(0);
        setActiveLeague((i) => (i + 1) % leagues.length);
      }
    }, stepMs);
    return () => clearInterval(t);
  }, [activeLeague]);

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}>

      {/* header */}
      <div className="bg-[#0d1117] flex items-center justify-between px-5 py-3 border-b border-[#1a2030]">
        <div>
          <p className="text-[18px] font-black text-[#d4a820] tracking-[0.15em]">MATCHIQ</p>
          <p className="text-[8px] font-semibold text-[#3a5070] tracking-[0.15em] uppercase mt-[2px]">Live Predictions</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] inline-block"
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
          <span className="text-[10px] text-[#00e5a0] font-semibold tracking-wide">LIVE</span>
        </div>
      </div>

      {/* progress bar */}
      <div className="h-[2px] bg-[#0d1117]">
        <motion.div className="h-full bg-[#d4a820]" style={{ width: `${progress}%` }}
          transition={{ duration: 0.05 }} />
      </div>

      {/* league rows */}
      {leagues.map((l, i) => (
        <motion.div
          key={l.name}
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: curve }}
          onClick={() => setActiveLeague(i)}
          className="relative flex items-center justify-between border-b border-[#0f1520] last:border-0 cursor-pointer overflow-hidden"
          style={{
            padding: "9px 20px",
            background: i === activeLeague ? "rgba(212,168,32,0.06)" : "#0d1117",
            transition: "background 0.3s",
          }}
        >
          {/* left gold bar */}
          {i === activeLeague && (
            <motion.div
              layoutId="leagueBar"
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#d4a820]"
              transition={{ duration: 0.3 }}
            />
          )}

          <div className="flex items-center gap-3">
            <span className="text-[13px] leading-none">{l.flag}</span>
            <span className="text-[11px] font-semibold tracking-[0.06em] transition-colors duration-300"
              style={{ color: i === activeLeague ? "#d4a820" : "#7a9ab0" }}>
              {l.name}
            </span>
          </div>

          <div className="flex flex-col items-end justify-center shrink-0" style={{ minWidth: 76, height: 30 }}>
            <AnimatePresence mode="wait">
              {i === activeLeague ? (
                <motion.div key="pred" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }} className="flex flex-col items-end gap-0.5">
                  <span className="text-[11px] font-black text-white tracking-wide">{l.preview}</span>
                  <span className="text-[9px] text-[#d4a820] font-semibold tracking-wide">{l.prob}</span>
                </motion.div>
              ) : (
                <motion.span key="arrow" className="text-[#2e4060] text-[16px]">›</motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}

      <div className="bg-[#080d12] px-5 py-2.5 flex items-center justify-between">
        <span className="text-[10px] text-[#1e3048]">Dixon-Coles · ELO · Monte Carlo</span>
        <motion.a href="https://matchiq-lyve.onrender.com" target="_blank" rel="noopener noreferrer"
          className="text-[10px] text-[#d4a820]" whileHover={{ color: "#ffffff" }} transition={{ duration: 0.15 }}>
          Open app →
        </motion.a>
      </div>
    </div>
  );
}

/* ─── hero cards carousel ────────────────────────────────── */

function HeroCards() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % playerCards.length), 4200);
    return () => clearInterval(t);
  }, [paused]);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sp = { stiffness: 120, damping: 30 };
  const rotX = useSpring(useTransform(rawY, [-160, 160], [7, -7]), sp);
  const rotY = useSpring(useTransform(rawX, [-160, 160], [-9, 9]), sp);
  const card = playerCards[active];

  return (
    <div className="flex flex-col items-center gap-5 select-none">

      {/* card */}
      <div
        ref={wrap}
        style={{ width: 300, perspective: 1000 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { rawX.set(0); rawY.set(0); setPaused(false); }}
        onMouseMove={(e) => {
          const r = wrap.current!.getBoundingClientRect();
          rawX.set(e.clientX - r.left - r.width / 2);
          rawY.set(e.clientY - r.top - r.height / 2);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.97 }}
            transition={{ duration: 0.55, ease: curve }}
          >
            <motion.div
              style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
              className="relative rounded-[24px] overflow-hidden cursor-default"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* card bg */}
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(155deg, ${card.accent}26 0%, #0b1019 30%, #0b1019 70%, ${card.accent}16 100%)` }} />
              {/* sheen */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, transparent 50%)" }} />
              {/* border */}
              <div className="absolute inset-0 rounded-[24px]"
                style={{ border: `1px solid ${card.accent}40`, boxShadow: `0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 ${card.accent}25` }} />

              <div className="relative z-10 px-7 pt-6 pb-7" style={{ height: 440 }}>

                {/* top row */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-[52px] font-black leading-none" style={{ color: card.accent }}>
                      {card.ovr}
                    </div>
                    <div className="text-[11px] font-bold tracking-[0.14em] mt-1" style={{ color: card.accent + "aa" }}>
                      {card.pos}
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-[#00e5a0] bg-[#00e5a0]/[0.08] border border-[#00e5a0]/20 rounded-full px-2.5 py-[4px] tracking-widest mt-1">
                    LIVE
                  </span>
                </div>

                {/* emblem */}
                <div className="flex items-center justify-center" style={{ height: 136 }}>
                  <div className="relative">
                    <div className="absolute -inset-10 rounded-full blur-3xl opacity-20"
                      style={{ background: card.accent }} />
                    <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle, ${card.accent}28 0%, ${card.accent}0a 70%)`,
                        border: `1.5px solid ${card.accent}35`,
                      }}>
                      <span className="text-[52px] font-black leading-none" style={{ color: card.accent }}>
                        {card.name[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* name */}
                <p className="text-center text-[20px] font-black text-white tracking-[0.12em] mb-5">
                  {card.name}
                </p>

                {/* divider */}
                <div className="mb-5" style={{ height: 1, background: `linear-gradient(to right, transparent, ${card.accent}35, transparent)` }} />

                {/* stats */}
                <div className="grid grid-cols-3 gap-y-3">
                  {card.stats.map(({ k, v }) => (
                    <div key={k} className="flex flex-col items-center gap-0.5">
                      <span className="text-[22px] font-black text-white leading-none">{v}</span>
                      <span className="text-[9px] font-semibold tracking-[0.1em]" style={{ color: card.accent + "88" }}>{k}</span>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dot nav */}
      <div className="flex items-center gap-2">
        {playerCards.map((c, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? c.accent : "#2a3d55",
            }}
          />
        ))}
      </div>

    </div>
  );
}

/* ─── atoms ─────────────────────────────────────────────── */

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-[#00e5a0] bg-[#00e5a0]/[0.08] border border-[#00e5a0]/20 rounded-full px-2.5 py-[3px] tracking-wide uppercase">
      <motion.span
        className="w-1 h-1 rounded-full bg-[#00e5a0] inline-block"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      Live
    </span>
  );
}

/* ─── count up ──────────────────────────────────────────── */

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── stack explorer ────────────────────────────────────── */

function StackExplorer() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: curve }}
    >
      {/* tab bar */}
      <div className="flex flex-wrap gap-1 mb-7">
        {stackTabs.map((t, i) => (
          <button
            key={t.cat}
            onClick={() => setActive(i)}
            className="relative inline-flex items-center px-4 py-[7px] rounded-lg text-[12px] font-medium transition-colors duration-150 cursor-pointer"
            style={{ color: i === active ? "#ffffff" : "#3a5570" }}
          >
            {i === active && (
              <motion.div
                layoutId="stackTabBg"
                className="absolute inset-0 rounded-lg"
                style={{ background: "#0d1520", border: "1px solid #1a2d44" }}
                transition={{ duration: 0.22, ease: curve }}
              />
            )}
            <span className="relative z-10 leading-none">{t.cat}</span>
          </button>
        ))}
      </div>

      {/* skill tags */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="flex flex-wrap gap-2 min-h-[44px]"
      >
        {stackTabs[active].items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.88, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.045, ease: curve }}
            className="text-[13px] text-[#6a8090] bg-[#0d1520] border border-[#1a2535] rounded-lg px-3 py-1.5 cursor-default"
            whileHover={{ borderColor: "#2a4a70", color: "#c0d8f0", scale: 1.04 }}
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── flip card ──────────────────────────────────────────── */

function FlipCard({ p }: { p: typeof otherProjects[0] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: 1200, minHeight: 290 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={(e) => {
        if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") {
          setFlipped((f) => !f);
        }
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: curve }}
      >
        {/* front */}
        <div
          className={`absolute inset-0 rounded-2xl p-6 flex flex-col gap-4 ${
            p.accent ? "bg-[#0a1628] border-[1.5px] border-[#1a3060]" : "bg-[#0d1520] border border-[#1a2535]"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-[#2a3d55] tracking-[0.08em]">{p.n}</span>
            <LiveBadge />
          </div>
          <div>
            <h3 className="text-[18px] font-semibold text-white tracking-tight mb-1.5">{p.title}</h3>
            <p className="text-[13px] text-[#6a8090] leading-[1.7]">{p.desc}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {p.tags.map((t) => (
              <span key={t} className={`text-[10px] rounded-md px-2.5 py-1 ${
                p.accent ? "text-[#5a8aff] bg-[#0057ff]/10 border border-[#0057ff]/25" : "text-[#3a5570] bg-[#111d2e] border border-[#1a2d44]"
              }`}>{t}</span>
            ))}
          </div>
          <div className="text-[11px] text-[#2a3d55] mt-auto pt-2">See how it&apos;s built →</div>
        </div>

        {/* back */}
        <div
          className={`absolute inset-0 rounded-2xl p-6 flex flex-col gap-3 ${
            p.accent ? "bg-[#0a1628] border-[1.5px] border-[#1a3060]" : "bg-[#0d1520] border border-[#1a2535]"
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className={`text-[11px] font-bold tracking-[0.1em] uppercase ${p.accent ? "text-[#5a8aff]" : "text-[#00e5a0]"}`}>
            How it&apos;s built
          </p>
          <h3 className="text-[18px] font-semibold text-white tracking-tight">{p.title}</h3>
          <ul className="space-y-2 flex-1">
            {p.backPoints.map((pt) => (
              <li key={pt} className="flex gap-2 items-start">
                <span className={`mt-[6px] shrink-0 text-[5px] ${p.accent ? "text-[#5a8aff]" : "text-[#00e5a0]"}`}>●</span>
                <span className="text-[12px] text-[#6a8090] leading-[1.6]">{pt}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pt-3 border-t border-[#1a2535]">
            <motion.a href={p.live} target="_blank" rel="noopener noreferrer"
              className="text-[12px] font-semibold text-[#0057ff]"
              whileHover={{ color: "#5a8aff" }} transition={{ duration: 0.1 }}>
              Visit site ↗
            </motion.a>
            <motion.a href={p.github} target="_blank" rel="noopener noreferrer"
              className="text-[12px] text-[#3a5570]"
              whileHover={{ color: "#7a9ab0" }} transition={{ duration: 0.1 }}>
              GitHub ↗
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────── */

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scrollBar = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.0001 });

  return (
    <div className="min-h-screen bg-[#080c14]">
      {/* line grid — base */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      {/* line grid — blue diagonal from top-right */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(0,87,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(0,87,255,0.22) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "linear-gradient(225deg, black 0%, rgba(0,0,0,0.7) 25%, transparent 55%)",
        WebkitMaskImage: "linear-gradient(225deg, black 0%, rgba(0,0,0,0.7) 25%, transparent 55%)",
      }} />
      {/* line grid — teal diagonal from bottom-left */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(0,229,160,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.18) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "linear-gradient(45deg, black 0%, rgba(0,0,0,0.7) 25%, transparent 55%)",
        WebkitMaskImage: "linear-gradient(45deg, black 0%, rgba(0,0,0,0.7) 25%, transparent 55%)",
      }} />
      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] origin-left"
        style={{ scaleX: scrollBar, height: 2, background: "linear-gradient(to right, #0057ff, #00e5a0)" }}
      />

      {/* ── Nav ── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: curve }}
        className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-10 py-[17px] bg-[#080c14]/90 backdrop-blur-md"
      >
        <span className="text-[13px] font-semibold text-white tracking-tight">
          Theo Steinstrasser
        </span>
        <nav className="flex items-center gap-4 md:gap-7">
          <div className="hidden sm:flex items-center gap-5 md:gap-7">
            {(["Work", "Stack", "Contact"] as const).map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-[12px] text-[#7a9ab8] hover:text-white transition-colors duration-150"
              >
                {label}
              </a>
            ))}
          </div>
          <motion.a
            href="https://github.com/theothebest88434343"
            target="_blank" rel="noopener noreferrer"
            className="text-[12px] font-semibold text-[#0a0f1a] bg-white rounded-full px-4 py-2"
            whileHover={{ backgroundColor: "#d0daea" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            GitHub
          </motion.a>
        </nav>
      </motion.header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex items-center" style={{ minHeight: "calc(100vh - 57px)" }}>


        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-12 w-full grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-10 lg:gap-14 items-center">

          {/* left */}
          <motion.div variants={heroContainer} initial="hidden" animate="show">

            <motion.div
              variants={heroItem}
              className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] rounded-full px-4 py-[6px] text-[11px] text-[#8ab0d0] font-medium tracking-wide mb-8"
            >
              <motion.span
                className="w-[5px] h-[5px] rounded-full bg-[#00e5a0] shrink-0 inline-block"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              Open to internships · Fall 2026
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="text-[40px] sm:text-[56px] lg:text-[70px] font-semibold leading-[0.92] tracking-[-0.05em] text-white mb-8"
            >
              I build things<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #0057ff 0%, #00e5a0 100%)" }}
              >
                and ship them.
              </span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="text-[15px] text-[#a8bdd0] leading-[1.8] max-w-[440px]"
            >
              CS student at Laurier. I build predictive sports tools, SaaS products, and whatever else seems interesting —{" "}
              <strong className="text-white font-semibold">React, Node.js, Python, PostgreSQL.</strong>
            </motion.p>

            <motion.div variants={heroItem} className="flex gap-3 mt-7 flex-wrap">
              <motion.a
                href="#work"
                className="bg-[#0057ff] text-white rounded-full px-6 py-2.5 text-[13px] font-semibold"
                whileHover={{ scale: 1.03, backgroundColor: "#0046cc" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                See my work
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank" rel="noopener noreferrer"
                className="text-[#7a9ab8] border border-[#2a3d55] rounded-full px-6 py-2.5 text-[13px]"
                whileHover={{ borderColor: "#4a6a88", color: "#c0d8f0" }}
                transition={{ duration: 0.15 }}
              >
                Resume
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/theosteinstrasser"
                target="_blank" rel="noopener noreferrer"
                className="text-[#7a9ab8] border border-[#2a3d55] rounded-full px-6 py-2.5 text-[13px]"
                whileHover={{ borderColor: "#4a6a88", color: "#c0d8f0" }}
                transition={{ duration: 0.15 }}
              >
                LinkedIn
              </motion.a>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex gap-6 sm:gap-8 mt-8 flex-wrap"
            >
              {[
                { to: 49000, suffix: "+", sub: "matches trained on"     },
                { to: 9,     suffix: "",  sub: "competitions predicted" },
                { to: 3,     suffix: "",  sub: "products in production" },
              ].map(({ to, suffix, sub }) => (
                <div key={sub}>
                  <div className="text-[20px] font-semibold text-white tracking-tight tabular-nums">
                    <CountUp to={to} suffix={suffix} />
                  </div>
                  <div className="text-[11px] text-[#8aa0b8] mt-0.5 whitespace-nowrap">{sub}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* right — hero cards */}
          <div className="hidden lg:flex items-center justify-center">
            <HeroCards />
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.div
            className="w-[1px] h-7 origin-top"
            style={{ background: "linear-gradient(to bottom, transparent, #2a4060)" }}
            animate={{ scaleY: [0, 1, 1, 0], y: [0, 0, 4, 8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
          />
        </motion.div>
      </section>

      {/* ── MatchIQ Feature ── */}
      <section id="work" className="relative overflow-hidden scroll-mt-20">

        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-6 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* left — text */}
          <Reveal>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#00e5a0] mb-4">
              Featured Project
            </p>
            <h2 className="text-[44px] sm:text-[52px] font-semibold tracking-[-0.04em] text-white leading-[0.95] mb-5">
              MatchIQ
            </h2>

            <p className="text-[15px] text-[#8aa0b8] leading-[1.75] mb-6">
              Full-stack sports prediction platform covering{" "}
              <strong className="text-white font-semibold">9 competitions</strong>{" "}
              including the 2026 FIFA World Cup — built on a Dixon-Coles Poisson model
              trained on 49,000+ international results.
            </p>

            <ul className="space-y-3 mb-7">
              {[
                "Dynamic ELO system with Brier score calibration for live accuracy tracking",
                "Live fixtures, standings & scoreline predictions with Groq AI match previews",
                "Deployed to Render + Vercel with in-memory caching and push notifications",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-[#00e5a0] mt-[7px] shrink-0 text-[6px]">●</span>
                  <p className="text-[14px] text-[#6a8090] leading-[1.6]">{item}</p>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-7">
              {["React", "Node.js", "Express", "Supabase", "PostgreSQL", "Groq AI"].map((t) => (
                <motion.span
                  key={t}
                  className="text-[11px] text-[#3a5570] bg-[#111d2e] border border-[#1a2d44] rounded-md px-3 py-1.5 cursor-default"
                  whileHover={{ borderColor: "#2e4a60", color: "#6a8aa0" }}
                  transition={{ duration: 0.15 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                href="https://matchiq-lyve.onrender.com"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00e5a0] text-[#0a0f1a] rounded-full px-6 py-2.5 text-[13px] font-semibold"
                whileHover={{ scale: 1.03, backgroundColor: "#00c98a" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                Open MatchIQ ↗
              </motion.a>
              <motion.a
                href="https://github.com/theothebest88434343/matchiq"
                target="_blank" rel="noopener noreferrer"
                className="text-[13px] text-[#3a5570]"
                whileHover={{ color: "#7a9ab0" }}
                transition={{ duration: 0.15 }}
              >
                GitHub ↗
              </motion.a>
            </div>
          </Reveal>

          {/* right — table */}
          <Reveal delay={0.1}>
            <MatchIQTable />
          </Reveal>

        </div>
      </section>

      {/* ── Other Work ── */}
      <section className="relative">
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-8 pb-10">
          <Reveal>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#4a6880] mb-1">
              Work
            </p>
            <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-white mb-5">
              Also in production
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProjects.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <FlipCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section id="stack" className="relative scroll-mt-20">
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-8 pb-10">
          <Reveal>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#4a6880] mb-1">
              Stack
            </p>
            <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-white mb-5">
              Toolkit
            </h2>
          </Reveal>

          <StackExplorer />
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="relative">
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-8 pb-10">
          <Reveal>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#4a6880] mb-1">Experience</p>
            <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-white mb-8">Where I&apos;ve been</h2>
          </Reveal>

          <div className="relative">
            {/* timeline line */}
            <div className="absolute left-[6px] top-3 bottom-3 w-px"
              style={{ background: "linear-gradient(to bottom, #0057ff, #1a2535 50%, #00e5a0)" }} />

            <div className="space-y-6 pl-10">

              {/* Education */}
              <Reveal>
                <div className="relative">
                  <div className="absolute -left-10 top-[6px] w-[13px] h-[13px] rounded-full bg-[#0057ff]"
                    style={{ boxShadow: "0 0 0 4px rgba(0,87,255,0.15), 0 0 12px rgba(0,87,255,0.3)" }} />
                  <motion.div className="bg-[#0d1520] rounded-2xl p-4 sm:p-6 border border-[#1a2535]"
                    whileHover={{ boxShadow: "0 8px 32px rgba(0,87,255,0.1)", y: -2 }} transition={{ duration: 0.2 }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-[16px] font-semibold text-white tracking-tight">Wilfrid Laurier University</h3>
                        <p className="text-[12px] text-[#0057ff] font-medium mt-0.5">BSc Computer Science — Big Data Systems</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[11px] text-[#3a5570] font-medium">2022 – Present</p>
                        <p className="text-[11px] text-[#3a5570]">Waterloo, ON</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#6a8090] leading-[1.65] mb-3">
                      Specializing in data systems, machine learning, and distributed computing. Built MatchIQ and multiple production SaaS products alongside coursework.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Algorithms", "ML", "Databases", "Distributed Systems", "Statistics"].map((t) => (
                        <span key={t} className="text-[10px] text-[#3a5570] bg-[#111d2e] border border-[#1a2d44] rounded-md px-2.5 py-1">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </Reveal>

              {/* Work */}
              <Reveal delay={0.08}>
                <div className="relative">
                  <div className="absolute -left-10 top-[6px] w-[13px] h-[13px] rounded-full bg-[#00e5a0]"
                    style={{ boxShadow: "0 0 0 4px rgba(0,229,160,0.15), 0 0 12px rgba(0,229,160,0.3)" }} />
                  <motion.div className="bg-[#0d1520] rounded-2xl p-4 sm:p-6 border border-[#1a2535]"
                    whileHover={{ boxShadow: "0 8px 32px rgba(0,229,160,0.08)", y: -2 }} transition={{ duration: 0.2 }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-[16px] font-semibold text-white tracking-tight">Prollenium Medical Technologies</h3>
                        <p className="text-[12px] text-[#00e5a0] font-medium mt-0.5">IT & Technical Intern</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[11px] text-[#3a5570] font-medium">May – Aug 2023</p>
                        <p className="text-[11px] text-[#3a5570]">Richmond Hill, ON</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {[
                        "Built a SQL + Python onboarding automation workflow, improving HR data processing efficiency by 30%",
                        "Configured and deployed Windows workstations for 50+ employees, reducing setup time by 25%",
                        "Resolved hardware, software, and enterprise IT issues across internal systems and Zoom infrastructure",
                      ].map((item) => (
                        <li key={item} className="flex gap-3 items-start">
                          <span className="text-[#00e5a0] mt-[5px] shrink-0 text-[8px]">▶</span>
                          <p className="text-[13px] text-[#6a8090] leading-[1.65]">{item}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1a2535]">
                      {["SQL", "Python", "Windows IT", "Automation"].map((t) => (
                        <span key={t} className="text-[10px] text-[#3a5570] bg-[#111d2e] border border-[#1a2d44] rounded-md px-2.5 py-1">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="relative overflow-hidden scroll-mt-20">
        {/* bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: 900, height: 320,
            background: "radial-gradient(ellipse at 50% 100%, rgba(0,87,255,0.11) 0%, rgba(0,87,255,0.04) 40%, transparent 70%)" }} />

        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-center">

            {/* left */}
            <Reveal>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#00e5a0] mb-5">
                Get in touch
              </p>
              <h2 className="text-[44px] sm:text-[62px] font-semibold tracking-[-0.05em] text-white leading-[0.92] mb-5">
                Let&apos;s<br />
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #0057ff 0%, #00e5a0 100%)" }}>
                  talk.
                </span>
              </h2>
              <p className="text-[15px] text-[#8aa0b8] leading-[1.8] max-w-[400px] mb-7">
                Open to internships Fall 2026. Always down to talk about cool projects — data, AI, or whatever else.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: "📅", label: "Available Fall 2026" },
                  { icon: "📍", label: "Toronto, ON"         },
                  { icon: "🌐", label: "Open to remote"      },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-[#0d1520] border border-[#1a2535] rounded-full px-3.5 py-2">
                    <span className="text-[12px]">{icon}</span>
                    <span className="text-[11px] text-[#6a8090]">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* right — contact card */}
            <Reveal delay={0.12}>
              <div className="rounded-2xl p-6 border border-[#1a2535] bg-[#0d1520]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#3a5570] mb-4">
                  Best way to reach me
                </p>
                <motion.a
                  href="mailto:steinstrasser@gmail.com"
                  className="flex items-center justify-between w-full bg-[#0057ff] text-white rounded-xl px-5 py-4 text-[14px] font-semibold mb-3"
                  whileHover={{ scale: 1.02, backgroundColor: "#0046cc" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <span>steinstrasser@gmail.com</span>
                  <span className="ml-2 opacity-80">→</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/theosteinstrasser"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between w-full border border-[#1e2d42] rounded-xl px-5 py-4 text-[14px] text-[#4a6080]"
                  whileHover={{ borderColor: "#2e4a60", color: "#7a9ab0" }}
                  transition={{ duration: 0.15 }}
                >
                  <span>LinkedIn</span>
                  <span className="opacity-60">↗</span>
                </motion.a>

                <div className="mt-5 pt-5 border-t border-[#1a2535] flex items-center justify-between">
                  <span className="text-[11px] text-[#2a3d55]">Response time</span>
                  <div className="flex items-center gap-1.5">
                    <motion.span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] inline-block"
                      animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.2, repeat: Infinity }} />
                    <span className="text-[11px] text-[#00e5a0]">Usually same day</span>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </div>
  );
}
