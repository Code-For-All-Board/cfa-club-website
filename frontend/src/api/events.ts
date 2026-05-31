import type { EventItem } from "../events/types";

const BASE_URL = import.meta.env.VITE_EVENTS_API_BASE;

async function fetchEvents(path: string): Promise<EventItem[]> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const fetchUpcomingEvents = () => fetchEvents("/upcoming-events");
export const fetchPastEvents = () => fetchEvents("/past-events");
