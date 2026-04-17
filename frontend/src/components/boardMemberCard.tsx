import type { BoardMember } from "../data/boardData";

type BoardMemberCardProps = {
  boardMember: BoardMember;
  onLearnMore: (boardMember: BoardMember) => void;
};

export function BoardMemberCard({
  boardMember,
  onLearnMore,
}: BoardMemberCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-4xl bg-white shadow-[0_24px_80px_rgba(30,30,36,0.16)] ring-1 ring-[#1e1e24]/8">
      <div
        className={[
          "flex aspect-346/294 items-center justify-center overflow-hidden",
          boardMember.hasPhoto ? "bg-slate-200" : "bg-[#1e1e24]",
        ].join(" ")}
      >
        <img
          src={boardMember.photoSrc}
          alt={boardMember.hasPhoto ? boardMember.fullName : "Code For All logo"}
          className={[
            "h-full w-full",
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

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={() => onLearnMore(boardMember)}
            className="inline-flex min-h-9.25 items-center justify-center rounded-xl bg-[#c084fc] px-6 py-2 font-['Lexend',sans-serif] text-base font-medium text-[#1e1e24] transition hover:bg-[#a855f7] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2"
          >
            Learn More
          </button>
        </div>
      </div>
    </article>
  );
}
