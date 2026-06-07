import { motion } from "motion/react";

import type { EventItem } from "../types";
import { EventCard } from "./EventCard";

type EventSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  events: EventItem[];
  featuredFirst?: boolean;
};

export function EventSection({
  eyebrow,
  title,
  description,
  events,
  featuredFirst = false,
}: EventSectionProps) {
  const [featuredEvent, ...regularEvents] = events;

  return (
    <section className="mx-auto w-full max-w-360 py-10">
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-3xl">
          <p className="font-['Lexend',sans-serif] text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-['Orbitron',sans-serif] text-3xl font-semibold leading-tight tracking-normal text-[#1e1e24] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl font-['Lexend',sans-serif] text-base leading-7 text-slate-600">
            {description}
          </p>
        </div>
        <p className="font-['Lexend',sans-serif] text-sm font-semibold text-slate-500">
          {events.length} {events.length === 1 ? "event" : "events"}
        </p>
      </motion.div>

      {featuredFirst && featuredEvent ? (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <EventCard event={featuredEvent} featured />
        </motion.div>
      ) : null}

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(featuredFirst ? regularEvents : events).map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{
              delay: Math.min(index * 0.035, 0.18),
              duration: 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
