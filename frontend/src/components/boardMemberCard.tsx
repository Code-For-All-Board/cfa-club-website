import { motion } from "motion/react";

import type { BoardMember } from "../data/boardData";

type BoardMemberCardProps = {
  boardMember: BoardMember;
  onOpenBoardMember: (boardMember: BoardMember) => void;
};

export function BoardMemberCard({
  boardMember,
  onOpenBoardMember,
}: BoardMemberCardProps) {
  return (
    <motion.button
      layout
      type="button"
      onClick={() => onOpenBoardMember(boardMember)}
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="hover:cursor-pointer group flex h-full w-full flex-col overflow-hidden rounded-4xl bg-white text-left shadow-[0_24px_80px_rgba(30,30,36,0.16)] ring-1 ring-[#1e1e24]/8 transition-shadow hover:shadow-[0_30px_90px_rgba(30,30,36,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2"
    >
      <div
        className={[
          "flex aspect-346/294 items-center justify-center overflow-hidden s",
          boardMember.hasPhoto ? "bg-slate-200" : "bg-[#1e1e24]",
        ].join(" ")}
      >
        <img
          src={boardMember.photoSrc}
          alt={boardMember.hasPhoto ? boardMember.fullName : "Code For All logo"}
          style={
            boardMember.hasPhoto && boardMember.photoPosition
              ? { objectPosition: boardMember.photoPosition }
              : undefined
          }
          className={[
            "h-full w-full transition duration-500 group-hover:scale-[1.03]",
            boardMember.hasPhoto ? "object-cover" : "max-h-32 object-contain px-8",
          ].join(" ")}
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
        <h2 className="font-['Lexend',sans-serif] text-[2rem] font-medium leading-none text-[#1e1e24]">
          {boardMember.fullName}
        </h2>

        <p className="mt-3 font-['Lexend',sans-serif] text-xl font-medium text-slate-700">
          {boardMember.role}
        </p>

        <p className="mt-4 line-clamp-3 text-base leading-7 text-slate-600">
          {boardMember.summary}
        </p>
      </div>
    </motion.button>
  );
}
