import { motion } from "motion/react";
import { FaCalendarCheck, FaClockRotateLeft, FaTags } from "react-icons/fa6";

import { EventSection } from "./components/EventSection";
import { allEvents, pastEvents, upcomingEvents } from "./data/eventsData";

const stats = [
  {
    label: "Upcoming events",
    value: upcomingEvents.length,
    icon: FaCalendarCheck,
  },
  {
    label: "Past events",
    value: pastEvents.length,
    icon: FaClockRotateLeft,
  },
  {
    label: "Event tags",
    value: new Set(allEvents.flatMap((event) => event.tags)).size,
    icon: FaTags,
  },
];

export function EventsPage() {
  return (
    <div className="mx-auto w-full max-w-378 pb-10">
      <section className="relative overflow-hidden rounded-lg bg-[#1e1e24] px-6 py-12 text-white shadow-[0_24px_70px_rgba(30,30,36,0.18)] sm:px-10 lg:px-14">
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-violet-400 via-fuchsia-400 to-cyan-300" />
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-['Lexend',sans-serif] text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
            Code For All events
          </p>
          <h1 className="mt-4 font-['Orbitron',sans-serif] text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.95] tracking-normal">
            Workshops, panels, and meetups built for curious builders.
          </h1>
          <p className="mt-6 max-w-3xl font-['Lexend',sans-serif] text-lg leading-8 text-white/76">
            Browse upcoming CFA programming and career events, then revisit the
            sessions that helped shape the community archive.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                className="rounded-[8px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.12 + index * 0.06,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Icon className="h-5 w-5 text-cyan-200" />
                <p className="mt-4 font-['Orbitron',sans-serif] text-3xl font-semibold leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 font-['Lexend',sans-serif] text-sm font-medium text-white/70">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <EventSection
        eyebrow="Upcoming"
        title="Next on the calendar"
        description="Dummy upcoming events are organized first so the page can be wired to live data later without changing the component structure."
        events={upcomingEvents}
        featuredFirst
      />

      <EventSection
        eyebrow="Archive"
        title="Past CFA events"
        description="A tidy record of prior workshops, panels, competitions, and community sessions."
        events={pastEvents}
      />
    </div>
  );
}
