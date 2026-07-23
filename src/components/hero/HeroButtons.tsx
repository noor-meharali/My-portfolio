import { motion } from "framer-motion";
import { Download, FolderGit2, MessageSquare } from "lucide-react";
import { socialLinks } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Hero's CTA row (View Projects / Download Resume / Contact Me) plus the
 * social-icon row beneath it. Self-contained — reads socialLinks
 * directly, no props needed from Hero.tsx.
 */
export function HeroButtons() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="mt-9 flex flex-wrap items-center gap-4"
      >
        <MagneticButton href="#projects" variant="primary">
          <FolderGit2 className="h-4 w-4" /> View Projects
        </MagneticButton>
        <MagneticButton href="/Noor_Ali_Resume.pdf" variant="ghost" download target="_blank">
          <Download className="h-4 w-4" /> Download Resume
        </MagneticButton>
        <MagneticButton href="#contact" variant="ghost">
          <MessageSquare className="h-4 w-4" /> Contact Me
        </MagneticButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="mt-12 flex items-center gap-5"
      >
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
      </motion.div>
    </>
  );
}
