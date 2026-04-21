import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

import { BoardMemberCard } from "../components/boardMemberCard";
import { BoardMemberModal } from "../components/boardMemberModal";
import {
  boardMembers,
  boardFilterOptions,
  type BoardFilterId,
  type BoardMember,
} from "../data/boardData";

export default function Board() {
  const [activeFilter, setActiveFilter] = useState<BoardFilterId | null>(null);
  const [selectedBoardMember, setSelectedBoardMember] = useState<BoardMember | null>(
    null,
  );
  const visibleBoardMembers = boardMembers.filter((boardMember) => {
    if (activeFilter === null) {
      return !boardMember.pastBoard;
    }

    if (activeFilter === "pastBoard") {
      return boardMember.pastBoard && boardMember.hasPhoto;
    }

    if (boardMember.pastBoard) {
      return false;
    }

    return boardMember.filterTags.includes(activeFilter);
  });

  return (
    <>
      <section className="mx-auto w-full max-w-360 pb-12">
        <motion.div
          className="mx-auto max-w-216 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="font-['Orbitron',sans-serif] text-[clamp(2.35rem,4vw,4rem)] leading-[0.95] tracking-[-0.04em] text-[#1e1e24]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            MEET THE BOARD
          </motion.h1>

          <motion.p
            className="mt-3 font-['Lexend',sans-serif] text-lg font-medium leading-8 text-slate-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.38 }}
          >
            The dedicated team working behind the scenes to bring you workshops,
            hackathons, and career opportunities.
          </motion.p>

          <LayoutGroup id="board-filters">
            <motion.div
              className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.38 }}
            >
              {boardFilterOptions.map((filterOption) => {
                const isActive = filterOption.id === activeFilter;

                return (
                  <motion.button
                    key={filterOption.id}
                    layout
                    type="button"
                    onClick={() =>
                      setActiveFilter((currentFilter) =>
                        currentFilter === filterOption.id ? null : filterOption.id,
                      )
                    }
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={[
                      "relative hover:cursor-pointer bg-transparent px-1 pb-1 font-['Lexend',sans-serif] text-[1.05rem] font-medium transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2",
                      isActive
                        ? "text-[#1e1e24]"
                        : "text-slate-500 hover:text-slate-700",
                    ].join(" ")}
                  >
                    {filterOption.label}
                    {isActive ? (
                      <motion.span
                        layoutId="board-filter-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#1e1e24]"
                        transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      />
                    ) : null}
                  </motion.button>
                );
              })}
            </motion.div>
          </LayoutGroup>
        </motion.div>

        <LayoutGroup id="board-grid">
          <motion.div layout className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleBoardMembers.map((boardMember, index) => (
                <motion.div
                  key={boardMember.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 18, scale: 0.96 }}
                  transition={{
                    duration: 0.28,
                    delay: index * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                    layout: { type: "spring", stiffness: 280, damping: 26 },
                  }}
                >
                  <BoardMemberCard
                    boardMember={boardMember}
                    onOpenBoardMember={setSelectedBoardMember}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {visibleBoardMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-12 max-w-2xl rounded-[28px] bg-white px-8 py-10 text-center shadow-[0_18px_40px_rgba(30,30,36,0.08)] ring-1 ring-[#1e1e24]/8"
          >
            <p className="font-['Lexend',sans-serif] text-2xl font-medium text-[#1e1e24]">
              No board members in this filter yet.
            </p>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Past board entries without an uploaded headshot are intentionally
              excluded here so the archive stays visually tidy.
            </p>
          </motion.div>
        ) : null}
      </section>

      <BoardMemberModal
        boardMember={selectedBoardMember}
        onClose={() => setSelectedBoardMember(null)}
      />
    </>
  );
}
