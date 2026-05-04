import { FaDiscord, FaTrophy } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import {
  SiLeetcode,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiGo,
  SiRust,
  SiKotlin,
  SiSwift,
  SiScala,
  SiRuby,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type Submission = {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
};

export type UserData = {
  discord_username: string;
  leetcode_username: string;
  ranking: number;
  local_ranking: string;
  points: number;
  wins: number;
  avatar: string;
  problems: {
    count: number;
    submission: Submission[];
  };
};

const langIcons: Record<string, IconType> = {
  python3: SiPython,
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  go: SiGo,
  rust: SiRust,
  kotlin: SiKotlin,
  swift: SiSwift,
  scala: SiScala,
  ruby: SiRuby,
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(parseInt(timestamp) * 1000);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function LeaderboardUserModal({
  userData,
  onClose,
}: {
  userData: UserData;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 mx-4 shadow-[0_24px_80px_rgba(30,30,36,0.14)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <FaXmark size={16} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={userData.avatar}
            alt={userData.discord_username}
            className="w-14 h-14 rounded-full border-2 border-[#A855F7]"
          />
          <div>
            <div
              className="flex items-center gap-2 text-[#1e1e24] font-semibold"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              <FaDiscord className="text-[#A855F7]" />
              {userData.discord_username}
            </div>
            <a
              href={`https://leetcode.com/u/${userData.leetcode_username}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[#2DD4BF] text-sm hover:underline mt-0.5"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              <SiLeetcode size={12} />
              {userData.leetcode_username}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Global Rank", value: `#${userData.ranking.toLocaleString()}`, mono: true },
            { label: "Local Rank", value: `#${userData.local_ranking}`, mono: true },
            { label: "Points", value: String(userData.points), mono: true },
          ].map(({ label, value, mono }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p
                className="text-[#71717A] text-xs uppercase tracking-wider mb-1"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                {label}
              </p>
              <p
                className="text-[#1e1e24] text-lg"
                style={{ fontFamily: mono ? "'JetBrains Mono', monospace" : "'Lexend', sans-serif" }}
              >
                {value}
              </p>
            </div>
          ))}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p
              className="text-[#71717A] text-xs uppercase tracking-wider mb-1"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Wins
            </p>
            <p
              className="text-[#1e1e24] text-lg flex items-center gap-1.5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <FaTrophy className="text-[#FBBF24] text-base" />
              {userData.wins}
            </p>
          </div>
        </div>

        <p
          className="text-[#71717A] text-xs uppercase tracking-wider mb-3"
          style={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Recent Submissions
        </p>
        <div className="space-y-2">
          {userData.problems.submission.slice(0, 5).map((sub, i) => {
            const LangIcon = langIcons[sub.lang] ?? null;
            return (
              <div
                key={i}
                className="flex items-center justify-between gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {LangIcon && <LangIcon className="text-[#A855F7] shrink-0" size={14} />}
                  <a
                    href={`https://leetcode.com/problems/${sub.titleSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1e1e24] text-sm truncate hover:text-[#A855F7] transition-colors"
                    style={{ fontFamily: "'Lexend', sans-serif" }}
                  >
                    {sub.title}
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[#2DD4BF] text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {sub.statusDisplay}
                  </span>
                  <span
                    className="text-[#71717A] text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {formatTimestamp(sub.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
