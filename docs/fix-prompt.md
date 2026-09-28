# Fix prompt for ttdevs.com

Paste everything below the line into a coding agent (e.g. Claude Code) opened in this repo.
It is ordered by priority. Each item says what is wrong, where, and how we'll know it's fixed.

This version assumes the "English only, no pulse, featured projects" change (PR #9) is merged. Run it on top of that, not on the old code.

---

You are working on ttdevs.com, a Next.js 16 (App Router) + Tailwind v4 + Framer Motion portfolio for two developers (Tom and Therese). The site is English only: there is no next-intl, no `/en` or `/sv` routes (old links redirect in `next.config.ts`), no Supabase/pulse feature, and projects come from the hand-picked `FEATURED_PROJECTS` list in `app/lib/data/profiles.ts`, not from GitHub. `profiles.ts` is the single source of truth for profile text. Don't reintroduce any of those removed pieces.

Fix the issues below **in order**. Keep the existing design, file structure and visual style: this is a fix pass, not a redesign. Prefer the smallest correct change. Do not add new dependencies unless an item explicitly allows it.

After each numbered item:
- run `npx tsc --noEmit`, `npx eslint .` and `npx next build` and make sure nothing new breaks
- make one commit per item with a clear message

If something in this prompt turns out to be wrong when you look at the code, say so and skip it instead of forcing a change.

## P1: Broken or high-impact

### 1. The home page renders no content on the server
`app/components/features/HomePageClient.tsx` starts with `isLoading = true` and renders `{!isLoading && <ProfileView .../>}`. So the server HTML for `/` contains no `<h1>` and no sections; content only appears after JS runs and after a fake ~2 s progress bar (`LoadingScreen.tsx`) finishes on the first visit. That hurts SEO, link previews, no-JS users and LCP.

Fix: always render `<ProfileView profile={PROFILES.joint} />`. If we keep the loader, render it as a fixed overlay *on top of* already-rendered content (and skip it when `prefers-reduced-motion: reduce`). Shorten it to at most ~1 s. Also remove the `react-hooks/set-state-in-effect` lint error in this file.

Done when: `curl -s localhost:3000/ | grep '<h1'` returns the TTDEVS heading and `id="projects"` is present in the server HTML.

### 2. Header section links never show
`Header` only renders the About/Projects/Skills/Contact links when it gets a `scrollToSection` prop, but `BaseLayout` never passes it. On the home page the desktop nav is empty; on profile pages only "Back" shows.

Fix: have `ProfileView` pass `scrollToSection` through `BaseLayout` to `Header`. On profile pages show both the section links and the back link. Make sure every link target id (`about`, `projects`, `skills`, `contact`) exists on every page. Also add a way to reach these sections on mobile (currently the links are `hidden md:flex` with no mobile menu). A simple toggle menu is enough.

### 3. Harden the contact server action
File: `app/lib/actions/contactAction.ts`.
- Validate `recipientKey` is exactly `"tom"` or `"therese"` (right now anything that isn't `"tom"` goes to Therese). Don't use `as` casts on `FormData` values; check `typeof value === "string"`.
- Trim inputs and enforce max lengths (name 100, email 254, message 5000). Reject empty-after-trim.
- Strip CR/LF from `name` before putting it in the email subject.
- Create the `Resend` client inside the function (or lazily) and return the existing "server misconfigured" error if `RESEND_API_KEY` is missing, instead of constructing it with `undefined` at module load. Same for `Redis.fromEnv()`: don't let missing Upstash vars crash the module at import time.
- Keep the Upstash rate limit. Leave a short comment that it intentionally fails open if Redis is down.
- Add matching `maxLength` attributes to the inputs in `ContactModal.tsx` so users see the limit before submitting.

Done when: `npx next build && npx next start` with no env vars at all serves `/`, `/tom` and `/therese` with status 200, and submitting the form returns a readable error instead of a 500.

## P2: Correctness and accessibility

### 4. Accessibility fixes
- `ui/Modal.tsx`: add `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the modal heading. Move focus into the modal on open and return it to the trigger on close. Keep Tab inside the modal. The `AnimatePresence` inside `Modal` does nothing (it's never unmounted from inside), so either move it to the parent that conditionally renders the modal or remove it.
- Nested interactive elements: `<Link><Button>…</Button></Link>` renders `<a><button>`, which is invalid HTML and confuses screen readers and keyboard users (`ProfileHero.tsx`, the Back link in `Header.tsx`). Add a small `ButtonLink` component that applies the same variant/size classes as `Button` directly to `Link`, and use that instead.
- `ProfileHero.tsx`: escape the `'` in "VIEW TOM'S SPACE" and "VIEW THERESE'S SPACE" (use `&apos;` or `{"'"}`); they currently fail lint.
- Respect `prefers-reduced-motion` for the infinite Framer Motion animations (`AmbientBackground.tsx`, the pulsing badges in `ProfileHero.tsx`). Framer's `useReducedMotion()` is enough; `Terminal.tsx` already uses it as an example.

### 5. Small correctness fixes
- `/portfolio` renders exactly the same content as `/`. Either redirect it to `/` (in `next.config.ts` next to the existing redirects) or delete it. Ask me which if unsure.
- Page metadata: `/tom` and `/therese` set a title but no description. Give each page its own description.

## P3: Tooling and SEO hygiene

### 6. Tooling
- There are two ESLint configs. `eslint.config.mjs` (flat config) is the one ESLint 9 uses, and `.eslintrc.cjs` is dead. Delete `.eslintrc.cjs` and drop the `--ext` flag from the `lint`/`lint:fix` scripts.
- Fix the remaining lint errors and warnings: `no-explicit-any` in `InterestsSection.tsx` and `SkillsSection.tsx`, the unused `AnimatePresence` import in `LoadingScreen.tsx`. Also remove the `any` casts in `ui/Button.tsx` and `lib/hooks/useScrollSnap.ts` if it can be done cleanly (Lenis ships its own types).
- Goal: `npx eslint .` reports 0 errors and 0 warnings.

### 7. SEO and headers
- In the root layout's metadata (`app/layout.tsx`): set `metadataBase: new URL("https://ttdevs.com")` and basic `openGraph` (title, description, one image such as a 1200x630 image, or the profile photo if nothing better exists).
- Add basic security headers in `next.config.ts` via `headers()`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`), `Permissions-Policy` disabling camera/microphone/geolocation. Do not add a full Content-Security-Policy in this pass.
- Add `app/robots.ts` and `app/sitemap.ts` listing `/`, `/tom` and `/therese`.
- Check `npx next build` output: `/`, `/tom` and `/therese` should be static (○). If any is dynamic, say why.

## Do NOT change without asking me
These are content decisions, not bugs. List them at the end of your summary with your recommendation:
- Skill "level" percentages (React 98%, Node 96% etc.). For a junior developer applying for an LIA internship these can read as not credible to recruiters. Suggest an alternative (e.g. grouped skill lists or "used in production / in projects / learning").
- `public/documents/LIA2.pdf` is not linked anywhere on the site. If it's the CV, it should probably be linked from Tom's page.
- `README.md` describes things that don't exist (Route Handlers, `app/lib/components`, "enterprise-grade", and now also i18n and the pulse monitor). Propose an accurate, shorter README.
- Therese's profile has no projects and no interests yet, and her skills/bio are placeholder-sounding.
- `FEATURED_PROJECTS` has one project with a one-line description. Suggest what a recruiter would want to see per project (what it is, your role, stack, link) without inventing content.

## Final report
When done, give me:
1. A list of commits with one line each on what changed and why
2. Anything you skipped and why
3. The recommendations from "Do NOT change without asking me"
4. Output of `npx eslint .` and `npx next build` (last ~15 lines)
