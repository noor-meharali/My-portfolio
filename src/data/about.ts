import type { ComponentType } from "react";
import { Accessibility, BookOpen, Code2, Component, Network, Ruler, Sparkles, Zap } from "lucide-react";

export interface PhilosophyPoint {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

export interface AboutInfo {
  availability: string;
  introduction: string[];
  interests: string[];
  experienceTitle: string;
  experienceDescription: string;
  philosophy: PhilosophyPoint[];
  currentlyLearning: string;
  ctaHeading: string;
  ctaMessage: string;
}

// Everything the About section's copy is built from — edit here, not in
// the components, so the section stays data-driven. Identity fields
// (name, role, location, portrait) live in data/profile.ts — this file
// only holds About-specific content, so there's one source of truth.
export const aboutInfo: AboutInfo = {
  availability: "Available for Opportunities",
  introduction: [
    "I'm Noor Ali, a front-end developer based in Islamabad, Pakistan. I started building for the web in May 2025, and what began as curiosity quickly turned into a genuine passion for writing code and solving problems through software.",
    "My focus is on building interfaces that feel fast, considered, and alive — clean architecture on the inside, motion and detail on the outside. I care about UI engineering, thoughtful animation, performance, and interfaces that hold up on any device.",
  ],
  interests: ["UI Engineering", "Beautiful Animations", "Performance", "Responsive Design", "Modern User Experience"],
  experienceTitle: "Self-Employed Developer",
  experienceDescription:
    "I've built my skills the hands-on way — through personal projects, exploring modern tools and frameworks, and shipping production-quality web applications on my own initiative. Every project sharpens the same fundamentals: clean code, real UX judgment, and an eye for detail.",
  philosophy: [
    {
      id: "clean-code",
      title: "Clean Code",
      description: "Code that reads clearly and holds up under change, not just code that runs.",
      icon: Code2,
    },
    {
      id: "reusable-components",
      title: "Reusable Components",
      description: "Building blocks designed once, composed everywhere, maintained in one place.",
      icon: Component,
    },
    {
      id: "user-experience",
      title: "User Experience",
      description: "Every decision gets weighed against how it actually feels to use.",
      icon: Sparkles,
    },
    {
      id: "accessibility",
      title: "Accessibility",
      description: "Interfaces that work for everyone, not just the easiest case to test.",
      icon: Accessibility,
    },
    {
      id: "performance",
      title: "Performance",
      description: "Fast by default — every animation and asset earns its cost.",
      icon: Zap,
    },
    {
      id: "continuous-learning",
      title: "Continuous Learning",
      description: "The stack changes constantly, so staying curious isn't optional.",
      icon: BookOpen,
    },
    {
      id: "scalable-architecture",
      title: "Scalable Architecture",
      description: "Structure that stays sane whether a project has one page or a hundred.",
      icon: Network,
    },
    {
      id: "pixel-perfect",
      title: "Pixel-Perfect Interfaces",
      description: "Spacing, alignment, and detail treated as part of the engineering, not an afterthought.",
      icon: Ruler,
    },
  ],
  currentlyLearning:
    "Currently expanding my expertise beyond front-end development by learning backend technologies and preparing for the MERN stack ecosystem.",
  ctaHeading: "Let's build something great.",
  ctaMessage: "I'm always open to interesting projects and good conversations — reach out if you'd like to collaborate.",
};
