export interface EducationEntry {
  id: string;
  title: string;
  institution?: string;
  meta?: string;
}

export interface EducationInfo {
  highest: EducationEntry;
  training: EducationEntry;
  certification: EducationEntry;
  future: string;
}

export const educationInfo: EducationInfo = {
  highest: { id: "intermediate", title: "Intermediate", meta: "Completed in 2026" },
  training: { id: "web-dev-training", title: "Web Development Training", institution: "Bano Qabil Institute" },
  certification: { id: "web-dev-cert", title: "Certified in Web Development", institution: "Bano Qabil Institute" },
  future: "Planning to pursue a Bachelor's degree in Software Engineering while continuing professional development.",
};
