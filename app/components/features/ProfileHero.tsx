"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Profile } from "../../lib/data/profiles";
import React from "react";

import Image from "next/image";

interface HeroProps {
  profile: Profile;
  scrollToSection: (id: string) => void;
}

function ProfileHeroComponent({ profile, scrollToSection }: HeroProps) {
  const isJoint = profile.id === "joint";

  // Joint Profile Layout (Centered Stack)
  if (isJoint) {
    return (
      <section className="relative flex min-h-[100vh] items-center justify-center px-4 overflow-hidden pt-32 pb-20">
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
          {/* Header Info */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <motion.span
              className="mb-6 inline-block px-6 py-2 rounded-full border border-nebula-accent/20 bg-nebula-accent/5 text-[10px] font-bold tracking-[0.3em] uppercase text-nebula-accent font-mono backdrop-blur-sm"
              animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.2)", "0 0 20px rgba(139,92,246,0)"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {profile.role}
            </motion.span>
            
            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white leading-[0.8]">
              TT<span className="text-gradient">DEVS</span>
            </h1>
          </motion.div>

          {/* Duo Portrait Group */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-16 flex justify-center items-center"
          >
            {/* Background Aura for the Duo */}
            <div className="absolute inset-0 bg-nebula-accent/10 blur-[120px] rounded-full scale-150 opacity-50" />
            
            <div className="flex -space-x-16 md:-space-x-24 relative z-10">
              <Link href="/tom" className="group">
                <div className="relative h-64 w-64 md:h-[400px] md:w-[350px] rounded-[40px] overflow-hidden border border-white/10 glass rotate-[-4deg] shadow-2xl transition-all hover:rotate-0 hover:scale-105 duration-700 hover:z-20 hover:border-nebula-accent/30">
                  <Image src="/tom-profile.webp" alt="Tom" fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/40 to-transparent group-hover:from-nebula-accent/10" />
                  <div className="absolute inset-0 flex items-end justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono tracking-widest text-nebula-accent bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-nebula-accent/20">VIEW TOM'S SPACE</span>
                  </div>
                </div>
              </Link>
              <Link href="/therese" className="group">
                <div className="relative h-64 w-64 md:h-[400px] md:w-[350px] rounded-[40px] overflow-hidden border border-white/10 glass rotate-[4deg] mt-12 md:mt-20 shadow-2xl transition-all hover:rotate-0 hover:scale-105 duration-700 hover:z-20 hover:border-nebula-accent/30">
                  <Image src="/therese-profile.webp" alt="Therese" fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/40 to-transparent group-hover:from-nebula-accent/10" />
                  <div className="absolute inset-0 flex items-end justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono tracking-widest text-nebula-accent bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-nebula-accent/20">VIEW THERESE'S SPACE</span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Bio & Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-2xl"
          >
            <p className="text-lg md:text-2xl text-slate-400 leading-relaxed mb-12 font-light text-balance">
              {profile.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/tom">
                <Button size="lg" variant="primary">
                  Explore Tom
                </Button>
              </Link>
              <Link href="/therese">
                <Button size="lg" variant="outline">
                  Explore Therese
                </Button>
              </Link>
              <Button onClick={() => scrollToSection("contact")} size="lg" variant="ghost">
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-nebula-accent/5 blur-[160px] -z-10 rounded-full" />
      </section>
    );
  }

  // Individual Profile Layout (Original 2-Column)
  return (
    <section className="relative flex min-h-[95vh] items-center justify-center px-4 overflow-hidden pt-20">
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="flex flex-col items-center lg:items-start gap-4 mb-6">
            <motion.span
              className="inline-block px-6 py-2 rounded-full border border-nebula-accent/20 bg-nebula-accent/5 text-[10px] font-bold tracking-[0.3em] uppercase text-nebula-accent font-mono backdrop-blur-sm"
              animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.2)", "0 0 20px rgba(139,92,246,0)"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {profile.role}
            </motion.span>
            
            {profile.liaStatus && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-4 py-1.5 rounded-lg border border-nebula-secondary/30 bg-nebula-secondary/10 text-[9px] font-bold tracking-widest uppercase text-nebula-secondary font-mono backdrop-blur-sm"
              >
                {profile.liaStatus}
              </motion.span>
            )}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-white leading-[0.9] text-balance">
            <span className="text-gradient">{profile.name}</span>
          </h1>
          
          <p className="mx-auto lg:mx-0 max-w-xl text-lg md:text-2xl text-slate-400 leading-relaxed mb-12 font-light text-balance">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
            <Button 
              onClick={() => scrollToSection("projects")}
              size="lg"
              variant="primary"
            >
              Explore Portfolio
            </Button>
            <Button 
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>

        {/* Right Side: Portrait Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 lg:order-2 flex justify-center items-center"
        >
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-nebula-accent/20 blur-[100px] rounded-full scale-110 opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
            
            {/* Image Frame */}
            <div className="relative h-72 w-72 md:h-[450px] md:w-[400px] rounded-[40px] overflow-hidden border border-white/10 glass shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              {profile.imageUrl && (
                <Image
                  src={profile.imageUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              {/* Overlay Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-nebula-accent/10 blur-[160px] -z-10 rounded-full" />
    </section>
  );
}

export const ProfileHero = React.memo(ProfileHeroComponent);
