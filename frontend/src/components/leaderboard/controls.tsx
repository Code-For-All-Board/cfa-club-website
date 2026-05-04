export function LeaderboardControls({
  isAllTime,
  onToggle,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  searchLoading,
  searchError,
}: {
  isAllTime: boolean;
  onToggle: (allTime: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  searchLoading: boolean;
  searchError: string | null;
}) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
      <div className="flex gap-2">
        {(["Current Rankings", "All-Time"] as const).map((label) => {
          const active = label === "All-Time" ? isAllTime : !isAllTime;
          return (
            <button
              key={label}
              onClick={() => onToggle(label === "All-Time")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                active
                  ? "bg-[#A855F7] text-white"
                  : "bg-white border border-slate-200 text-[#71717A] hover:text-[#09090B]"
              }`}
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <form onSubmit={onSearchSubmit} className="flex flex-col items-end gap-1">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Discord or LeetCode username"
            className="bg-white border border-slate-200 text-[#09090B] text-sm placeholder-[#71717A] rounded-lg px-3 py-2 focus:outline-none focus:border-[#A855F7] w-56 transition-colors"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          />
          <button
            type="submit"
            disabled={searchLoading}
            className="bg-[#A855F7] hover:bg-[#7C3AED] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            {searchLoading ? "..." : "Search"}
          </button>
        </div>
        {searchError && (
          <p className="text-[#EC4899] text-xs" style={{ fontFamily: "'Lexend', sans-serif" }}>
            {searchError}
          </p>
        )}
      </form>
    </div>
  );
}
