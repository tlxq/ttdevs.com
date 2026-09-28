"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Profile } from "../../lib/data/profiles";
import React from "react";

interface ProjectsProps {
  profile: Profile;
}

function ProjectsSectionComponent({ profile }: ProjectsProps) {
  return (
    <section id="projects" className="px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-nebula-accent text-xs font-bold tracking-widest uppercase font-mono mb-4 block">
            Selected Works
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white italic">
            Engineered <span className="text-gradient inline-block px-4 italic">Growth</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profile.projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="group h-full flex flex-col p-8 bg-zinc-900/20">
                <div className="mb-auto">
                  <span className="text-nebula-accent text-[10px] font-bold font-mono tracking-tighter uppercase mb-4 block">
                    {project.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-nebula-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4">
                  {project.stack && (
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                      {project.stack.join(" · ")}
                    </span>
                  )}
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-xs font-bold text-white hover:text-nebula-secondary transition-colors inline-flex items-center gap-2"
                    >
                      Visit Site
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const ProjectsSection = React.memo(ProjectsSectionComponent);
