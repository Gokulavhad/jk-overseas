# JK Overseas — Corporate Website

**Precision Industrial Tools | Moshi, Pune, India**

A complete, responsive, static multi-page corporate website for JK Overseas — manufacturer and global exporter of precision boring bars and industrial cutting tools.

---

## Project Structure

```
jkoverseas/
├── index.html          ← Home page
├── about.html          ← About / Company overview
├── products.html       ← Products catalog with filter
├── industries.html     ← Industries served
├── services.html       ← Services offered
├── downloads.html      ← Catalogs, datasheets, brochures
├── contact.html        ← Contact form + office details
├── 404.html            ← Custom 404 error page
│
├── css/
│   ├── variables.css   ← Design tokens (colors, typography, spacing)
│   ├── style.css       ← Main stylesheet (all components)
│   └── responsive.css  ← Responsive breakpoints
│
├── js/
│   ├── navigation.js   ← Sticky nav, mobile menu, active links
│   ├── animations.js   ← IntersectionObserver scroll animations + counters
│   └── main.js         ← Filter, form validation, scroll-to-top
│
├── assets/
│   ├── images/         ← Replace CSS placeholders with real product photos
│   ├── icons/          ← Custom SVG icons (if needed)
│   ├── logos/          ← Company logo files
│   └── fonts/          ← Self-host fonts here (see Font Setup below)
│
└── README.md
```

---

## Getting Started

No build tools required.

```bash
# Open directly in browser
open index.html

# Or serve locally (recommended for development)
npx serve .
# OR
python3 -m http.server 8000
```

---

## Technology Stack

| Layer      | Technology            |
|------------|-----------------------|
| Markup     | HTML5 (semantic)      |
| Styling    | CSS3 + Custom Properties |
| Scripting  | Vanilla JavaScript (ES6+) |
| Fonts      | Google Fonts (Barlow Condensed + Inter) |
| Icons      | Inline SVG (zero dependencies) |
| Images     | CSS gradient placeholders (replace with real photos) |

**Zero external dependencies beyond Google Fonts.**

---

## Design System

### Color Palette

| Token                  | Value     | Usage                        |
|------------------------|-----------|------------------------------|
| `--clr-primary`        | `#0D1B2A` | Dark navy — backgrounds, nav |
| `--clr-secondary`      | `#1B4F8A` | Steel blue — buttons, accents|
| `--clr-accent`         | `#C9962E` | Precision gold — highlights  |
| `--clr-white`          | `#FFFFFF` | Content backgrounds          |
| `--clr-light`          | `#F5F7FA` | Alternate section backgrounds|

### Typography

- **Display**: Barlow Condensed (700, 800) — headings and section titles
- **Body**: Inter (400, 500, 600) — all body text and UI

All font sizes use CSS custom properties (`--fs-xs` through `--fs-7xl`) defined in `variables.css`.

---

## Replacing Placeholder Images

All product and background images are currently CSS gradient placeholders. To replace:

### Product Card Images
```html
<!-- Current (placeholder) -->
<div class="img-placeholder bg-boring" role="img" aria-label="...">Label</div>

<!-- Replace with -->
<img src="assets/images/boring-bar-sp-series.jpg" alt="JK-SP Series Single Point Boring Bar" loading="lazy" />
```

### Hero Background
In `style.css`, find `.hero-bg` and replace gradient with:
```css
.hero-bg {
  background-image: url('assets/images/hero-factory.jpg');
  background-size: cover;
  background-position: center;
}
```

**Recommended image sizes:**
- Hero: 1920×1080px (WebP, <200KB)
- Product cards: 600×400px (WebP, <80KB)
- Industry cards: 800×600px (WebP, <120KB)
- Team photos: 400×400px (WebP, <60KB)

---

## Font Setup (Self-Hosting)

Currently fonts are loaded from Google Fonts CDN. To self-host:

1. Download from [google-webfonts-helper.herokuapp.com](https://gwfh.mranftl.com/fonts):
   - Barlow Condensed: weights 700, 800
   - Inter: weights 400, 500, 600

2. Place `.woff2` files in `assets/fonts/`

3. Replace Google Fonts import at top of `style.css`:
```css
/* Remove this line */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed...');

/* Add this instead */
@font-face {
  font-family: 'Barlow Condensed';
  src: url('../assets/fonts/barlow-condensed-700.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
/* Repeat for each weight */
```

---

## Key Features

- **Sticky navigation** with transparent→dark transition on scroll
- **Mobile hamburger menu** with smooth slide-in
- **Active nav link** auto-highlighting per page
- **Scroll-to-top button** appears after 400px scroll
- **Intersection Observer animations** — fade-in + slide-up on scroll
- **Counter animations** — numbers count up when statistics section enters view
- **Product filter** — tab-based filtering by category (static, JS-driven)
- **Product search** — live search filtering by product name/description
- **Contact form validation** — required fields, email format, success state
- **Google Fonts** with `display=swap` for fast rendering
- **Semantic HTML** throughout — `<article>`, `<section>`, `<nav>`, `<aside>`
- **ARIA labels** on all interactive elements and landmark regions
- **Print stylesheet** in `responsive.css`
- **Prefers-reduced-motion** support in `responsive.css`

---

## Customisation Checklist

Before going live:

- [ ] Replace all CSS image placeholders with real photography
- [ ] Update phone numbers in all pages (`+91 98765 43210`)
- [ ] Update email addresses (`info@jkoverseas.com`, `export@jkoverseas.com`)
- [ ] Update actual address if different from placeholder
- [ ] Replace Google Maps link in `contact.html` with correct coordinates
- [ ] Add actual PDF files to `assets/` and update download button `data-file` attributes
- [ ] Connect contact form to backend (EmailJS / Formspree / custom PHP)
- [ ] Add real client logos to the client strip section in `index.html`
- [ ] Update team member names, roles, and photos in `about.html`
- [ ] Set correct IEC code (currently placeholder `AABCJ1234F`)
- [ ] Self-host fonts for GDPR compliance in EU markets
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Set up Google Analytics or equivalent

---

## Browser Support

| Browser         | Supported |
|-----------------|-----------|
| Chrome 90+      | ✅        |
| Firefox 88+     | ✅        |
| Safari 14+      | ✅        |
| Edge 90+        | ✅        |
| Mobile Safari   | ✅        |
| Chrome Android  | ✅        |
| IE 11           | ❌ (intentional) |

---

## SEO

Every page includes:
- Descriptive `<title>` tags
- `<meta name="description">` 
- `<meta name="keywords">`
- Open Graph tags (`og:title`, `og:description`, `og:type`)
- Semantic heading hierarchy (one `<h1>` per page)
- `alt` attributes on all images
- `aria-label` on all SVG icons and interactive elements
- Structured breadcrumb navigation

---

## Performance Notes

- No JavaScript frameworks — vanilla JS only
- CSS custom properties avoid style recalculation
- `loading="lazy"` should be added when replacing placeholder `<img>` tags
- All animations use `transform` and `opacity` (GPU-composited, no layout thrash)
- Google Fonts uses `display=swap` to prevent FOIT

---

## License

Proprietary — JK Overseas. All rights reserved.  
Built as a static website deliverable. Not for redistribution.

---

## Contact

**JK Overseas**  
Plot No. 12, Industrial Estate, Moshi, Pune – 412105  
Maharashtra, India  
GSTIN: 27CYBPA6300E1Z4  
info@jkoverseas.com
