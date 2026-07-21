export interface NavItem {
  id: string;
  label: string;
}

// Ids match the section `id` attributes those sections will use once built
// (only #home exists today — the rest light up automatically as each
// section lands, no Navbar changes needed).
export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
