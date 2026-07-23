import { motion } from "framer-motion";
import { Award, GraduationCap, MessageSquare, Rocket } from "lucide-react";
import { aboutInfo } from "@/data/about";
import { educationInfo } from "@/data/education";
import { techStack } from "@/data/techStack";
import { goals } from "@/data/goals";
import { profile } from "@/data/profile";
import { ProfileCard } from "@/components/about/ProfileCard";
import { Timeline } from "@/components/about/Timeline";
import { MagneticButton } from "@/components/ui/MagneticButton";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, amount: 0.2 },
};

const staggerItem = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
};

/**
 * Section eyebrow + heading, reused for every subsection below so the
 * typographic rhythm stays consistent without a separate shared file
 * (the requested folder only calls for About/ProfileCard/Timeline).
 */
function SectionHeading({ eyebrow, title, centered = false }: { eyebrow: string; title: string; centered?: boolean }) {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.5 }} className={centered ? "mb-10 text-center" : "mb-6"}>
      <p className="font-mono-tight text-xs text-signal-cyan uppercase">
        <span className="text-muted">{"// "}</span>
        {eyebrow}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h3>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative px-6 py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <p className="font-mono-tight text-xs text-signal-cyan uppercase">
            <span className="text-muted">{"// "}</span>About
          </p>
          <h2 id="about-heading" className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
            Who I am, <span className="text-gradient-signal">and where I'm headed</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Profile card — sticky alongside the scrolling copy on desktop */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProfileCard />
          </div>

          <div className="flex flex-col gap-16">
            {/* Introduction */}
            <div>
              <SectionHeading eyebrow="Introduction" title="A little about me" />
              <div className="space-y-4">
                {aboutInfo.introduction.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="text-base leading-relaxed text-muted sm:text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.ul
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 flex flex-wrap gap-2"
                aria-label="Areas of interest"
              >
                {aboutInfo.interests.map((interest) => (
                  <li
                    key={interest}
                    className="glass rounded-full px-3.5 py-1.5 font-mono-tight text-[11px] text-muted uppercase"
                  >
                    {interest}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Developer Journey */}
            <div>
              <SectionHeading eyebrow="Developer Journey" title="How I got here" />
              <Timeline />
            </div>

            {/* Experience */}
            <div>
              <SectionHeading eyebrow="Experience" title={aboutInfo.experienceTitle} />
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.5 }}
                className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
              >
                {aboutInfo.experienceDescription}
              </motion.p>
            </div>

            {/* Education */}
            <div>
              <SectionHeading eyebrow="Education" title="Education & Certification" />
              <motion.div
                {...staggerContainer}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                role="list"
              >
                {[
                  { ...educationInfo.highest, icon: GraduationCap },
                  { ...educationInfo.training, icon: GraduationCap },
                  { ...educationInfo.certification, icon: Award },
                ].map((entry) => (
                  <motion.div
                    key={entry.id}
                    {...staggerItem}
                    transition={{ duration: 0.45 }}
                    whileHover={{ y: -3 }}
                    role="listitem"
                    className="glass rounded-2xl p-5"
                  >
                    <entry.icon className="h-5 w-5 text-signal-cyan" aria-hidden="true" />
                    <p className="mt-3 font-display text-base font-semibold text-ink">{entry.title}</p>
                    {entry.institution && <p className="mt-1 text-sm text-muted">{entry.institution}</p>}
                    {entry.meta && <p className="mt-1 font-mono-tight text-xs text-muted-2">{entry.meta}</p>}
                  </motion.div>
                ))}
              </motion.div>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-5 max-w-2xl text-sm text-muted sm:text-base"
              >
                {educationInfo.future}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Development Philosophy */}
        <div className="mt-28">
          <SectionHeading eyebrow="Philosophy" title="How I approach the work" centered />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
          >
            {aboutInfo.philosophy.map((point) => (
              <motion.div
                key={point.id}
                {...staggerItem}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -4 }}
                role="listitem"
                className="glass rounded-2xl p-5"
              >
                <point.icon className="h-5 w-5 text-signal-violet" aria-hidden="true" />
                <p className="mt-3 font-display text-base font-semibold text-ink">{point.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Current Tech Stack */}
        <div className="mt-28">
          <SectionHeading eyebrow="Tech Stack" title="What I build with" centered />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6"
            role="list"
          >
            {techStack.map((tech) => (
              <motion.div
                key={tech.id}
                {...staggerItem}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.04 }}
                role="listitem"
                className="glass group relative flex flex-col items-center gap-2.5 overflow-hidden rounded-2xl px-3 py-6 text-center"
              >
                <div
                  className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50"
                  style={{ background: "radial-gradient(circle, var(--color-signal-cyan) 0%, transparent 70%)" }}
                  aria-hidden="true"
                />
                <tech.icon className="h-7 w-7 text-ink transition-colors duration-300 group-hover:text-signal-cyan" />
                <span className="font-mono-tight text-[10px] text-muted uppercase">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Currently Learning */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="glass mx-auto mt-28 flex max-w-2xl flex-col items-center gap-3 rounded-2xl px-8 py-10 text-center"
        >
          <Rocket className="h-6 w-6 text-signal-amber" aria-hidden="true" />
          <p className="font-mono-tight text-xs text-signal-cyan uppercase">
            <span className="text-muted">{"// "}</span>Currently Learning
          </p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">{aboutInfo.currentlyLearning}</p>
        </motion.div>

        {/* Future Goals */}
        <div className="mt-28">
          <SectionHeading eyebrow="Roadmap" title="Where I'm headed next" centered />
          <motion.ol {...staggerContainer} className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {goals.map((goal, i) => (
              <motion.li
                key={goal.id}
                {...staggerItem}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -3 }}
                className="glass flex items-start gap-4 rounded-2xl p-5"
              >
                <span className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono-tight text-xs text-signal-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <goal.icon className="h-4 w-4 text-signal-violet" aria-hidden="true" />
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{goal.title}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* Call To Action */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-28 flex flex-col items-center gap-5 text-center"
        >
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{aboutInfo.ctaHeading}</h3>
          <p className="max-w-md text-sm text-muted sm:text-base">{aboutInfo.ctaMessage}</p>
          <MagneticButton href={`mailto:${profile.email}`} variant="primary">
            <MessageSquare className="h-4 w-4" /> Get In Touch
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
