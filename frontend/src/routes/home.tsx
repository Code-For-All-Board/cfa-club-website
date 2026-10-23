
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaDiscord, FaArrowRight } from "react-icons/fa6";

import careerPanel from "../assets/cfaGroupImgs/careerPanel.png";
import bpuzzle from "../assets/cfaGroupImgs/bpuzzle.png";
import boardDinner from "../assets/cfaGroupImgs/boardDinner.png";
import bloombergLunch from "../assets/cfaGroupImgs/bloomberg_lunch.jpg";
import hackKnight2024 from "../assets/cfaGroupImgs/hack_knight_2024.jpg";
import hackKnightJudging from "../assets/cfaGroupImgs/hack_knight_judging.jpg";
import hackKnight2025Winners from "../assets/cfaGroupImgs/HackKnight2025Winners.jpg";
import hackKnightPhoto from "../assets/cfaGroupImgs/hackKnightPhoto.jpg";
import cfaPrimary from "../assets/cfaLogos/CFA Primary Logo.png";
import { TypeWriter } from "../components/TypeWriter";
import { AnimatePresence, LayoutGroup} from "motion/react";

type Tone = "violet" | "cyan" | "fuchsia" | "light" | "yellow" | "dark";
const discordUrl = "https://discord.gg/codeforall";

function Pill({ children, tone = "violet" }: { children: React.ReactNode; tone?: Tone }) {
  const tones: Record<Tone, string> = {
    violet: "border-violet-300/40 bg-violet-400/10 text-violet-200",
    cyan: "border-cyan-300/40 bg-cyan-400/10 text-cyan-200",
    fuchsia: "border-fuchsia-300/40 bg-fuchsia-400/10 text-fuchsia-200",
    light: "border-slate-300 bg-white text-slate-700",
    dark: "border-slate-700 bg-slate-900 text-white",
    yellow : "border-yellow-300/40 bg-yellow-400/10 text-yellow-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-['Lexend',sans-serif] text-[11px] font-medium uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}


function Hero() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);
  const lines = [
    "> Established 2022",
    "> 5000 Members · 3 Hackathons",
    "> 10+ Company Offers",
    "> Anyone Welcome!",
  ];
  const visibleLines = lines.slice(0, (tick % (lines.length + 1)) + 1);
  
  
  {/* height = 100vh - 6rem (navbar = 6rem) */}
  return ( 
    <section className="relative flex flex-col overflow-hidden bg-[#1e1e24] text-white h-[calc(100vh-6rem)]">
      {/* grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto grid w-full flex-1 max-w-378 items-center gap-12 px-3 pt-16 pb-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-20 lg:pb-10">
        {/* left */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="yellow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-300 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-300"></span>
              </span>
              HackKnight 2026 · In the making
            </Pill>
            <span className="font-['Lexend',sans-serif] text-xs uppercase tracking-[0.2em] text-white/40">
              Queens College · CUNY
            </span>
          </div>

          <h1 className="mt-7 font-['Orbitron',sans-serif] text-[clamp(2rem,5vw,5.5rem)] leading-[0.92] tracking-[-0.045em] whitespace-nowrap">
            <TypeWriter text="CODE FOR ALL" speed={110} />
            <span className="relative inline-block">
              <svg
                className="absolute -bottom-3 left-0 h-3 w-full"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="cfa-hero-underline" x1="0" x2="1">
                    <stop offset="0%" stopColor="#f0abfc" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#67e8f9" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 8 Q 80 2 150 7 T 298 6"
                  stroke="url(#cfa-hero-underline)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-2xl leading-relaxed text-white/70">
            Code For All is the student-run software community at Queens College. Workshops,
            mock interviews, hackathons, and a Discord that's actually active. No prerequisites,
            just curiosity.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#a855f7] px-9 py-5 font-['Lexend',sans-serif] text-xl font-medium text-white shadow-[0_18px_40px_rgba(168,85,247,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(168,85,247,0.5)]"
            >
              Become a member <FaArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#events"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-9 py-5 font-['Lexend',sans-serif] text-xl font-medium text-white transition hover:bg-white/10"
            >
              See upcoming events
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
            <div>
              <div className="font-['Orbitron',sans-serif] text-5xl tracking-[-0.02em]">500+</div>
              <div className="font-['Lexend',sans-serif] text-sm uppercase tracking-[0.18em] text-white/45">
                Active members
              </div>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <div className="font-['Orbitron',sans-serif] text-5xl tracking-[-0.02em]">13</div>
              <div className="font-['Lexend',sans-serif] text-sm uppercase tracking-[0.18em] text-white/45">
                Board members
              </div>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <div className="font-['Orbitron',sans-serif] text-5xl tracking-[-0.02em]">$20,000</div>
              <div className="font-['Lexend',sans-serif] text-sm uppercase tracking-[0.18em] text-white/45">
                event budget 2025-26
              </div>
            </div>
          </div>
        </div>

        {/* right — photo + mascot + terminal collage */}
        <motion.div
          className="relative min-w-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="relative mx-auto aspect-5/6 w-full max-w-[560px]">
            <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
              <img
                src={careerPanel}
                alt="The CFA cohort after the Spring Career Panel"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 38%" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#1e1e24] via-[#1e1e24]/30 to-transparent" />
              <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
                <div>
                  <div className="font-['Lexend',sans-serif] text-[10px] uppercase tracking-[0.22em] text-white/60">
                    11 · 2025
                  </div>
                  <div className="mt-1 font-['Lexend',sans-serif] text-lg leading-tight">
                    Career panel — <br /> 100+ RSVPS
                  </div>
                </div>
                <div className="rounded-full border border-white/30 bg-black/40 px-3 py-1 font-['Lexend',sans-serif] text-[11px] backdrop-blur">
                  1 / 11
                </div>
              </div>
            </div>

            {/* mascot bubble */}
            <motion.div
              className="absolute -top-6 -left-6 h-28 w-28 rounded-2xl border border-white/15 bg-[#1e1e24] p-2 shadow-[0_18px_40px_rgba(0,0,0,0.5)] sm:-left-10 sm:h-32 sm:w-32"
              initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
              animate={{ rotate: -8, scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.04 }}
            >
              <img src={cfaPrimary} alt="" className="h-full w-full object-contain" />
            </motion.div>

            {/* terminal card */}
            <div className="absolute -right-4 -bottom-8 w-[78%] max-w-[360px] overflow-hidden rounded-2xl border border-white/15 bg-[#0c0c10]/95 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur sm:-right-8">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-['Lexend',sans-serif] text-[10px] uppercase tracking-[0.2em] text-white/40">
                  ~/cfa
                </span>
              </div>
              <div className="p-4 font-mono text-[11.5px] leading-relaxed text-white/80">
                {visibleLines.map((l, i) => (
                  <div
                    key={i}
                    className={
                      i === 0
                        ? "text-cyan-300"
                        : i === lines.length - 1
                        ? "text-fuchsia-300"
                        : "text-white/75"
                    }
                  >
                    {l}
                  </div>
                ))}
                <div className="mt-1 text-white/40">▌</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="relative border-y border-white/10 bg-black/30 py-5">
        <div className="flex animate-[cfa-marquee_38s_linear_infinite] gap-12 pl-12 font-['Orbitron',sans-serif] text-[15px] whitespace-nowrap uppercase tracking-[0.22em] text-white/45">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex shrink-0 gap-12">
              <span>◇ Workshops</span>
              <span>◇ Mock interviews</span>
              <span>◇ Resume reviews</span>
              <span>◇ Hackathons</span>
              <span>◇ Industry panels</span>
              <span>◇ Discord 24/7</span>
              <span>◇ Leetcode Leaderboard</span>
              <span>◇ Job Postings</span>

            </span>
          ))}
        </div>
      </div>

      {/* local keyframes — scoped so we don't pollute app.css */}
      <style>{`
        @keyframes cfa-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

type AccoladeTone = "purple" | "blue" | "green";

const accoladeAccents: Record<AccoladeTone, { border: string; badge: string; dot: string }> = {
  purple: { border: "border-l-purple-500",  badge: "bg-purple-100 text-purple-700",  dot: "bg-purple-500" },
  blue:   { border: "border-l-blue-500",    badge: "bg-blue-100 text-blue-700",      dot: "bg-blue-500"   },
  green:  { border: "border-l-emerald-500", badge: "bg-emerald-100 text-emerald-700",dot: "bg-emerald-500"},
};

function AccoladeCard({ title, desc, meta, tone }: { title: string; desc: string; meta: string; tone: AccoladeTone }) {
  const accent = accoladeAccents[tone];
  return (
    <div className={`flex flex-col gap-4 rounded-2xl border border-slate-200 border-l-4 ${accent.border} bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition hover:bg-slate-50`}>
      <span className={`self-start rounded-full px-3 py-1 font-['Lexend',sans-serif] text-[11px] font-medium uppercase tracking-[0.18em] ${accent.badge}`}>
        {meta}
      </span>
      <h3 className="font-['Orbitron',sans-serif] text-base font-semibold leading-snug text-slate-900">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-slate-600 text-slate-500">
        {desc}
      </p>
    </div>
  );
}

const galleryPhotos = [
  { src: boardDinner,           alt: "CFA board dinner",           label: "Board Dinner" },
  { src: hackKnightPhoto,       alt: "Hack Knight group photo",     label: "Hack Knight 2025" },
  { src: hackKnight2024,        alt: "Hack Knight 2024",            label: "Hack Knight 2024 Winners" },
  { src: hackKnightJudging,     alt: "Hack Knight judging round",   label: "Judging" },
  { src: bloombergLunch,        alt: "Bloomberg lunch with CFA",   label: "Bloomberg Lunch" },
  { src: hackKnight2025Winners, alt: "Hack Knight 2025 winners",   label: "Hack Knight 2025 · Winners" },
  { src: bpuzzle,               alt: "CFA puzzle event",           label: "Puzzle Night" },
];

function Gallery() {
  return (
    <section className="bg-[#1e1e24] py-20 px-8 md:px-16 lg:px-32">
      <div className="mx-auto max-w-6xl flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-start">
          <Pill tone="violet">Gallery</Pill>
          <motion.h2
            className="font-['Orbitron',sans-serif] text-[clamp(2rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.04em] text-white max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            Moments from our community
          </motion.h2>
        </div>

        {/* featured left + 2×3 grid right */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch">
          <motion.div
            className="relative overflow-hidden rounded-2xl w-full lg:w-[55%] shrink-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <img
              src={galleryPhotos[0].src}
              alt={galleryPhotos[0].alt}
              className="w-full h-full object-cover block"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-4 left-4 font-['Lexend',sans-serif] text-xs uppercase tracking-[0.2em] text-white/80">
              {galleryPhotos[0].label}
            </span>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 w-full">
            {galleryPhotos.slice(1).map((photo, i) => (
              <motion.div
                key={photo.alt}
                className="relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i + 1) * 0.06 }}
                viewport={{ once: true }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto block"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-3 left-3 font-['Lexend',sans-serif] text-xs uppercase tracking-[0.2em] text-white/80">
                  {photo.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Events (){
  const accolades = [
      {
      "title" : "Code For ALL awarded Collaborative Program of the Year by Queens College",
      "desc" : "In 2025 we hosted our largest ever hackathon with 1000 applicants and 200 attandees. With sponsorship from Bloomberg, Capital One and MLH allowing our attandees to gain interviews",
      "meta" : "2025-2026",
      "tone" : "purple",
      },
      { 
      "title" : "Mock Interviews",
      "desc" : "6 months ago we announced Mock interviews for our members leading to 50+ mock interviews",
      "meta" : "2026-Current",
      "tone" : "blue",
    },
    { 
      "title" : "Filler",
      "desc" : "Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.",
      "meta" : "2026-Current",
      "tone" : "green",
    }
  ]

  return (
    <div className="py-16 px-8 md:px-16 lg:px-32 flex flex-col items-start gap-10">
      <div className="flex flex-col gap-4">
        <Pill tone="dark">Accolades</Pill>
        
      </div>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {accolades.map((a, i) => (
          <AccoladeCard key={i} title={a.title} desc={a.desc} meta={a.meta} tone={a.tone as AccoladeTone} />
        ))}
      </div>
    </div>
  );

}

export default function Home() {
  return ( <div className="-mx-6 -mt-8 sm:-mt-10">
      <Hero />
      <Events/>
      <Gallery/>
    </div>
  )
}
