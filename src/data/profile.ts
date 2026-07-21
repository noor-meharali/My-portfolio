import type { Profile, SocialLink, TechItem } from "@/types";
import {
  RiReactjsLine,
  RiNextjsFill,
  RiTailwindCssFill,
  RiNodejsFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
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
  location: "Pakistan",
  availability: "Available for select projects",
  resumeHref: "/resume/Noor-Ali-Resume.pdf",
  email: "hello@noorali.dev",
};

export const socialLinks: SocialLink[] = [
  { id: "github", label: "GitHub", href: "https://github.com/", icon: RiGithubFill },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/", icon: RiLinkedinBoxFill },
  { id: "twitter", label: "X / Twitter", href: "https://twitter.com/", icon: RiTwitterXFill },
  { id: "email", label: "Email", href: "mailto:hello@noorali.dev", icon: Mail },
];

export const techStack: TechItem[] = [
  { id: "react", label: "React", icon: RiReactjsLine, ring: 1 },
  { id: "nextjs", label: "Next.js", icon: RiNextjsFill, ring: 1 },
  { id: "typescript", label: "TypeScript", icon: SiTypescript, ring: 2 },
  { id: "javascript", label: "JavaScript", icon: SiJavascript, ring: 2 },
  { id: "tailwind", label: "Tailwind CSS", icon: RiTailwindCssFill, ring: 1 },
  { id: "nodejs", label: "Node.js", icon: RiNodejsFill, ring: 2 },
];
