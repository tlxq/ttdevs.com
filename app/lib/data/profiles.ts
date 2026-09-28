export interface Project {
  title: string;
  tag: string;
  desc: string;
  href?: string;
  stack?: string[];
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Fullstack" | "Tools" | "Database" | "Styling" | "Animation" | "DevOps";
  level: number;
}

export interface Interest {
  id: string;
  label: string;
  desc: string;
}

export interface Profile {
  id: "joint" | "tom" | "therese";
  name: string;
  role: string;
  bio: string;
  aboutTitle: string;
  aboutText: string;
  projects: Project[];
  skills: Skill[];
  interestsTitle?: string;
  interests?: Interest[];
  liaStatus?: string;
  recipientKey: "tom" | "therese";
  imageUrl?: string;
}

// Hand-picked projects shown in the Projects section and the terminal.
// Add a project here to feature it; nothing is pulled from GitHub automatically.
export const FEATURED_PROJECTS: Record<string, Project> = {
  raddaVarfruberga: {
    title: "Rädda Vårfruberga",
    tag: "Live website",
    desc: "Website for the Rädda Vårfruberga initiative.",
    href: "https://raddavarfruberga.se/",
  },
};

export const PROFILES: Record<string, Profile> = {
  joint: {
    id: "joint",
    name: "TTdevs",
    role: "Software Development Duo",
    bio: "We merge cutting-edge technology with refined design to create high-performance digital environments.",
    aboutTitle: "Who We Are",
    aboutText: "A two-person collective dedicated to building sustainable, high-performance digital environments.",
    recipientKey: "tom",
    projects: [FEATURED_PROJECTS.raddaVarfruberga],
    skills: [
      { name: "React / Next.js", category: "Frontend", level: 98 },
      { name: "Node.js / Bun", category: "Backend", level: 92 },
      { name: "PostgreSQL / Redis", category: "Database", level: 88 },
      { name: "Tailwind / Framer", category: "Styling", level: 95 }
    ]
  },
  tom: {
    id: "tom",
    name: "Tom",
    role: "Junior Fullstack Developer",
    bio: "Fullstack developer focused on TypeScript, React, and backend integration. Beyond education, I have practical experience in setting up Linux environments and integrating real-time data into personal projects.",
    aboutTitle: "Technical Precision & Modernity",
    aboutText: "I am seeking an internship (LIA v.35–48) in a team that values technical accuracy and modern development workflows. My focus is on building type-safe and scalable applications.",
    liaStatus: "Seeking Internship: v.35–48",
    imageUrl: "/tom-profile.webp",
    recipientKey: "tom",
    projects: [FEATURED_PROJECTS.raddaVarfruberga],
    skills: [
      { name: "React, Next.js, TypeScript, Tailwind CSS", category: "Frontend", level: 95 },
      { name: "Node.js, Supabase, PostgreSQL, REST APIs", category: "Backend", level: 90 },
      { name: "Docker, Git, Linux, Bash, CI/CD", category: "DevOps", level: 85 }
    ],
    interestsTitle: "Outside of Code",
    interests: [
      {
        id: "football",
        label: "Hammarby Football",
        desc: "Passionate supporter who appreciates the community around the sport.",
      },
      {
        id: "gym",
        label: "Gym & Training",
        desc: "To maintain focus and energy in everyday life.",
      },
      {
        id: "cats",
        label: "Cats",
        desc: "Proud owner of a Bengal and a Devon Rex who often keep me company.",
      },
    ]
  },
  therese: {
    id: "therese",
    name: "Therese",
    role: "Systems Engineer",
    bio: "Architecting secure, scalable, and efficient backend foundations.",
    aboutTitle: "Systems Design",
    aboutText: "Specialist in database modeling, cloud infrastructure, and highly available backends.",
    imageUrl: "/therese-profile.webp",
    recipientKey: "therese",
    projects: [],
    skills: [
      { name: "Node.js", category: "Backend", level: 96 },
      { name: "PostgreSQL", category: "Database", level: 94 },
      { name: "System Design", category: "Tools", level: 90 }
    ]
  }
};
