import { useEffect } from "react";
import { FaGlobe, FaLinkedinIn, FaXmark } from "react-icons/fa6";

import type { BoardMember } from "../data/boardData";

type BoardMemberModalProps = {
  boardMember: BoardMember | null;
  onClose: () => void;
};

export function BoardMemberModal({
  boardMember,
  onClose,
}: BoardMemberModalProps) {
  useEffect(() => {
    if (!boardMember) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [boardMember, onClose]);

  if (!boardMember) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0b0b12]/70 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="board-member-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[36px] bg-white shadow-[0_40px_120px_rgba(11,11,18,0.38)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1e1e24] shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
          aria-label="Close board member modal"
        >
          <FaXmark className="h-5 w-5" />
        </button>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div
            className={[
              "flex min-h-80 items-center justify-center p-8 sm:p-10",
              boardMember.hasPhoto ? "bg-slate-100" : "bg-[#1e1e24]",
            ].join(" ")}
          >
            <img
              src={boardMember.photoSrc}
              alt={boardMember.hasPhoto ? boardMember.fullName : "Code For All logo"}
              className={[
                "h-full w-full rounded-[28px]",
                boardMember.hasPhoto
                  ? "max-h-130 object-cover"
                  : "max-h-52 object-contain p-6",
              ].join(" ")}
            />
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <p className="font-['Lexend',sans-serif] text-sm font-medium uppercase tracking-[0.24em] text-fuchsia-600">
              Meet the board
            </p>

            <h2
              id="board-member-title"
              className="mt-3 font-['Lexend',sans-serif] text-4xl font-medium tracking-[-0.04em] text-[#1e1e24] sm:text-5xl"
            >
              {boardMember.fullName}
            </h2>

            <p className="mt-3 font-['Lexend',sans-serif] text-2xl font-medium text-slate-700">
              {boardMember.role}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-fuchsia-100 px-4 py-2 font-['Lexend',sans-serif] text-sm font-medium text-fuchsia-900">
                {boardMember.year}
              </span>
              <span className="rounded-full bg-slate-100 px-4 py-2 font-['Lexend',sans-serif] text-sm font-medium text-slate-700">
                {boardMember.degree}
              </span>
            </div>

            <div className="mt-8 space-y-6 text-slate-700">
              <section>
                <h3 className="font-['Lexend',sans-serif] text-lg font-medium text-[#1e1e24]">
                  About
                </h3>
                <p className="mt-2 text-base leading-7">{boardMember.summary}</p>
              </section>

              <section>
                <h3 className="font-['Lexend',sans-serif] text-lg font-medium text-[#1e1e24]">
                  Experience
                </h3>
                <p className="mt-2 text-base leading-7">{boardMember.experience}</p>
              </section>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {boardMember.linkedin ? (
                <a
                  href={boardMember.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1e1e24] px-4 py-3 font-['Lexend',sans-serif] text-sm font-medium text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                  LinkedIn
                </a>
              ) : null}

              {boardMember.website ? (
                <a
                  href={boardMember.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-100 px-4 py-3 font-['Lexend',sans-serif] text-sm font-medium text-fuchsia-900 transition hover:bg-fuchsia-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                >
                  <FaGlobe className="h-4 w-4" />
                  Website
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
