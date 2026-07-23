import type { ComponentType } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiGit,
  SiVite,
} from "react-icons/si";
import { RiReactjsLine, RiTailwindCssFill, RiNodejsFill, RiGithubFill } from "react-icons/ri";
import { Webhook } from "lucide-react";

export interface StackItem {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
}

// The About section's full current stack — a broader list than the
// hero's floating chips, for the "Current Tech Stack" grid.
export const techStack: StackItem[] = [
  { id: "html5", name: "HTML5", icon: SiHtml5 },
  { id: "css3", name: "CSS3", icon: SiCss },
  { id: "javascript", name: "JavaScript", icon: SiJavascript },
  { id: "typescript", name: "TypeScript", icon: SiTypescript },
  { id: "react", name: "React", icon: RiReactjsLine },
  { id: "tailwind", name: "Tailwind CSS", icon: RiTailwindCssFill },
  { id: "nodejs", name: "Node.js", icon: RiNodejsFill },
  { id: "rest-apis", name: "REST APIs", icon: Webhook },
  { id: "git", name: "Git", icon: SiGit },
  { id: "github", name: "GitHub", icon: RiGithubFill },
  { id: "vite", name: "Vite", icon: SiVite },
];
