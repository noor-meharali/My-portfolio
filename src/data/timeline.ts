export type MilestoneStatus = "complete" | "current" | "upcoming";

export interface TimelineMilestone {
  id: string;
  label: string;
  status: MilestoneStatus;
}

// The Developer Journey timeline, in order. `status` drives the visual
// treatment in Timeline.tsx (filled / pulsing / outline node).
export const timelineMilestones: TimelineMilestone[] = [
  { id: "start", label: "Started learning Web Development — May 2025", status: "complete" },
  { id: "html-css", label: "Mastered HTML & CSS", status: "complete" },
  { id: "js", label: "Learned Modern JavaScript", status: "complete" },
  { id: "responsive", label: "Built Responsive Websites", status: "complete" },
  { id: "react", label: "Started React Development", status: "complete" },
  { id: "typescript", label: "Learned TypeScript", status: "complete" },
  { id: "portfolio", label: "Created Modern Portfolio Projects", status: "complete" },
  { id: "advanced", label: "Currently Learning Advanced Front-End Development", status: "current" },
  { id: "mern", label: "Preparing to Become a MERN Stack Developer", status: "upcoming" },
];
