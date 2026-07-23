import type { Profile, SocialLink, TechItem } from "@/types";
import {
  RiReactjsLine,
  RiNextjsFill,
  RiTailwindCssFill,
  RiNodejsFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiInstagramLine,
} from "react-icons/ri";
import { SiTypescript, SiJavascript } from "react-icons/si";
import { Mail } from "lucide-react";

export const profile: Profile = {
  name: "Noor Ali",
  role: "Front-End Developer",
  roleVariants: [
    "Front-End Developer",
    "Interface Engineer",
    "Motion & UI Craftsman",
  ],
  tagline: "Building immersive digital experiences with modern web technologies.",
  intro:
    "I design and build fast, expressive web interfaces — where clean architecture meets motion that feels intentional, not decorative.",
  location: "Islamabad, Pakistan",
  availability: "Available for select projects",
  resumeHref: "/assets/docs/Noor_Ali_Resume.pdf",
  email: "nooraliujjan3@gmail.com",
  phone: "9232 9548 2080",
  website: "/",
  portrait: "/assets/images/profile/profile.jpg",
};

export const socialLinks: SocialLink[] = [
  { id: "github", label: "GitHub", href: "https://github.com/noor-meharali", icon: RiGithubFill },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/noormehar110", icon: RiLinkedinBoxFill },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/noor_mehar110", icon: RiInstagramLine },
  { id: "email", label: "Email", href: "mailto:nooraliujjan3@gmail.com", icon: Mail },
];

export const techStack: TechItem[] = [
  { id: "react", label: "React", icon: RiReactjsLine, ring: 1 },
  { id: "nextjs", label: "Next.js", icon: RiNextjsFill, ring: 1 },
  { id: "typescript", label: "TypeScript", icon: SiTypescript, ring: 2 },
  { id: "javascript", label: "JavaScript", icon: SiJavascript, ring: 2 },
  { id: "tailwind", label: "Tailwind CSS", icon: RiTailwindCssFill, ring: 1 },
  { id: "nodejs", label: "Node.js", icon: RiNodejsFill, ring: 2 },
];
