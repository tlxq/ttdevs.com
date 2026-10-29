# ttdevs.com

Portfolio site for Tom and Therese (Next.js App Router, TypeScript, Tailwind v4), with a contact form (Resend, rate-limited with Upstash Redis). Live at https://www.ttdevs.com on Vercel (project `ttdevs-website`, Node 24.x).

## Rules

- One branch and one PR per change; `ci` must be green before merge (squash).
- `mise run check` is the whole check (pre-push and CI run it): typecheck, ESLint, `next build`. `mise run format` runs Prettier on the given files.
- Visible text follows `workflow:signum`.

## Pointers

- Run it: `npm run dev` (http://localhost:3000). Env vars for the contact form: `.env.example`.
- Deploy: Vercel builds and deploys `master` on merge; PRs get preview deploys.
