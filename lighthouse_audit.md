# Lighthouse Fix Prompt — arunpandian.fun
# Paste this entire prompt into Cursor

You are fixing all Lighthouse audit failures on my React + Vite + Tailwind portfolio site
(arunpandian.fun). I want to push Accessibility from 89 → 100, reduce Speed Index,
eliminate unused JS, and cut the network payload. Work through each section below precisely.

---

## 1. ACCESSIBILITY FIXES

### 1A — GitHub Contribution Graph: aria-label on plain <div> (364 elements failing)
Find the GitHub heatmap/contribution graph component.
Every contribution cell is a <div> with aria-label but no role — this is invalid HTML.

Fix Option A (preferred — minimal DOM changes):
  Add role="img" to each individual contribution cell div that has aria-label.
  BEFORE: <div aria-label="3 contributions on Mon, Apr 7, 2025" class="w-[10px] h-[10px]...">
  AFTER:  <div role="img" aria-label="3 contributions on Mon, Apr 7, 2025" class="w-[10px] h-[10px]...">

Fix Option B (even better — if you can refactor):
  Wrap the entire contribution graph in a single <figure> or <div role="img"> with one
  aria-label="GitHub contribution activity". Remove individual aria-labels from each cell.
  This collapses 364 ARIA violations to 0 in one wrapper change.

Pick whichever option requires fewer code changes based on the component structure.

---

### 1B — Color Contrast: 5 elements below WCAG AA (4.5:1 ratio required)

Fix each of these Tailwind class changes:

1. Nav links (ul.hidden > li > a.font-medium):
   Find the desktop navigation links. The text color has insufficient contrast.
   Increase the opacity of the text color utility — change from /60 or /70 to at least /90.
   Or switch to a fully opaque foreground color class.

2. "Explore Work" CTA button — the inner <span>:
   The <span> inside the hero CTA button is inheriting a lower opacity than needed.
   Remove any opacity utility on the inner span. Let it inherit the full button text color.
   BEFORE: <span class="... opacity-80"> or <span class="text-honeydew/80">
   AFTER:  <span> (or full opacity version)

3. Footer — your name "Arunpandian C" in text-punch-red:
   The selector is: footer p.text-frosted-blue/80 > span.text-punch-red
   The red on that semi-transparent blue background fails contrast.
   Fix: either increase red brightness (go one shade lighter in your palette)
   or add font-semibold to compensate at smaller sizes.

4. Footer copyright — class="text-frosted-blue/50 text-xs":
   BEFORE: text-frosted-blue/50
   AFTER:  text-frosted-blue/75
   (opacity 50% at xs size is definitely below 4.5:1 — minimum bump to 75%)

5. "Loaded in Xs" performance badge — class="text-frosted-blue/40 text-xs":
   BEFORE: text-frosted-blue/40
   AFTER:  text-frosted-blue/70
   This is the smallest opacity text on the page. Bring it up to at least 70%.

---

### 1C — Accessible Name Mismatch: aria-label doesn't start with visible text (3 elements)
WCAG 2.5.3 requires the accessible name to contain the visible label text.

1. Logo link "AC":
   BEFORE: <a href="#hero" aria-label="Go to top of page">AC</a>
   AFTER:  <a href="#hero" aria-label="AC – go to top of page">AC</a>

2. "Explore Work" button:
   BEFORE: aria-label="View my projects" (or similar — doesn't start with "Explore Work")
   AFTER:  aria-label="Explore Work – view my projects"
   Better yet: just REMOVE the aria-label entirely. The visible text "Explore Work" is clear enough.

3. Terminal widget (role="button"):
   BEFORE: aria-label="Open terminal (Ctrl+K)" or similar
   AFTER:  aria-label="Open terminal – keyboard shortcut Ctrl+K"
   The label must START with the visible text shown to sighted users.

---

### 1D — Heading Order: h4 without a preceding h3 (1 element)
Find the certification card that contains:
  <h4 class="font-semibold text-xs md:text-sm">Python (Certiport)</h4>

Fix: Change it to h3, OR add a visually hidden h3 parent above all cert cards:
  Option A: <h3 class="font-semibold text-xs md:text-sm">Python (Certiport)</h3>
  Option B: Add <h3 class="sr-only">Certifications</h3> before the cert cards section,
            then keep the h4s.

Check all heading levels site-wide while you're here — audit h1 → h2 → h3 → h4 descend
without skipping levels in any section.

---

### 1E — Link with no accessible name (1 element — PDF link)
Find: <a href="/622_Final Camera Ready Copy.pdf" target="_blank" rel="noopener noreferrer" class="text-punch-red...">
This link has NO inner text or aria-label — screen readers announce it as just "link".

Fix:
  BEFORE: <a href="/622_Final Camera Ready Copy.pdf" ...></a>  (empty or icon-only)
  AFTER:
    <a
      href="/622_Final Camera Ready Copy.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View IEEE paper – Blockchain NFT Certification (opens PDF)"
      class="text-punch-red..."
    >
      View Paper ↗
    </a>

---

## 2. SPEED INDEX — Reduce from 1.3s to under 1.1s

### 2A — Critical CSS inlining (biggest Speed Index win)
The Speed Index is 1.3s because the browser waits for CSS before painting.
In index.html, inline the critical above-the-fold styles directly in a <style> tag:

  <style>
    /* Inline ONLY hero section critical styles here */
    /* body base, hero container, hero heading font-size, hero CTA */
    /* Everything else loads via the normal stylesheet */
  </style>

To find what to inline: open DevTools → Coverage tab → record page load →
identify CSS rules used in the first viewport paint. Typically:
  - body, html reset
  - nav styles
  - hero section container, heading, subheading, CTA button

---

### 2B — Preconnect hints for third-party origins
Add these to the <head> in index.html BEFORE any stylesheet or script tags:

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <!-- Add any other CDN origins your fonts or scripts come from -->
  <link rel="dns-prefetch" href="https://api.github.com" />

---

### 2C — Preload the LCP resource
Your LCP is 0.9s (good!) but we can squeeze more Speed Index by preloading
the hero image or main font. Add in index.html <head>:

  <!-- If your hero has a bg image or a portrait photo: -->
  <link rel="preload" href="/your-hero-image.webp" as="image" />

  <!-- If you have a custom display font loaded via @font-face: -->
  <link rel="preload" href="/assets/your-display-font.woff2" as="font" type="font/woff2" crossorigin />

---

### 2D — Defer non-critical animations
Your animation-D0dsm40Y.js takes 132ms on the main thread.
If these are scroll-triggered animations (AOS, GSAP ScrollTrigger, Framer Motion variants),
make sure they are not blocking initial render.

In your main entry (main.tsx or App.tsx), dynamically import the animation library:
  BEFORE: import AOS from 'aos'; AOS.init();
  AFTER:
    // Defer animation init until after first paint
    requestIdleCallback(() => {
      import('aos').then(({ default: AOS }) => AOS.init());
    });

Or use React lazy + Suspense for any animation-heavy component not in the initial viewport.

---

## 3. UNUSED JAVASCRIPT — Reduce index-DPbb_4jX.js (25KB wasted, 49% unused)

### 3A — Analyse what's in the chunk
Run: npx vite-bundle-visualizer
Or: npx rollup-plugin-visualizer (add to vite.config.ts temporarily)

This shows exactly which modules are bloating each chunk.

### 3B — Code-split routes and below-fold sections
In your React Router setup, wrap every route component in React.lazy:

  BEFORE:
    import Projects from './pages/Projects'
    import Contact from './pages/Contact'

  AFTER:
    const Projects = React.lazy(() => import('./pages/Projects'))
    const Contact  = React.lazy(() => import('./pages/Contact'))

  Wrap in <Suspense fallback={null}> or a skeleton loader.

### 3C — Tree-shake FontAwesome (currently loading 110KB fa-solid + 99KB fa-brands = 209KB)
If you're using @fortawesome/react-fontawesome, make sure you are NOT doing:
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { fas } from '@fortawesome/free-solid-svg-icons'  // ← imports ALL icons
  library.add(fas)

Instead, import only the specific icons you use:
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
  import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons'
  library.add(faGithub, faLinkedin, faEnvelope, faArrowRight)

This can save 80-150KB of JS/font payload alone.

Alternatively, replace FontAwesome entirely with lucide-react (tree-shakeable by default):
  npm install lucide-react
  import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

### 3D — Dynamic import for the GitHub contribution graph
The GitHub heatmap is likely a complex component not visible on first load.
Lazy load it:
  const GitHubGraph = React.lazy(() => import('./components/GitHubGraph'))

  // In JSX, wrap with IntersectionObserver or use react-intersection-observer:
  <Suspense fallback={<div className="h-32 animate-pulse bg-slate-800 rounded" />}>
    <GitHubGraph />
  </Suspense>

---

## 4. NETWORK PAYLOAD — Reduce from 2,761 KB (target: under 1,600 KB)

### 4A — Convert all project/blog images to WebP (BIGGEST WIN — saves ~1,500KB)
Current PNG sizes causing the 2.7MB payload:
  - Jezcabs.png          → 523 KB
  - Ai india summit.png  → 505 KB
  - crm tripxplo 1.png   → 478 KB
  - Ai Agentic honeypot.png → 253 KB
  - internbyte 1.png     → 218 KB
  - SRM Conference.jpg   → 136 KB

Convert all of them to WebP at 80% quality:
  npx sharp-cli --input "public/*.png" --output "public/optimized/" --format webp --quality 80
  npx sharp-cli --input "public/*.jpg" --output "public/optimized/" --format webp --quality 80

Or use Squoosh CLI:
  npx @squoosh/cli --webp '{"quality":80}' public/Jezcabs.png
  (repeat for each image)

Then update all <img> src and CSS background-image references to point to the .webp files.
Use the <picture> tag for fallback:
  <picture>
    <source srcSet="/Jezcabs.webp" type="image/webp" />
    <img src="/Jezcabs.png" alt="Project screenshot" loading="lazy" />
  </picture>

Target sizes after WebP conversion (80% quality):
  - 523KB PNG → ~80-120KB WebP  (5-6x reduction)
  - 505KB PNG → ~80-110KB WebP
  - 478KB PNG → ~70-100KB WebP

### 4B — Add lazy loading to ALL below-fold images
Every project screenshot image that is NOT in the hero viewport needs:
  <img src="..." loading="lazy" decoding="async" alt="..." />

For React components, add these props to every <img> in the projects/skills sections.

### 4C — Add explicit width and height to images (prevents layout shift too)
  <img
    src="/Jezcabs.webp"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
    alt="Jezcabs project screenshot"
  />

### 4D — FontAwesome WOFF2 subsetting (saves ~150KB)
If you're keeping FontAwesome, subset the font files to only include glyphs you use.
Easiest fix: switch to SVG icons (option 3C above) and remove the WOFF2 font files entirely.

### 4E — Add Vite build optimizations in vite.config.ts

  export default defineConfig({
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'animation':    ['framer-motion'],  // or whatever animation lib you use
            'icons':        ['lucide-react'],
          },
        },
      },
      // Enable chunk size warnings
      chunkSizeWarningLimit: 500,
    },
    // Enable gzip compression analysis
    plugins: [
      // Add visualizer plugin temporarily to check bundle:
      // visualizer({ open: true })
    ],
  })

---

## 5. VERIFICATION CHECKLIST

After making all changes, verify with:

  # Run local Lighthouse
  npx lighthouse http://localhost:5173 --view --output=json

  # Check bundle sizes
  npx vite build && ls -lh dist/assets/*.js

  # Verify images are WebP and sizes are under 150KB each
  ls -lh public/*.webp

  # Contrast check — use browser DevTools Accessibility panel
  # Inspect each fixed element → Computed → check contrast ratio shows ≥ 4.5:1

  # ARIA validation
  # Install axe DevTools browser extension → run full-page scan → should show 0 violations

Expected scores after all fixes:
  Performance:     98 → 99-100  (images + lazy load + defer animations)
  Accessibility:   89 → 100     (all 5 fixes above)
  Best Practices:  100 → 100    (unchanged)
  SEO:             100 → 100    (unchanged)
  Network payload: 2,761KB → ~800-1,000KB
  Speed Index:     1.3s → ~0.8-1.0s

NOTE: The "540KB unused JS" shown in Lighthouse includes Chrome browser extensions
(contentScript.bundle.js, jquery-3.5.1.min.js from extensions). Those are NOT your code
and NOT fixable. Your actual site unused JS is only ~25KB from index-DPbb_4jX.js.
Focus on that chunk with the code-splitting steps in section 3.