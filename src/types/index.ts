import type { ComponentType } from "react";

export interface TechItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  /** Orbit ring this chip sits on, closer rings feel "nearer" in the parallax. */
  ring: 1 | 2;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface Profile {
  name: string;
  role: string;
  roleVariants: string[];
  tagline: string;
  intro: string;
  location: string;
  availability: string;
  resumeHref: string;
  email: string;
  phone: string;
  website: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  href: string;
}
