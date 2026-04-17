import { useState } from "react";

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
        <div className="mx-auto max-w-216 text-center">
          <h1 className="font-['Orbitron',sans-serif] text-[clamp(2.35rem,4vw,4rem)] leading-[0.95] tracking-[-0.04em] text-[#1e1e24]">
            MEET THE BOARD
          </h1>

          <p className="mt-3 font-['Lexend',sans-serif] text-lg font-medium leading-8 text-slate-600">
            The dedicated team working behind the scenes to bring you workshops,
            hackathons, and career opportunities.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {boardFilterOptions.map((filterOption) => {
              const isActive = filterOption.id === activeFilter;

              return (
                <button
                  key={filterOption.id}
                  type="button"
                  onClick={() =>
                    setActiveFilter((currentFilter) =>
                      currentFilter === filterOption.id ? null : filterOption.id,
                    )
                  }
                  className={[
                    "hover:cursor-pointer border-b bg-transparent pb-1 font-['Lexend',sans-serif] text-[1.05rem] font-medium transition",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2",
                    isActive
                      ? "border-[#1e1e24] text-[#1e1e24]"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700",
                  ].join(" ")}
                >
                  {filterOption.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleBoardMembers.map((boardMember) => (
            <BoardMemberCard
              key={boardMember.id}
              boardMember={boardMember}
              onLearnMore={setSelectedBoardMember}
            />
          ))}
        </div>

        {visibleBoardMembers.length === 0 ? (
          <div className="mx-auto mt-12 max-w-2xl rounded-[28px] bg-white px-8 py-10 text-center shadow-[0_18px_40px_rgba(30,30,36,0.08)] ring-1 ring-[#1e1e24]/8">
            <p className="font-['Lexend',sans-serif] text-2xl font-medium text-[#1e1e24]">
              No board members in this filter yet.
            </p>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Past board entries without an uploaded headshot are intentionally
              excluded here so the archive stays visually tidy.
            </p>
          </div>
        ) : null}
      </section>

      <BoardMemberModal
        boardMember={selectedBoardMember}
        onClose={() => setSelectedBoardMember(null)}
      />
    </>
  );
}
