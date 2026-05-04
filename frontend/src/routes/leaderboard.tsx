import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fetchUser, fetchLeaderboard, fetchLeaderboardHistory } from "../api/leaderboard";
import { LeaderboardControls } from "../components/leaderboard/controls";
import { LeaderboardTable, type LeaderboardEntry, type AllTimeEntry } from "../components/leaderboard/table";
import { LeaderboardUserModal, type UserData } from "../components/leaderboard/userModal";
import { Podium } from "../components/leaderboard/podium";

const PAGE_SIZE = 10;

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[] | null>(null);
  const [allTimeData, setAllTimeData] = useState<AllTimeEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userModal, setUserModal] = useState(false);
  const [isAllTime, setIsAllTime] = useState(false);
  const [lbPage, setLbPage] = useState(0);
  const [allTimePage, setAllTimePage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const page = isAllTime ? allTimePage : lbPage;
  const setPage = isAllTime ? setAllTimePage : setLbPage;
  const activeData = isAllTime ? allTimeData : leaderboardData;
  const totalPages = Math.ceil((activeData?.length ?? 0) / PAGE_SIZE);
  const pagedData = activeData?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) ?? [];

  const top3 =
    activeData && activeData.length >= 3
      ? ([0, 1, 2].map((i) => ({
          name: activeData[i].discord_username,
          score: isAllTime
            ? (activeData[i] as AllTimeEntry).total_points
            : (activeData[i] as LeaderboardEntry).points,
        })) as [{ name: string; score: number }, { name: string; score: number }, { name: string; score: number }])
      : null;

  useEffect(() => {
    Promise.all([fetchLeaderboard(), fetchLeaderboardHistory()])
      .then(([lb, history]) => {
        setLeaderboardData(lb);
        setAllTimeData(history);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    setSearchError(null);
    try {
      const user = await fetchUser(searchQuery.trim());
      setUserData(user);
      setUserModal(true);
    } catch {
      setSearchError("User not found.");
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#A855F7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen bg-transparent flex items-center justify-center text-white"
        style={{ fontFamily: "'Lexend', sans-serif" }}
      >
        Failed to load leaderboard: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="font-['Orbitron',sans-serif] leading-[0.95] tracking-[-0.04em] text-[#1e1e24] text-3xl text-center mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Code For All Weekly Leaderboard
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Podium top3={top3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <LeaderboardControls
            isAllTime={isAllTime}
            onToggle={(val) => { setIsAllTime(val); setLbPage(0); setAllTimePage(0); }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
            searchLoading={searchLoading}
            searchError={searchError}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <LeaderboardTable
            isAllTime={isAllTime}
            pagedData={pagedData}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </motion.div>
      </div>

      {userModal && userData && (
        <LeaderboardUserModal userData={userData} onClose={() => setUserModal(false)} />
      )}
    </div>
  );
}
