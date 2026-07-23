import type { ComponentType } from "react";
import { Layers, Rocket, Database, Brain, TrendingUp, Globe } from "lucide-react";

export interface Goal {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
}

// The Future Goals roadmap, in order.
export const goals: Goal[] = [
  { id: "mern", title: "Become a highly skilled MERN Stack Developer.", icon: Layers },
  { id: "scalable-apps", title: "Build scalable, production-ready full-stack web applications.", icon: Rocket },
  {
    id: "backend-mastery",
    title: "Master backend architecture, databases, APIs, authentication, and deployment.",
    icon: Database,
  },
  {
    id: "continuous-growth",
    title: "Continuously improve problem-solving and software engineering skills.",
    icon: Brain,
  },
  {
    id: "senior-role",
    title: "Grow into a Senior Full-Stack Developer capable of leading modern web application development.",
    icon: TrendingUp,
  },
  {
    id: "freelance",
    title: "Build a successful freelance career by delivering high-quality solutions to clients worldwide.",
    icon: Globe,
  },
];
