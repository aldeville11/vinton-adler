# Vinton Adler & Co. site: handoff brief for external review

Scope: this brief covers only the repo `aldeville11/vinton-adler` at `main` (commit `9b45c7e`). It is a static React marketing site. The repo contains **no** prospecting, scoring, mockup, hero-image, email or follow-up pipeline, and no prompts. Those components, if they exist, are in another repo or tool and are out of scope. Anything below is read directly from the code unless marked "inferred". I did not run `npm install`, `tsc` or `vite build`.

---

## 1. What the system does

A single-page-app lead-gen funnel for "Vinton Adler & Co.", selling a **Revenue Leak Diagnostic** (free, 20 minutes) that upsells to paid installs:

| Offer | Price | Source |
|---|---|---|
| Diagnostic | Complimentary | `src/sections/Services.tsx` |
| Foundation | $5,500 one-time | same |
| Accelerator | $9,500 one-time (featured) | same |
| Operator | $3,000/mo, requires Foundation or Accelerator | same |

Target buyer: home services, real estate and similar businesses with inbound leads.

End-to-end flow (as designed in code):
1. A visitor lands on `/` (`HomePage.tsx`).
2. Any CTA calls `openPreQual()` in `App.tsx`. That fires `gtag('event','cta_click')` and `fbq('track','Lead')`, then opens `PreQualForm`.
3. The visitor answers 8 multiple-choice questions.
4. `getQualificationMessage()` returns one of three outcomes: `close`, `deprioritized` or `book`.
5. On `book`, `onQualified()` closes the form and opens `ContactModal`, a Calendly iframe (`calendly.com/contact-vintonadler/revenueleakdiagnostic`).
6. A human runs the call. Everything after that is offline.

There is no backend. Form answers are never sent anywhere (see failure #2).

## 2. Stack and architecture

- React 19, Vite 7, TypeScript 5.9, Tailwind 3.4 with shadcn tokens, `react-router` 7 (`BrowserRouter` in `main.tsx`).
- GSAP and ScrollTrigger for animation. Lenis for smooth scroll (`App.tsx`).
- About 55 shadcn/ui components in `src/components/ui/`. Essentially none are used. The site hand-rolls buttons, modals and accordions.
- `vite.config.ts` includes `kimi-plugin-inspect-react` (`inspectAttr()`), a dev/inspect plugin from the generating tool. `base: './'`.
- No `.gitignore`, no tests, no CI, no env config, no API calls (`grep fetch` returns nothing).
- Routes: `/`, `/services`, `/privacy`, `/terms`.

## 3. Data model

There is no persistent data model. The only structured objects are:

```ts
// PreQualForm.tsx: 8 string fields, all required, held in React state only
interface FormData { businessType; monthlyRevenue; weeklyLeads; missedCalls;
                     responseSpeed; leadTracking; primaryGoal; investmentReady }
// result: { title, body, action: 'close' | 'deprioritized' | 'book' }
```

Other data lives as hard-coded arrays in components:
- `installOffers` and `retainerOffer` in `Services.tsx`
- `creditRows` in `ServicesPage.tsx`
- `faqs` in `FAQ.tsx`

Browser storage: `sessionStorage['va_exit_shown']` (exit-intent once per session).

## 4. Qualification logic (the only "scoring" in the repo)

It is not a weighted score. It is three if-statements (`PreQualForm.tsx`, `getQualificationMessage`):

```ts
if (data.monthlyRevenue === 'Under $20,000')  -> close  ("Not a fit at this stage ... We typically work with businesses doing $50K+ per month")
if (data.investmentReady === 'I am exploring options but not ready to commit') -> deprioritized
else -> book ("You qualify")
```

Only 2 of the 8 answers affect the outcome. The other six (business type, leads per week, missed-call handling, response speed, tracking, goal) are collected and discarded. A commented-out `isQualified()` above it duplicates the same two rules.

## 5. Design system

Tokens (`src/index.css`, `tailwind.config.js`):
- Background `0 0% 4%` (about `#0A0A0A`). Card `0 0% 7%`. Border `0 0% 15%`.
- Primary and accent gold `42 45% 57%` (about `#C9A962`). Hover gold hard-coded as `#D4B978`.
- Foreground warm off-white `#F5F0E8`. Body copy `#A8A29E`. Muted `#6B6560`.
- Fonts: Inter 400–700 for everything. `Playfair Display` (italic 700 only) is defined as `.font-display` but is **used only by the unrouted `FinalCTA` and `TestimonialPreview`**, so it is effectively absent from the live site. JetBrains Mono is loaded and unused.
- Radius `0.5rem`. Shadows `card`, `card-hover`, `glow-accent`.

Visual rules observed in practice:
- Every section is a dark band separated by a 1px `#1C1C1C` or `#262626` border.
- Each section is an eyebrow label (`SectionLabel`, uppercase gold), then a centered `clamp()` H2, then centered grey body, then dark rounded cards.
- Primary CTA is a gold-filled button with a gold glow on hover.
- Every section reveals through the same `ScrollReveal` (opacity 0 to 1, y 40 to 0, 0.8s, `power3.out`, trigger `top 85%`).
- Hex values are hard-coded in about 100 places instead of using the CSS variables, so the token system is bypassed.

Fallback and defaults:
- `ContactModal` shows a placeholder card if `CALENDLY_URL` contains `YOUR_USERNAME`. The URL is already real, so that branch is dead code.
- Analytics IDs are unreplaced placeholders: `G-XXXXXXXXXX` (GA4) and `xxxxxxxxx` (Meta Pixel) in `index.html`. No conversion data is being collected.

## 6. Why the site looks generic (design diagnosis)

1. **One layout pattern repeated.** Centered eyebrow, H2, paragraph and a card stack, 7+ times. There is no variation in grid, scale, asymmetry or density, so there is no focal point after the hero.
2. **No visual evidence.** The site sells diagnosing leaks but shows no diagnostic output, dashboard, sample report, response-time chart or before/after. The only image is an abstract dark texture with a gold spark, at `opacity-30` behind the hero (`public/hero-bg.jpg`), which is nearly invisible. `results-bg.jpg` is never referenced.
3. **"Luxury dark + gold" template.** Black, gold and white with Inter is the default AI-generated "premium" look. It signals nothing specific to the business or the buyer (HVAC, real estate, dental). The target buyers are tradespeople and brokers, and the tone reads like a private bank.
4. **Typography is flat.** One family, and the display serif that would add character is not on any live page. The hero H1 is a 25-word sentence at up to 72px, which makes a wall of text instead of a hook.
5. **Low-contrast copy.** `#6B6560` on `#0A0A0A` is about 3.3:1, below WCAG AA 4.5:1 for small text. It is used for many `text-xs` and `text-sm` lines.
6. **No proof.** No logos, case studies, numbers or named clients. `TestimonialPreview` has a fabricated "Michael R., HVAC Contractor" quote labelled "Based on internal client patterns". It is not rendered, and it should not be published as written.
7. **Copy is abstract.** "infrastructure", "continuation", "income-capture" and "revenue system" are used repeatedly. Concrete outcomes (missed call, text back in 30s, booked job) are rare.
8. **Cards are all the same weight.** `Services.tsx` stacks 4 full-width cards of near-identical structure. Accelerator is distinguished only by a 2px gold border. There is no side-by-side comparison, which makes pricing hard to scan.

## 7. Top failure points (ordered by severity)

1. **The homepage likely does not build or render.** `HomePage.tsx` imports `../sections/TheLeak` and `../sections/UrgencyStatement`. Neither file exists in `src/sections/` (confirmed by `ls`). `tsc -b && vite build` should fail, and `/` would fail in dev. `FramingBanner`, `FinalCTA`, `LeadMagnet`, `NotAFit` and `TestimonialPreview` exist but are not imported by any page, which suggests the zip was uploaded partially or from a mid-edit state. **Verify by running the build.**
2. **No lead capture at all.** `PreQualForm` answers stay in React state. Nobody receives the 8 answers, so disqualified and deprioritized leads are lost. `LeadMagnet` (not mounted) calls `setSubmitted(true)` and shows "Checklist sent" without sending anything, which would be a false claim if it were enabled.
3. **Qualified flow bug.** `handleSubmit` calls `onQualified()` immediately on `book`. `App.handleQualified` sets `preQualOpen=false`, so the "You qualify" screen and the "Book My Diagnostic" button are unreachable and the Calendly modal opens directly. Also, `PreQualForm` returns `null` when closed but keeps `submitted` state, so reopening it shows the old result screen instead of a fresh form.
4. **`/services` cannot reach Calendly.** `ServicesPage` mounts its own `ContactModal` with local `modalOpen` that is never set to `true`. `onQualified` updates `App`'s state, and the modal in `App` is rendered only by `HomePage`. A qualified visitor on `/services` sees nothing.
5. **Analytics not live.** Placeholder GA4 and Pixel IDs (see section 5). Every `gtag` and `fbq` call is currently going to nowhere or to a dead ID.
6. **Contradictory qualification claims.** The form says "$50K+ per month" and gates only on "<$20K" (so $20–50K is told "You qualify"). `Clients.tsx` says "$500K to $10M in annual revenue" (about $42K–$830K per month). `Services` says "limited to 2 to 3 clients per market" with no market defined.
7. **Scroll-animation fragility.** `ScrollReveal` sets `opacity:0` in an effect and relies on ScrollTrigger firing. If JS or ScrollTrigger fails, or on route change, content stays invisible. `ServicesPage` cleanup runs `ScrollTrigger.getAll().forEach(kill)`, which kills triggers owned by other components. Hero uses `toggleActions: 'play none none reset'` while the others use `once: true`, which is inconsistent. `prefers-reduced-motion` is not respected anywhere.
8. **Accessibility.** FAQ buttons have no `aria-expanded`. Modals have no focus trap, no `role="dialog"` and no Escape handling. `ContactModal` sets `body.overflow` but does not restore it if unmounted while open. Low-contrast text (above).
9. **Hygiene.** No `.gitignore`. Leftover `pages/Home.tsx` (Vite demo) and 50+ unused shadcn components. Package name `my-app`. The Calendly iframe has no loading state.
10. **Compliance risk.** Claims like "Most businesses lose 10 to 30 percent of inbound revenue" and "The system paid for itself in the first month" have no sourcing on-page. Privacy and Terms pages are 25-line stubs (`LegalPage.tsx`).

## 8. Recommended fixes (priority order)

1. **Make it build.** Run `npm ci && npm run build`. Either restore `TheLeak.tsx` and `UrgencyStatement.tsx` or remove the imports and render the existing orphan sections (`FramingBanner`, `NotAFit`, etc.). Add a CI build check.
2. **Capture leads server-side.** POST the form answers to a form service (Formspree, a Cloudflare Worker or a serverless function) that writes to a CRM or sheet and emails the owner. Capture all outcomes, including `close` and `deprioritized`. Add an email or phone field *before* the result screen. Fire `Lead` only after a successful submit.
3. **Fix the state flow.** Show the result screen before opening Calendly (remove the auto-call to `onQualified` in `handleSubmit`). Reset form state on close. Lift `ContactModal` into `App` so `/services` works.
4. **Set real GA4 and Pixel IDs** or remove the snippets. Verify events in the respective debug tools.
5. **Make the qualification rule consistent.** Pick one revenue threshold and use it in the form logic, the result copy and `Clients.tsx`. Use more of the 8 answers (for example response speed and missed-call handling) to tailor the result or route the lead.
6. **Redesign for evidence and variation (the design-quality fix).**
   - Replace the abstract hero with a concrete visual: a mock "leak report" or a missed-call-to-booked-job timeline.
   - Shorten the H1 to under 12 words.
   - Break the section pattern with a split layout, a pricing comparison table (three columns), a numbered process with real artefacts, and a stat band with sourced numbers.
   - Use the serif for H1/H2 or drop it. Use `JetBrains Mono` for figures or remove it.
   - Add real proof (even one anonymised case study with real numbers) or remove the proof placeholders.
7. **Use the design tokens.** Replace hard-coded hex with `text-muted-foreground`, `bg-card`, etc. Raise muted text to at least 4.5:1 contrast.
8. **Accessibility pass.** Use the already-installed Radix `Dialog` and `Accordion` (`src/components/ui/`) instead of the hand-rolled modals and FAQ. That fixes focus trap, Escape and aria in one move. Add `prefers-reduced-motion` handling and make `ScrollReveal` fail visible (set initial hidden state via CSS only when JS is confirmed).
9. **Cleanup.** Add `.gitignore`, delete `Home.tsx`, prune unused UI components and the inspect plugin from production, rename the package, flesh out Privacy and Terms.

## 9. Representative examples (root cause)

These are real behaviours of the current code, not generated outputs.

**Example 1: The homepage import failure.**
- Symptom: build or dev render fails at `HomePage.tsx:2,9` (imports `TheLeak`, `UrgencyStatement`).
- Root cause: the repo was assembled from an upload, with two sections never committed. Seven other section files exist unmounted, so page composition and file inventory have drifted apart.
- Lesson: no build check, and no single source of truth for page composition.

**Example 2: A $15K/month dentist applies.**
- Path: answers "Under $20,000", `getQualificationMessage` returns `close`, the screen says "We typically work with businesses doing $50K+".
- Root cause: the answers exist only in `useState`. The owner never learns the lead exists, and the `fbq Lead` event already fired on CTA click (`App.tsx openPreQual`), so the Pixel records a lead who was rejected and never captured.

**Example 3: A $60K/month HVAC owner applies from `/services`.**
- Path: completes the form, gets `book`, `onQualified()` closes the form, and `App.modalOpen` becomes `true`. `ServicesPage` does not render that modal, so nothing appears and the form just vanishes.
- Root cause: the modal state and the modal component live in different places (`App.tsx:23` vs `ServicesPage.tsx` local `modalOpen`).

**Example 4: A $60K/month HVAC owner applies from `/`.**
- Path: on the last click, `handleSubmit` runs `setSubmitted(true)` and `onQualified()`, the form closes and Calendly opens. If they close Calendly and click CTA again, `PreQualForm` re-mounts with `submitted=true` and `qualResult='book'`, showing "You qualify" with their old answers, and the form cannot be re-taken.
- Root cause: state is held in a component that returns `null` instead of unmounting, and no reset happens on close.

**Example 5: First-impression design review of the hero.**
- What the visitor sees: a black page, a dim gold-flecked texture at 30% opacity, a 72px 25-word H1, three grey sub-paragraphs and two buttons. There is no product, person, number or example.
- Root cause: copy-first generation with a token-driven dark theme. The only image is decorative, and every section reuses one centered template, so nothing communicates what the service concretely produces.

## 10. Files that matter most (review order)

1. `src/pages/HomePage.tsx`: broken imports, page composition.
2. `src/components/PreQualForm.tsx`: qualification logic, flow bugs (lines ~95–180).
3. `src/App.tsx`: global modal state, analytics events, Lenis/GSAP wiring.
4. `src/components/ContactModal.tsx`: Calendly embed, dead placeholder branch.
5. `src/pages/ServicesPage.tsx`: duplicated nav and footer, orphaned modal state, credit table (verify the math: for example 9,500 − 2,200 = 7,300 is correct, and 9,500 − 7,350 = 2,150 is correct).
6. `src/sections/Hero.tsx` and `src/sections/Services.tsx`: copy and layout quality.
7. `src/index.css`, `tailwind.config.js`, `index.html`: tokens, fonts, analytics placeholders.
8. `src/components/ScrollReveal.tsx`: animation fail-state behaviour.
9. `src/sections/` orphans (`FinalCTA`, `LeadMagnet`, `NotAFit`, `TestimonialPreview`, `FramingBanner`): decide to mount or delete. `LeadMagnet` fakes a send and `TestimonialPreview` has a fabricated quote.

## 11. What is not in this repo (questions for the owner)

- The prospecting, website-scoring, mockup, hero-image, email and follow-up pipeline described in the original request. Where does it live?
- Confirmed: the deleted `Kimi_Agent_Vinton Adler Website Build.zip` (recover with `git show 8ad68a4^:"Kimi_Agent_Vinton Adler Website Build.zip"`) contains `app/src/sections/TheLeak.tsx`, `UrgencyStatement.tsx` and `WhyChoose.tsx`. The first two are the missing imports, so restoring them from the zip is the fastest fix for failure #1. Diff the zip's other files against `src/` before trusting either copy.
- Is a live deployment available to compare against the repo?
