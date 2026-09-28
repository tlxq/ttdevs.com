"use client";

import { motion } from "framer-motion";
import { Profile } from "../../lib/data/profiles";
import React from "react";
import { 
  CommandLineIcon, 
  PaintBrushIcon, 
  CpuChipIcon, 
  ServerStackIcon, 
  CircleStackIcon,
  SparklesIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

interface SkillsProps {
  profile: Profile;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Frontend: PaintBrushIcon,
  Backend: ServerStackIcon,
  Fullstack: GlobeAltIcon,
  Tools: CommandLineIcon,
  Database: CircleStackIcon,
  Styling: SparklesIcon,
  Animation: SparklesIcon,
  DevOps: CpuChipIcon,
};

function SkillsSectionComponent({ profile }: SkillsProps) {
  return (
    <section id="skills" className="px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profile.skills.map((skill, idx) => {
            const Icon = CATEGORY_ICONS[skill.category] || CommandLineIcon;
            const techs = skill.name.split(",").map(s => s.trim());

            return (
              <motion.div
                key={`${skill.category}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[32px] border border-white/5 bg-zinc-950/40 p-10 backdrop-blur-xl transition-all duration-500 hover:border-nebula-accent/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
              >
                {/* Subtle Background Icon */}
                <div className="absolute -right-4 -top-4 opacity-[0.03] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                  <Icon className="h-32 w-32 text-white" />
                </div>

                <div className="relative z-10">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-nebula-accent/10 text-nebula-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-nebula-accent/70">
                        {skill.category}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight">Mastery</h3>
                    </div>
                  </div>
                  
                  {/* Tech Tags Container */}
                  <div className="mb-10 flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span 
                        key={tech}
                        className="rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-nebula-accent/20 hover:bg-nebula-accent/5 hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      <span>Proficiency</span>
                      <span className="text-nebula-accent font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5 p-[1px]">
                      <motion.div 
                        className="h-full rounded-full bg-gradient-to-r from-nebula-accent via-nebula-secondary to-nebula-cyan"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const SkillsSection = React.memo(SkillsSectionComponent);
