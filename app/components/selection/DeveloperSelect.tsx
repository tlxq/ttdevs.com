"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

import Image from "next/image";

const EASE = "circOut";

export default function DeveloperSelect() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-zinc-950 px-6">
      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16"
        >
          <p className="mb-4 font-mono text-xs tracking-[0.3em] text-zinc-600 uppercase">
            Select Profile
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Who We Are
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ProfileCard 
            name="Tom" 
            role="Interface Engineer" 
            href="/tom" 
            delay={0.1} 
            image="/tom-profile.webp"
            accent="cyan"
          />
          <ProfileCard 
            name="Therese" 
            role="Systems Engineer" 
            href="/therese" 
            delay={0.2} 
            image="/therese-profile.webp"
            accent="violet"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Button variant="ghost" onClick={() => router.push("/")}>
            View Joint Portfolio →
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileCard({
  name,
  role,
  href,
  delay,
  image,
  accent,
}: {
  name: string;
  role: string;
  href: string;
  delay: number;
  image: string;
  accent: "cyan" | "violet";
}) {
  const router = useRouter();
  const accentColor = accent === "cyan" ? "group-hover:border-[#06b6d4]/50" : "group-hover:border-[#8b5cf6]/50";
  const glowColor = accent === "cyan" ? "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]" : "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: EASE }}
      onClick={() => router.push(href)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-10 transition-all duration-500 ${accentColor} ${glowColor}`}
    >
      <div className="relative z-10 text-center">
        <div className="relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 group-hover:scale-105 group-hover:border-white/30">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover opacity-80 grayscale-[0.5] transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-white">{name}</h2>
        <p className="font-mono text-sm tracking-widest text-zinc-500 uppercase transition-colors group-hover:text-zinc-300">{role}</p>
      </div>
      
      {/* Decorative background glow */}
      <div className={`absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-[80px] transition-opacity duration-700 opacity-0 group-hover:opacity-30 ${accent === "cyan" ? "bg-[#06b6d4]" : "bg-[#8b5cf6]"}`} />
    </motion.div>
  );
}
