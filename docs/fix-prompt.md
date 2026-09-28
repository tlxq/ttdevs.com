# Fix prompt for ttdevs.com

Paste everything below the line into a coding agent (e.g. Claude Code) opened in this repo.
It is ordered by priority. Each item says what is wrong, where, and how we'll know it's fixed.

---

You are working on ttdevs.com, a Next.js 16 (App Router) + next-intl + Tailwind v4 + Framer Motion portfolio for two developers (Tom and Therese). Fix the issues below **in order**. Keep the existing design, file structure and visual style: this is a fix pass, not a redesign. Prefer the smallest correct change. Do not add new dependencies unless an item explicitly allows it.

After each numbered item:
- run `npx tsc --noEmit`, `npx eslint .` and `npx next build` and make sure nothing new breaks
- make one commit per item with a clear message

If something in this prompt turns out to be wrong when you look at the code, say so and skip it instead of forcing a change.

## P1: Broken or high-impact

### 1. The home page renders no content on the server
`app/components/features/HomePageClient.tsx` starts with `isLoading = true` and renders `{!isLoading && <ProfileView .../>}`. So the server HTML for `/en` and `/sv` contains no `<h1>` and no sections; content only appears after JS runs and after a fake ~2 s progress bar (`LoadingScreen.tsx`) finishes on the first visit. That hurts SEO, link previews, no-JS users and LCP.

Fix: always render `<ProfileView profile={PROFILES.joint} repos={repos} />`. If we keep the loader, render it as a fixed overlay *on top of* already-rendered content (and skip it when `prefers-reduced-motion: reduce`). Shorten it to at most ~1 s. Also remove the setState-in-effect lint error in this file.

Done when: `curl -s localhost:3000/en | grep '<h1'` returns the TTDEVS heading and `id="projects"` is present in the server HTML.

### 2. Missing Supabase env vars crash every page
`app/lib/pulse/supabase.ts` calls `createClient(url, key)` at module load with empty strings when env vars are missing, which throws `supabaseUrl is required` and 500s every route. `.env.example` describes Pulse as optional.

Fix: only create the client when both `NEXT_PUBLIC_SUPABASE_URL` and a publishable/anon key exist (export `supabase: SupabaseClient | null`). In `PulseContext.tsx`, when the client is null, skip fetching and subscribing and set `isLoading` false with empty nodes. The header status and `pulse` terminal command must handle "no data" gracefully.

Done when: `npx next build && npx next start` with no Supabase env vars serves `/en`, `/en/tom`, `/en/therese` with status 200.

### 3. PulseProvider is mounted twice
`PulseProvider` wraps the app in `app/[locale]/layout.tsx` and again in `app/components/layouts/BaseLayout.tsx`. Every page opens two Supabase realtime channels and runs two sets of fetches/timers. Remove the one in `BaseLayout.tsx`.

### 4. Header section links never show
`Header` only renders the About/Projects/Skills/Contact links when it gets a `scrollToSection` prop, but `BaseLayout` never passes it. On the home page the desktop nav is empty; on profile pages only "Back" shows.

Fix: have `ProfileView` pass `scrollToSection` through `BaseLayout` to `Header`. On profile pages show both the section links and the back link. Make sure every link target id (`about`, `projects`, `skills`, `contact`) exists on every page. Also add a way to reach these sections on mobile (currently the links are `hidden md:flex` with no mobile menu). A simple toggle menu is enough.

### 5. Harden the contact server action
File: `app/lib/actions/contactAction.ts`.
- Validate `recipientKey` is exactly `"tom"` or `"therese"` (right now anything that isn't `"tom"` goes to Therese). Don't use `as` casts on `FormData` values; check `typeof value === "string"`.
- Trim inputs and enforce max lengths (name 100, email 254, message 5000). Reject empty-after-trim.
- Strip CR/LF from `name` before putting it in the email subject.
- Create the `Resend` client inside the function (or lazily) and return the existing "server misconfigured" error if `RESEND_API_KEY` is missing, instead of constructing it with `undefined` at module load.
- Keep the Upstash rate limit. Leave a short comment that it intentionally fails open if Redis is down.
- Add matching `maxLength` attributes to the inputs in `ContactModal.tsx` so users see the limit before submitting.

### 6. `.env.example` is incomplete and has a dangerous key
- Add every var the code reads: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_TOM_EMAIL`, `CONTACT_TO_THERESE_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- Remove `SUPABASE_URL` / `SUPABASE_KEY` ("service-role key"). Nothing in the code uses them, and a service-role key bypasses Row Level Security. It must never end up in a `NEXT_PUBLIC_` var or client code.
- Separately, tell me (don't change remotely) to verify that the `node_status` table has RLS enabled with a SELECT-only policy for `anon`, because the publishable key is shipped to every browser.

## P2: Correctness, i18n, accessibility

### 7. Finish the translations
`/sv` still shows English in many places. Move these hardcoded strings into `messages/en.json` and `messages/sv.json` and use `useTranslations`/`getTranslations`:
- `ProfileHero.tsx`: "Explore Tom", "Explore Therese", "Get in Touch", "Explore Portfolio", "VIEW TOM'S SPACE", "VIEW THERESE'S SPACE" (the last two also fail lint for unescaped `'`)
- `ContactModal.tsx`: all labels, placeholders, headings, button text, success message
- `contactAction.ts`: user-facing error strings. Return an error *code* (e.g. `"rate_limited"`, `"invalid_email"`) and translate it in the modal.
- `LoadingScreen.tsx` status lines (if the loader is kept)
- Page `metadata` in `app/[locale]/**/page.tsx` and `layout.tsx`: switch to `generateMetadata` with translated title/description.

Also: `app/lib/data/profiles.ts` duplicates `role`, `bio`, `aboutTitle`, `aboutText` that the UI actually reads from the message files (and Tom's `role`/`bio` there are in Swedish while the rest is English). Remove the unused text fields from `PROFILES` so the message files are the single source of truth. Check with grep that nothing still reads them first.

### 8. Accessibility fixes
- `ui/Modal.tsx`: add `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the modal heading. Move focus into the modal on open and return it to the trigger on close. Keep Tab inside the modal. The `AnimatePresence` inside `Modal` does nothing (it's never unmounted from inside), so either move it to the parent that conditionally renders the modal or remove it.
- Nested interactive elements: `<Link><Button>…</Button></Link>` renders `<a><button>`, which is invalid HTML and confuses screen readers and keyboard users (`ProfileHero.tsx`, `Header.tsx`). Add a small `ButtonLink` component that applies the same variant/size classes as `Button` directly to `Link`, and use that instead.
- Language switcher in `Header.tsx`: add an `aria-label` like "Switch language to Svenska/English".
- `ProjectsSection.tsx`: the "Learn More" `<button>` for static projects has no handler. Render it as a link only when `project.href` exists, otherwise don't render it.
- Respect `prefers-reduced-motion` for the infinite Framer Motion animations (`AmbientBackground.tsx`, the pulsing badges in `ProfileHero.tsx`). Framer's `useReducedMotion()` is enough.

### 9. Small data/UI correctness
- `ProjectsSection.tsx`: `repo.language || "TypeScript"` claims TypeScript for repos with no detected language. Show nothing instead.
- `fetchGitHubRepos`: filter out forks and archived repos (`fork`, `archived` fields) so the portfolio only shows your own work. The home and `/portfolio` pages merge 10+10 repos; cap the merged list (e.g. 9) so the grid stays tidy.
- `/[locale]/portfolio` renders exactly the same content as `/[locale]`. Either redirect it to `/` or delete it. Ask me which if unsure.

## P3: Tooling and SEO hygiene

### 10. Tooling
- `package-lock.json` is out of sync with `package.json` (`npm ci` fails with "Missing: @swc/helpers from lock file"). Regenerate it with `npm install` and commit it.
- There are two ESLint configs. `eslint.config.mjs` (flat config) is the one ESLint 9 uses, and `.eslintrc.cjs` is dead. Delete `.eslintrc.cjs` and drop the `--ext` flag from the `lint`/`lint:fix` scripts.
- Fix the remaining lint errors (`no-explicit-any` in `InterestsSection.tsx`, `SkillsSection.tsx`, `Header.tsx`, `src/i18n/request.ts`; unused imports in `LoadingScreen.tsx`, `AmbientBackground.tsx`). For `request.ts`, use next-intl's `hasLocale(routing.locales, locale)`. The same `as any` pattern is in `app/[locale]/layout.tsx`.
- Goal: `npx eslint .` reports 0 errors.

### 11. SEO and headers
- In the root layout's metadata: set `metadataBase: new URL("https://ttdevs.com")`, `alternates.languages` for `en`/`sv` (hreflang), and basic `openGraph` (title, description, one image such as a 1200x630 image, or the profile photo if nothing better exists).
- Add `generateStaticParams` returning both locales in `app/[locale]/layout.tsx` and call `setRequestLocale(locale)` in layout and pages so pages can be statically rendered (currently every route is dynamic). The GitHub fetch already uses `revalidate: 3600`, so ISR will work.
- Add basic security headers in `next.config.ts` via `headers()`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`), `Permissions-Policy` disabling camera/microphone/geolocation. Do not add a full Content-Security-Policy in this pass.
- Add `app/robots.ts` and `app/sitemap.ts` listing `/en`, `/sv`, `/en/tom`, `/sv/tom`, `/en/therese`, `/sv/therese`.

## Do NOT change without asking me
These are content decisions, not bugs. List them at the end of your summary with your recommendation:
- Skill "level" percentages (React 98%, Node 96% etc.). For a junior developer applying for an LIA internship these can read as not credible to recruiters. Suggest an alternative (e.g. grouped skill lists or "used in production / in projects / learning").
- `public/documents/LIA2.pdf` is not linked anywhere on the site. If it's the CV, it should probably be linked from Tom's page.
- `README.md` describes things that don't exist (Route Handlers, `app/lib/components`, "enterprise-grade"). Propose an accurate, shorter README.
- Therese's profile has no interests and no Swedish-specific content yet.

## Final report
When done, give me:
1. A list of commits with one line each on what changed and why
2. Anything you skipped and why
3. The recommendations from "Do NOT change without asking me"
4. Output of `npx eslint .` and `npx next build` (last ~15 lines)
