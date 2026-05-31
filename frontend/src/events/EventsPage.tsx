import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaCalendarCheck, FaClockRotateLeft, FaTags } from "react-icons/fa6";

import { fetchUpcomingEvents, fetchPastEvents } from "../api/events";
import { EventSection } from "./components/EventSection";
import type { EventItem } from "./types";

export function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchUpcomingEvents(), fetchPastEvents()])
      .then(([upcoming, past]) => {
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const allEvents = [...upcomingEvents, ...pastEvents];
  const tagCount = new Set(allEvents.flatMap((e) => e.tags)).size;

  const stats = [
    { label: "Upcoming events", value: upcomingEvents.length, icon: FaCalendarCheck },
    { label: "Past events", value: pastEvents.length, icon: FaClockRotateLeft },
    { label: "Event tags", value: tagCount, icon: FaTags },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center font-['Lexend',sans-serif] text-[#1e1e24]">
        Failed to load events: {error}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-378 pb-10">

      <EventSection
        eyebrow="Upcoming"
        title="Next on the calendar"
        description="Upcoming CFA events sourced live from UKnighted."
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
