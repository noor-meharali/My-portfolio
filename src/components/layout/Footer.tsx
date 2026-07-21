import { profile, socialLinks } from "@/data/profile";
import { navItems } from "@/data/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="#home" data-cursor="link" className="font-display text-lg font-semibold text-ink">
            {profile.name}
            <span className="text-signal-cyan">.</span>
          </a>
          <p className="mt-3 max-w-xs font-mono-tight text-xs text-muted-2">
            {"// "}Designed &amp; built from scratch — no template.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-cursor="link"
              className="font-mono-tight text-xs text-muted uppercase transition-colors duration-300 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              data-cursor="link"
              className="text-muted transition-colors duration-300 hover:text-signal-cyan"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center font-mono-tight text-[11px] text-muted-2 md:flex-row md:text-left">
        <span>
          &copy; {year} {profile.name}. All rights reserved.
        </span>
        <a href="#home" data-cursor="link" className="transition-colors duration-300 hover:text-signal-cyan">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
