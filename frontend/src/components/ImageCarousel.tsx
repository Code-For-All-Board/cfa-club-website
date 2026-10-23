import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import boardDinner from "../assets/cfaGroupImgs/boardDinner.png";
import bpuzzle from "../assets/cfaGroupImgs/bpuzzle.png";
import careerPanel from "../assets/cfaGroupImgs/careerPanel.png";
import careerPanelCropped from "../assets/cfaGroupImgs/careerPanelCropped.png";

const slides = [
  { src: careerPanel, alt: "CFA career panel — Spring 2025" },
  { src: careerPanelCropped, alt: "CFA career panel — full room" },
  { src: bpuzzle, alt: "CFA puzzle event" },
  { src: boardDinner, alt: "CFA board dinner" },
];

const AUTOPLAY_MS = 2000;

export function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  const prev = () => go((index - 1 + slides.length) % slides.length);
  const next = useCallback(
    () => go((index + 1) % slides.length),
    [go, index]
  );

  useEffect(() => {
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(30,30,36,0.16)] ring-1 ring-[#1e1e24]/8">
      <div className="relative aspect-video bg-[#1e1e24]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={slides[index].src}
            alt={slides[index].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0, 0.67, 0] }}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* gradient overlay for buttons */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        <button
          onClick={prev}
          aria-label="Previous image"
          className="hover:cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <FiChevronLeft size={22} />
        </button>

        <button
          onClick={next}
          aria-label="Next image"
          className="hover:cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <FiChevronRight size={22} />
        </button>
      </div>

      {/* dot indicators */}
      <div className="flex justify-center gap-2 bg-white py-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to image ${i + 1}`}
            className={[
              "hover:cursor-pointer h-2 rounded-full transition-all duration-300",
              i === index ? "w-6 bg-[#1e1e24]" : "w-2 bg-slate-300 hover:bg-slate-400",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
