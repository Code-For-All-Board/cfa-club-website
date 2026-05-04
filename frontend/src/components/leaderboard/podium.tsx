import { motion } from "motion/react";
import { FaCircleUser } from "react-icons/fa6";

export type PodiumEntry = { name: string; score: number | string };

export function Podium({ top3 }: { top3: [PodiumEntry, PodiumEntry, PodiumEntry] | null }) {
  if (!top3) return null;

  const [first, second, third] = top3;

  const slots = [
    { entry: second, rank: 2, height: "h-16", color: "bg-[#A855F7]", labelColor: "text-[#A855F7]" },
    { entry: first,  rank: 1, height: "h-24", color: "bg-[#C084FC]", labelColor: "text-[#C084FC]", showAvatar: true },
    { entry: third,  rank: 3, height: "h-12", color: "bg-[#7C3AED]", labelColor: "text-[#7C3AED]" },
  ] as const;

  return (
    <div className="flex items-end justify-center gap-3 mb-8">
      {slots.map(({ entry, rank, height, color, labelColor, showAvatar }, i) => (
        <motion.div
          key={rank}
          className="flex flex-col items-center gap-1.5 w-28"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {showAvatar && (
            <FaCircleUser className="text-[#1e1e24] mb-1" size={28} />
          )}
          <p
            className="text-xs font-medium truncate max-w-full text-center"
            style={{ fontFamily: "'Lexend', sans-serif", color: "#1e1e24" }}
            title={entry.name}
          >
            {entry.name}
          </p>
          <p
            className={`text-xs font-semibold ${labelColor}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {typeof entry.score === "number" ? entry.score.toLocaleString() : entry.score} pts
          </p>
          <div
            className={`w-full ${height} ${color} rounded-t-lg flex items-start justify-center pt-2`}
          >
            <span
              className="text-white font-bold text-sm"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {rank}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
