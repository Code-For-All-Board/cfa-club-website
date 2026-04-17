import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import { BoardMemberCard } from "../components/boardMemberCard";
import { BoardMemberModal } from "../components/boardMemberModal";
import {
  boardMembers,
  currentAcademicYearLabel,
  type BoardMember,
} from "../data/boardData";

export default function Board() {
  const [selectedBoardMember, setSelectedBoardMember] = useState<BoardMember | null>(
    null,
  );

  return (
    <>
      <section className="mx-auto w-full max-w-[1440px] pb-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[36rem]">
            <h1 className="font-['Orbitron',sans-serif] text-[clamp(2.35rem,4vw,4rem)] leading-[0.95] tracking-[-0.04em] text-[#1e1e24]">
              MEET THE BOARD
            </h1>

            <p className="mt-5 max-w-[34rem] font-['Lexend',sans-serif] text-lg font-medium leading-8 text-slate-600">
              The dedicated team working behind the scenes to bring you
              workshops, hackathons, and career opportunities.
            </p>
          </div>

          <div className="inline-flex w-full max-w-[310px] items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-[0_18px_40px_rgba(30,30,36,0.1)] ring-1 ring-[#1e1e24]/8">
            <span className="font-['Lexend',sans-serif] text-lg font-medium text-[#1e1e24]">
              {currentAcademicYearLabel}
            </span>
            <FaChevronDown className="h-4 w-4 text-[#1e1e24]" />
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {boardMembers.map((boardMember) => (
            <BoardMemberCard
              key={boardMember.id}
              boardMember={boardMember}
              onLearnMore={setSelectedBoardMember}
            />
          ))}
        </div>
      </section>

      <BoardMemberModal
        boardMember={selectedBoardMember}
        onClose={() => setSelectedBoardMember(null)}
      />
    </>
  );
}
