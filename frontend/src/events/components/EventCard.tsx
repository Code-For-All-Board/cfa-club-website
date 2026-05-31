import { motion } from "motion/react";
import { FaArrowUpRightFromSquare, FaCalendarDay, FaClock, FaLocationDot } from "react-icons/fa6";

import cfaVerticalLogo from "../../assets/cfaLogos/CFA Vertical Logo.png";
import type { EventItem } from "../types";

type EventCardProps = {
  event: EventItem;
  featured?: boolean;
};

function getReadableLocation(location: string) {
  return location === "N/A" ? "Private location" : location;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const visibleTags = event.tags.slice(0, featured ? 6 : 4);
  const hiddenTagCount = event.tags.length - visibleTags.length;

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className={[
        "group flex h-full overflow-hidden rounded-lg border bg-white shadow-[0_18px_42px_rgba(30,30,36,0.08)] ring-1 ring-[#1e1e24]/6 transition duration-300",
        "hover:shadow-[0_22px_58px_rgba(30,30,36,0.13)]",
        featured ? "flex-col lg:flex-row" : "flex-col",
      ].join(" ")}
    >
      <div
        className={[
          "flex shrink-0 items-center justify-center border-b border-slate-200 bg-[#1e1e24] p-8",
          featured ? "min-h-64 lg:w-72 lg:border-b-0 lg:border-r" : "h-56",
        ].join(" ")}
      >
        <img
          src={cfaVerticalLogo}
          alt=""
          className="max-h-40 w-full max-w-44 object-contain opacity-95"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <span
              key={`${event.id}-${tag}`}
              className="rounded-full bg-violet-50 px-3 py-1 font-['Lexend',sans-serif] text-xs font-semibold text-violet-700 ring-1 ring-violet-100"
            >
              {tag}
            </span>
          ))}
          {hiddenTagCount > 0 ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 font-['Lexend',sans-serif] text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              +{hiddenTagCount}
            </span>
          ) : null}
        </div>

        <h3 className="mt-5 font-['Orbitron',sans-serif] text-2xl font-semibold leading-tight tracking-normal text-[#1e1e24]">
          {event.title}
        </h3>

        <div className="mt-5 grid gap-3 font-['Lexend',sans-serif] text-sm leading-6 text-slate-600">
          <p className="flex gap-3">
            <FaCalendarDay className="mt-1 h-4 w-4 shrink-0 text-violet-500" />
            <span>{event.date}</span>
          </p>
          <p className="flex gap-3">
            <FaClock className="mt-1 h-4 w-4 shrink-0 text-cyan-500" />
            <span>{event.time}</span>
          </p>
          <p className="flex gap-3">
            <FaLocationDot className="mt-1 h-4 w-4 shrink-0 text-fuchsia-500" />
            <span>{getReadableLocation(event.location)}</span>
          </p>
        </div>

        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
          {event.description}
        </p>

        <a
          href={event.href}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-[#1e1e24] px-4 py-2.5 font-['Lexend',sans-serif] text-sm font-semibold text-white shadow-[0_12px_26px_rgba(30,30,36,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a855f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
          aria-label={`Open ${event.title} event details`}
        >
          Event details
          <FaArrowUpRightFromSquare className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
}
