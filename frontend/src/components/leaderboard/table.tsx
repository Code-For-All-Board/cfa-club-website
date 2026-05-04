export type LeaderboardEntry = {
  discord_username: string;
  discord_id: string;
  username: string;
  points: number;
};

export type AllTimeEntry = {
  discord_username: string;
  discord_id: string;
  username: string;
  total_points: number;
  total_wins: number;
};

const PAGE_SIZE = 10;

function CurrentTable({
  data,
  page,
}: {
  data: LeaderboardEntry[];
  page: number;
}) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-100">
          {["#", "Discord", "LeetCode", "Points"].map((col, i) => (
            <th
              key={col}
              className={`px-4 py-3 text-[#71717A] text-xs uppercase tracking-wider ${i === 3 ? "text-right" : "text-left"} ${i === 0 ? "w-12" : ""}`}
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((entry, i) => {
          const rank = page * PAGE_SIZE + i;
          return (
            <tr
              key={entry.discord_id}
              className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#A855F7]/5 ${rank === 0 ? "bg-[#A855F7]/10" : ""}`}
            >
              <td
                className="px-4 py-3 text-sm"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: rank === 0 ? "#A855F7" : "#71717A",
                }}
              >
                {rank + 1}
              </td>
              <td
                className="px-4 py-3 text-[#09090B] text-sm"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                {entry.discord_username}
              </td>
              <td
                className="px-4 py-3 text-[#71717A] text-sm"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                {entry.username}
              </td>
              <td
                className="px-4 py-3 text-right text-[#09090B] text-sm"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {entry.points}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function AllTimeTable({
  data,
  page,
}: {
  data: AllTimeEntry[];
  page: number;
}) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-100">
          {["#", "Discord", "LeetCode", "Points", "Wins"].map((col, i) => (
            <th
              key={col}
              className={`px-4 py-3 text-[#71717A] text-xs uppercase tracking-wider ${i >= 3 ? "text-right" : "text-left"} ${i === 0 ? "w-12" : ""}`}
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((entry, i) => {
          const rank = page * PAGE_SIZE + i;
          return (
            <tr
              key={entry.discord_id}
              className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#A855F7]/5 ${rank === 0 ? "bg-[#A855F7]/10" : ""}`}
            >
              <td
                className="px-4 py-3 text-sm"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: rank === 0 ? "#A855F7" : "#71717A",
                }}
              >
                {rank + 1}
              </td>
              <td
                className="px-4 py-3 text-[#09090B] text-sm"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                {entry.discord_username}
              </td>
              <td
                className="px-4 py-3 text-[#71717A] text-sm"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                {entry.username}
              </td>
              <td
                className="px-4 py-3 text-right text-[#09090B] text-sm"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {entry.total_points.toLocaleString()}
              </td>
              <td
                className="px-4 py-3 text-right text-sm"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FBBF24" }}
              >
                {entry.total_wins}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function LeaderboardTable({
  isAllTime,
  pagedData,
  page,
  totalPages,
  onPageChange,
}: {
  isAllTime: boolean;
  pagedData: LeaderboardEntry[] | AllTimeEntry[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {isAllTime ? (
          <AllTimeTable data={pagedData as AllTimeEntry[]} page={page} />
        ) : (
          <CurrentTable data={pagedData as LeaderboardEntry[]} page={page} />
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-slate-200 text-[#71717A] hover:text-[#09090B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Previous
          </button>
          <span
            className="text-sm text-[#71717A]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-slate-200 text-[#71717A] hover:text-[#09090B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
