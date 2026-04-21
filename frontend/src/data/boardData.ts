import boardInfoRaw from "../../../board_info.json";

import cfaHorizontalLogo from "../assets/cfaLogos/CFA Horizontal Logo.png";

type BoardMemberJson = {
  firstName: string;
  lastName: string;
  roles?: string[];
  filterTags?: BoardFilterId[];
  year: string;
  degree: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: string;
  photo: string;
  past_board?: string | boolean;
};

export type BoardFilterId =
  | "executive"
  | "academics"
  | "events"
  | "marketing"
  | "pastBoard";

export type BoardMember = {
  id: string;
  fullName: string;
  roles: string[];
  role: string;
  year: string;
  degree: string;
  linkedin?: string;
  website?: string;
  summary: string;
  experience: string;
  photoSrc: string;
  hasPhoto: boolean;
  pastBoard: boolean;
  filterTags: BoardFilterId[];
};

export const boardFilterOptions: Array<{
  id: BoardFilterId;
  label: string;
}> = [
  { id: "executive", label: "Executive" },
  { id: "academics", label: "Academics" },
  { id: "events", label: "Events" },
  { id: "marketing", label: "Marketing" },
  { id: "pastBoard", label: "Past Board (all)" },
];

const boardImageModules = import.meta.glob("../assets/boardImages/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const boardImagesByName = Object.fromEntries(
  Object.entries(boardImageModules).map(([filePath, imageSrc]) => {
    const fileName = filePath.split("/").pop() ?? filePath;
    return [fileName.toLowerCase(), imageSrc];
  }),
);

const boardInfo = boardInfoRaw as BoardMemberJson[];

export const boardMembers: BoardMember[] = boardInfo.map(
  (boardMember, index) => {
    const photoFileName = boardMember.photo.trim().toLowerCase();
    const photoSrc = photoFileName
      ? (boardImagesByName[photoFileName] ?? cfaHorizontalLogo)
      : cfaHorizontalLogo;
    const pastBoard = String(boardMember.past_board).toLowerCase() === "true";
    const roles = boardMember.roles ?? [];
    const filterTags: BoardFilterId[] = pastBoard
      ? ["pastBoard"]
      : (boardMember.filterTags ?? []);

    return {
      id: `${boardMember.firstName}-${boardMember.lastName}-${index}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      fullName: `${boardMember.firstName} ${boardMember.lastName}`.trim(),
      roles,
      role: formatRoles(roles),
      year: boardMember.year.trim(),
      degree: boardMember.degree.trim(),
      linkedin: boardMember.linkedin.trim() || undefined,
      website: boardMember.website.trim() || undefined,
      summary: boardMember.summary.trim() || "Board member bio coming soon.",
      experience:
        boardMember.experience.trim() || "Experience details coming soon.",
      photoSrc,
      hasPhoto: Boolean(photoFileName && boardImagesByName[photoFileName]),
      pastBoard,
      filterTags,
    };
  },
);

function formatRoles(roles: string[]) {
  if (roles.length === 0) {
    return "Board Member";
  }

  if (roles.length === 1) {
    return roles[0];
  }

  return roles.join(" & ");
}
