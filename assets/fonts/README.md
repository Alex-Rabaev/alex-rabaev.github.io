# Fonts

Self-hosted **variable** fonts go here (subset `.woff2`). Until you add them, the
token families in `css/tokens.css` fall back to a fast system-font stack, so the
site works and stays fast with zero dependencies.

## To add your chosen fonts (PRD Open Question 1 — style direction)

1. Drop subset variable `.woff2` files here, e.g. `display-var.woff2`,
   `body-var.woff2`, `mono-var.woff2`.
2. Add `@font-face` rules (with `font-display: swap`) — put them in
   `css/base.css` (or a new `css/fonts.css` imported into `@layer base`):

   ```css
   @font-face {
     font-family: "Portfolio Display";
     src: url("/assets/fonts/display-var.woff2") format("woff2");
     font-weight: 400 800;
     font-display: swap;
   }
   ```

3. The family names (`Portfolio Display`, `Portfolio Sans`, `Portfolio Mono`)
   are already wired in `css/tokens.css` — no other change needed.
4. Preload the critical face in `index.html` `<head>`:

   ```html
   <link rel="preload" href="/assets/fonts/display-var.woff2" as="font" type="font/woff2" crossorigin />
   ```
