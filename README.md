# Md. Kowshik Alam — Finance & Accounts Portfolio

A single, polished, production-ready corporate portfolio website for **Md. Kowshik Alam**, Senior Executive (Finance & Accounts) at Bangladesh Honda Private Limited, CA-CC (ICAB / ACNABIN / Baker Tilly International), and MBA (BRAC University).

---

## Design Philosophy

- **Corporate Credibility**: Designed specifically for employers, executive recruiters, and professional board contacts — not freelance client acquisition.
- **Strict Black & White Palette**: Pure monochrome `#0A0A0A` near-black and `#FAFAFA` near-white with refined greyscale hierarchy. No colored tints or distractions.
- **Frosted Glassmorphism**: High-performance backdrop blurs, 1px hairline borders, subtle luminous glows, and cursor-aware mouse highlights.
- **Editorial Typography**: Editorial high-contrast serif headlines paired with clean grotesk body typography.
- **Micro-Interactions**: Scroll-triggered reveals, rotating specialty cycles, dynamic number counter roll-ups, interactive accordion timeline, and filterable portfolio grid.

---

## File Structure

```
kowshik-alam-portfolio/
├── index.html                   # Semantic HTML5 root document
├── README.md                    # Project documentation
├── data/
│   └── content.json             # Source resume & portfolio JSON data
└── assets/
    ├── img/
    │   ├── kowshik-photo.jpg    # Professional portrait (B&W glass frame)
    │   └── favicon.svg          # Geometric monogram SVG icon
    ├── docs/
    │   └── Profile.pdf          # Professional CV for download
    ├── css/
    │   ├── variables.css        # Strict monochrome tokens (dark & light themes)
    │   ├── base.css             # CSS reset, fluid typography, layout
    │   ├── components.css       # Glass cards, buttons, badges, nav, tabs
    │   ├── sections.css         # Hero, proof ticker, timeline, portfolio, contact
    │   └── animations.css       # Keyframes, scroll reveal, reduced-motion
    └── js/
        ├── main.js              # Theme toggle, scrollspy, rotating text, form
        ├── reveal.js            # IntersectionObserver scroll reveal
        ├── counters.js          # requestAnimationFrame animated stat counters
        └── cursor-glow.js       # Mouse-following radial glow on glass cards
```

---

## How to Run & Preview

You can open `index.html` directly in any modern browser, or serve it using any local static web server:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js npx serve
npx serve .
```

Then navigate to `http://localhost:8000`.

---

## Key Features & Customizations

1. **Light / Dark Mode**:
   - Dark mode is active by default.
   - Clicking the sun/moon icon toggles between dark and light themes, saved in `localStorage`.
2. **Download CV**:
   - The "Download CV" buttons in the navigation and hero section download `assets/docs/Profile.pdf` directly.
3. **Updating Content**:
   - Resume and client data is documented in `data/content.json` and cleanly structured with matching semantic classes in `index.html`.
