"use client";

import { motion } from "framer-motion";
import { Profile } from "../../lib/data/profiles";
import React from "react";
import { HeartIcon, TrophyIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface InterestsProps {
  profile: Profile;
}

const ICON_MAP: Record<string, any> = {
  football: TrophyIcon,
  gym: HeartIcon,
  cats: SparklesIcon,
};

function InterestsSectionComponent({ profile }: InterestsProps) {
  if (!profile.interests) return null;

  return (
    <section id="interests" className="px-4 py-32 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white italic">
            {profile.interestsTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profile.interests.map((interest, idx) => {
            const Icon = ICON_MAP[interest.id];
            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-[32px] border border-white/5 bg-zinc-900/20 backdrop-blur-sm hover:border-nebula-accent/30 transition-all duration-500"
              >
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-nebula-accent/10 text-nebula-accent group-hover:scale-110 transition-transform">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {interest.label}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {interest.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const InterestsSection = React.memo(InterestsSectionComponent);
