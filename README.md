# alex-rabaev.github.io

Personal portfolio of **Alex Rabaev**, full-stack software engineer. A fast,
accessible, single-page site built **from scratch with HTML, CSS, and vanilla
JavaScript** — no framework, no build step — and hosted on GitHub Pages.

## Tech at a glance

- **Zero dependencies, zero build.** Plain static files served as-is.
- **Modern CSS:** cascade `@layer`s + a three-tier design-token system (`oklch()`),
  fluid type via `clamp()`.
- **Light/dark theme** driven by a single `data-theme` attribute on `<html>`,
  system-default with a persisted toggle and no flash before paint.
- **Progressive enhancement:** all content is static HTML; JavaScript only enhances
  (theme toggle, mobile nav, scroll reveal). The site works fully with JS disabled.
- **Quality targets:** Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1),
  Lighthouse ≥ 95 (Perf/A11y/Best-Practices/SEO), WCAG 2.2 AA.

## Run locally

Just **double-click `index.html`** (or drag it into a browser). Paths are relative
and the script is a plain `<script>` (not an ES module), so it works straight from
the file system — no server, no install.

A local server is optional and only nicer for live-reload:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
# or: npx serve .
```

## Project structure

```
index.html            # the whole page: meta/JSON-LD, anti-FOUC script, all sections
404.html              # styled not-found page
css/
  main.css            # declares @layer order + imports every stylesheet
  reset.css base.css tokens.css utilities.css
  components/*.css     # one file per component
js/
  app.js               # one plain script: theme toggle, mobile nav, scroll reveal
assets/
  images/  fonts/  resume.pdf
```

## Edit the content

All content is plain HTML in `index.html`. Search for `TODO(content)` comments:

- **Hero** — your name, positioning line, and links.
- **Projects** — replace the 5 placeholder cards (strongest = `project-card--featured`).
  Each card: cover image in `assets/images/projects/`, title, one-sentence summary,
  3–5 tech tags, and Live Demo / Source links.
- **Experience** — your roles, newest first.
- **Skills** — keep it curated and honest.
- **About** — how you work and what you're after.
- **Résumé** — replace `assets/resume.pdf` with your real one-page CV (no code change).
- **Contact** — set your real email (appears in the contact section and footer link)
  and your GitHub/LinkedIn URLs (also update the JSON-LD `sameAs` in `index.html`).

**Fonts and accent color** are sensible placeholders pending the final style direction
(see `assets/fonts/README.md` and `css/tokens.css`).

## Deploy (GitHub Pages)

This repo is a GitHub **user site**, so it deploys at the root domain:

1. Push to the `main` branch.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`.
3. Live at <https://alex-rabaev.github.io/>. The `.nojekyll` file ensures `css/`
   and `js/` are served verbatim (no Jekyll processing).

## Quality checklist before launch

- [ ] Run Lighthouse (mobile + desktop) — target ≥ 95 across all four categories.
- [ ] Keyboard-only pass: tab order, visible focus, mobile menu trap/Escape.
- [ ] Screen-reader spot check.
- [ ] Smoke test with **JavaScript disabled** (content + nav usable, theme follows OS).
- [ ] Verify real links, email, and that `assets/resume.pdf` downloads.
```
