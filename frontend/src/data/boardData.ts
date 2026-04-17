import boardInfoRaw from "../../../board_info.json";

import cfaHorizontalLogo from "../assets/cfaLogos/CFA Horizontal Logo.png";

type BoardMemberJson = {
  firstName: string;
  lastName: string;
  role: string;
  year: string;
  degree: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: string;
  photo: string;
};

export type BoardMember = {
  id: string;
  fullName: string;
  role: string;
  year: string;
  degree: string;
  linkedin?: string;
  website?: string;
  summary: string;
  experience: string;
  photoSrc: string;
  hasPhoto: boolean;
};

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

export const currentAcademicYearLabel = getAcademicYearLabel(new Date());

//TODO: missing "ruhi, angel, eric, poyo"
export const boardMembers: BoardMember[] = boardInfo.map(
  (boardMember, index) => {
    const photoFileName = boardMember.photo.trim().toLowerCase();
    const photoSrc = photoFileName
      ? (boardImagesByName[photoFileName] ?? cfaHorizontalLogo)
      : cfaHorizontalLogo;

    return {
      id: `${boardMember.firstName}-${boardMember.lastName}-${index}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      fullName: `${boardMember.firstName} ${boardMember.lastName}`.trim(),
      role: boardMember.role.trim(),
      year: boardMember.year.trim(),
      degree: boardMember.degree.trim(),
      linkedin: boardMember.linkedin.trim() || undefined,
      website: boardMember.website.trim() || undefined,
      summary: boardMember.summary.trim() || "Board member bio coming soon.",
      experience:
        boardMember.experience.trim() || "Experience details coming soon.",
      photoSrc,
      hasPhoto: Boolean(photoFileName && boardImagesByName[photoFileName]),
    };
  },
);

function getAcademicYearLabel(date: Date) {
  const startYear =
    date.getMonth() >= 7 ? date.getFullYear() : date.getFullYear() - 1;
  return `Academic Year ${startYear}-${startYear + 1}`;
}
