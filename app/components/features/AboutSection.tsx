"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Profile, PROFILES } from "../../lib/data/profiles";
import React from "react";

interface AboutProps {
  profile: Profile;
}

function AboutSectionComponent({ profile }: AboutProps) {
  return (
    <section id="about" className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              {profile.aboutTitle}
            </h2>
            <div className="h-1 w-12 bg-zinc-700" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8"
          >
            <Card className="bg-zinc-900/40 p-10 border-white/5">
              <p className="text-xl text-zinc-400 leading-relaxed text-balance">
                {profile.aboutText}
              </p>
              
              {profile.id === "joint" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5">
                  <div>
                    <h3 className="text-white font-bold mb-2">Tom // {PROFILES.tom.role}</h3>
                    <p className="text-sm text-zinc-500">{PROFILES.tom.bio}</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Therese // {PROFILES.therese.role}</h3>
                    <p className="text-sm text-zinc-500">{PROFILES.therese.bio}</p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const AboutSection = React.memo(AboutSectionComponent);
