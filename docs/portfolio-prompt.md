# Portfolio redesign prompt

This file has two parts:

1. **Questions for Tom and Therese.** Answer these first. The answers are the content the redesign needs, and they are phrased so they can go straight onto the site.
2. **Prompt for a coding agent.** Paste it (together with your answers) into a coding agent to redesign the site.

Do part 1 before part 2. A good-looking portfolio with placeholder text still reads as unfinished to an employer; real content matters more than any animation.

---

## Part 1: Questions for Tom and Therese

Each of you answers separately. Short, concrete answers are better than long ones. Write in English, in first person ("I build..."), the way you want it to read on the site. Skip anything you don't want public.

### About you

1. **One-line headline.** How would you describe yourself in one sentence to a hiring manager? (Example: "Junior fullstack developer who likes turning messy requirements into clean, typed code.")
2. **Short bio (2 to 4 sentences).** Where you are now, what you're good at, and what you're looking for.
3. **Your path into development.** Education (school, program, years), bootcamps, previous careers or jobs. A previous non-tech career is a strength, so mention it and what it taught you.
4. **What you're looking for.** Internship (LIA) or job? Which weeks or start date? Frontend, backend, fullstack, DevOps, something else? Location, remote/hybrid, and which cities you'd work in.
5. **What makes you different.** One or two things a colleague would say about you (for example: "debugs calmly", "writes docs nobody else writes", "good with customers").

### Projects (3 to 6 each is ideal)

For each project:

6. **Name and link.** Live URL and/or GitHub repo. Is the repo public?
7. **What it is, in one sentence**, written for someone non-technical.
8. **The problem it solves** or why you built it (school assignment, client, personal need, learning goal).
9. **Your part.** What exactly did *you* do? If it was a team project, how big was the team and which parts were yours?
10. **Tech stack** used.
11. **One thing you're proud of**: a hard problem you solved, a decision you made, or a measurable result (users, speed, grade, feedback from a client).
12. **Status**: live, finished, in progress, or archived.
13. **Visuals.** Can you provide 1 to 3 screenshots (desktop, ideally 1600px wide or more) or a short screen recording? If not, say so and the site will use a styled placeholder.

For **raddavarfruberga.se** specifically: what is Rädda Vårfruberga, who was it built for, and which parts did each of you build?

### Skills

14. **Main stack.** The languages, frameworks and tools you'd be comfortable using at work on day one.
15. **Familiar with.** Things you've used but wouldn't claim to be strong in yet.
16. **Currently learning.** What you're studying right now.
17. **Skill levels.** The current site shows percentages (like "React 95%"). Employers usually find these meaningless or even suspicious for a junior. Choose one:
    - Remove percentages and group skills as "Daily use / Familiar / Learning" (recommended)
    - Keep percentages
18. **Soft skills or other experience** worth listing (languages you speak, leadership, customer service, teaching).

### Links and documents

19. **GitHub** profile URL.
20. **LinkedIn** URL.
21. **Email** you want employers to use (the contact form sends email, but a visible address is also common).
22. **CV.** Do you want a downloadable CV (PDF) on the site? If yes, provide the current PDF. Should `LIA2.pdf` stay (and what is it), be replaced, or be removed?
23. Any other links: blog, Dribbble/Figma, LeetCode, certificates, school program page.

### Photos and personality

24. **Profile photo.** Are the current photos (`tom-profile.webp`, `therese-profile.webp`) the ones you want? A well-lit photo with a plain background works best.
25. **Outside of code.** 2 or 3 interests (Tom's are football, gym and cats today). Keep it short and human.
26. **Personal touches you want to keep.** The site has a terminal easter egg, a loading screen and the "TTdevs" duo branding. Keep, change or drop each?

### As a duo

27. **Why TTdevs?** How do you two work together, and what have you built together?
28. **Would you apply as a pair**, or is the joint page mainly a front door to your two individual profiles?
29. **Visual taste.** Name 2 or 3 portfolio sites or products whose look you like, and anything you dislike (for example: "no neon", "less dark", "more playful").

---

## Part 2: Prompt for a coding agent

Copy everything inside the fence below into a coding agent working in this repository. Paste your answers from Part 1 at the bottom where it says so.

````markdown
You are redesigning the TTdevs portfolio (this repository), a Next.js site for two junior developers, Tom and Therese, who are looking for internships and jobs. The audience is recruiters and hiring developers, who typically spend under a minute on a portfolio. The site works but looks plain and generic. Make it look and feel like a strong, memorable developer portfolio, with emphasis on visual style, motion and UX, while staying fast and accessible.

## Current state (read the code before changing anything)

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (theme tokens in `app/globals.css` under `@theme inline`), framer-motion 12, Lenis smooth scroll, lucide-react/heroicons/react-icons, Resend + Upstash Redis for the contact form (`app/lib/actions/contactAction.ts`).
- Routes: `/` joint TTdevs page, `/tom`, `/therese`. All three render `ProfileView` (`app/components/features/ProfileView.tsx`) with a profile from `app/lib/data/profiles.ts`.
- Sections: `ProfileHero`, `AboutSection`, `ProjectsSection`, `SkillsSection` (with animated percentage bars), `InterestsSection`, `ContactSection` + `ContactModal`. Shared UI in `app/components/ui/`. Background glows in `app/lib/AmbientBackground.tsx`.
- Extras: a terminal easter egg (`app/components/terminal/`, commands in `app/lib/terminal/commands/`), a once-per-session `LoadingScreen`, a `DeveloperSelect` component.
- Content lives in `app/lib/data/profiles.ts`. Projects are hand-picked in `FEATURED_PROJECTS` (nothing is fetched from GitHub). The site is English only.
- Current look: dark "Midnight Nebula" palette (violet/pink/cyan gradients on near-black), glassmorphism cards, blurred glow blobs, Geist + JetBrains Mono. It reads as a template rather than as two specific people.

## Goals, in priority order

1. **Content first.** Within 10 seconds a visitor should know who each person is, what they're looking for, what they can build, and how to contact them or get their CV. Use the answers at the bottom of this prompt as the source of truth. Do not invent facts, projects, employers, numbers or links. Where an answer is missing, leave a clearly marked `TODO` in `profiles.ts` and render nothing (not lorem ipsum) for that item.
2. **Projects are the centerpiece.** Redesign `ProjectsSection` into case-study cards: screenshot or styled placeholder, one-line pitch, the person's role, stack tags, a "what I'm proud of" line, status badge, and links (Live / Code). Consider a detail view (a modal or a `/projects/[slug]` route) for projects that have enough content; pick one and explain the choice.
3. **A distinctive visual identity.** Move away from the generic neon-glow look toward something with a clear point of view. Propose one direction in a short note before implementing (palette, type pairing, layout grid, motion style), then apply it consistently through the Tailwind theme tokens rather than hard-coded values. Give Tom and Therese each an accent color so their pages feel related but distinct. Good typography and spacing matter more than effects.
4. **Motion that supports the content.** Use framer-motion (already installed; don't add another animation library):
   - A hero entrance with staggered text reveal.
   - Scroll-triggered reveals for sections and cards (`whileInView`, `viewport={{ once: true }}`), kept subtle (short distance, 300 to 600 ms).
   - Hover and focus micro-interactions on cards, buttons and links (for example, a slight lift, image zoom, or a pointer-follow highlight on project cards).
   - Smooth page transitions between `/`, `/tom` and `/therese` if they can be done cleanly with the App Router.
   - One signature moment is enough (for example, an interactive hero or an animated duo intro on `/`). Don't animate everything.
   - Animate only `transform` and `opacity`. No layout-shifting animations, no infinite animations running on large blurred elements.
5. **UX.**
   - Clear primary actions in the hero: "View projects", "Download CV" (if a CV is provided), "Contact".
   - Sticky header with active-section indication (`useActiveSection` exists), working mobile menu, visible focus states.
   - Replace the skill percentage bars with the grouping the answers ask for (default: "Daily use / Familiar / Learning" tags).
   - Add GitHub, LinkedIn and email links in the hero or header and in the footer.
   - The joint page `/` should introduce the duo and make it one click to reach each person's profile; make sure it doesn't duplicate the individual pages.
   - Keep the terminal easter egg working unless the answers say to drop it. Reconsider whether the loading screen helps; an employer should never wait to see content.
   - Keep the contact form and its server action as they are functionally; restyle only.

## Constraints

- **Build on the current stack.** No framework change, no new UI kit or CSS-in-JS, no new animation library. Add a dependency only when it removes real work, and say why.
- **Accessibility (WCAG 2.1 AA).** Text contrast at least 4.5:1, a keyboard-reachable skip link, logical heading order (one `h1` per page), alt text on every image, visible focus rings, modals that trap and restore focus and close on Escape.
- **Reduced motion.** When `prefers-reduced-motion: reduce` is set, disable parallax, auto-playing and infinite animations, and page transitions; keep only opacity fades or nothing. Use framer-motion's `useReducedMotion` or `MotionConfig reducedMotion="user"` consistently. Lenis should not hijack scrolling for these users.
- **Performance.** Lighthouse (mobile) 90+ for Performance, Accessibility, Best Practices and SEO. Use `next/image` with correct `sizes` for all images, no layout shift from fonts or images, keep client components to what actually needs interactivity (sections without state or motion can be server components), avoid heavy blur filters on large fixed layers.
- **Responsive.** Design mobile-first; check 375px, 768px, 1280px and 1920px widths.
- **Keep what works.** SEO metadata, Open Graph image, `robots.ts`, `sitemap.ts` and the `/portfolio` redirect stay intact. `npm run lint` and `npm run build` must pass with zero problems.
- **Content stays in data.** All text, projects, skills and links go in `app/lib/data/profiles.ts` (extend the types as needed, for example `Project.role`, `Project.image`, `Project.status`, `Project.highlight`, `Profile.links`, `Profile.cvUrl`). Components should not hard-code personal content.

## How to work

1. Read the code and write a short plan: the visual direction, the new section order for each page, changes to `profiles.ts` types, and which components change. Stop and share the plan before implementing.
2. Implement in small commits: design tokens and typography, then layout and hero, then projects, then skills/about/contact, then motion, then accessibility and performance pass.
3. Run the app and check every page at the widths above, with and without reduced motion, and with keyboard only.
4. Finish with a short summary: what changed, screenshots of each page (desktop and mobile), Lighthouse scores, and a list of remaining `TODO`s that need content from Tom or Therese.

## Answers from Tom and Therese

<!-- Paste the answers to the questions in docs/portfolio-prompt.md Part 1 here. -->
````
