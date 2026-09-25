# init.md — Project Setup: Kowshik Alam Portfolio

## Project name
`kowshik-alam-portfolio`

## Goal
A single, polished, production-ready personal portfolio website for a finance
& accounts / CA professional. Modern minimalist + glassmorphism aesthetic,
strict black & white palette with one restrained accent, dark-mode default,
lively scroll/hover motion, fully responsive.

Full creative/content brief lives in `master_prompt.md` — read that first,
this file just sets up the build.

**Note on scope:** This is a corporate career/credibility portfolio, not a
freelance-accountant client-acquisition site. Do NOT add booking/scheduling
tools (Calendly), a secure client portal link, pricing packages, or a
document-upload FAQ — those are for accountants soliciting paying clients,
which doesn't apply here. What we did keep from standard accounting-site
best practice: a trust-building section order, a "proof strip" of known
organizations beneath the hero (using his real audit/advisory client list
in place of testimonials), and a dedicated credentials/tools showcase.

---

## 1. Tech stack

Keep it lightweight — this does not need a heavy framework.

**Recommended:**
- HTML5 + CSS3 (custom properties / CSS variables for theming) + vanilla
  JavaScript (ES6+)
- Optional light libs (only if genuinely needed, load via CDN, keep bundle
  small):
  - `AOS` (Animate On Scroll) or a hand-rolled `IntersectionObserver` reveal
    utility
  - A tiny counter-animation utility (or hand-roll with `requestAnimationFrame`)
- No backend required. Contact form can post to a form service (e.g.
  Formspree) or fall back to `mailto:`.

**If the tool defaults to a framework (React/Vite/Next), that's fine too** —
just keep it a single-page site, no unnecessary routing complexity, and keep
all styling in CSS variables so theme (light/dark, accent color) stays easy
to tweak.

---

## 2. File structure

```
kowshik-alam-portfolio/
├── index.html
├── /assets
│   ├── /img
│   │   ├── kowshik-photo.jpg        (placeholder — client will provide)
│   │   └── favicon.png
│   ├── /css
│   │   ├── variables.css            (color tokens, spacing, typography scale)
│   │   ├── base.css                 (resets, typography defaults)
│   │   ├── components.css           (glass cards, buttons, nav, badges)
│   │   ├── sections.css             (hero, timeline, portfolio grid, etc.)
│   │   └── animations.css           (reveal, hover, counter, glow effects)
│   └── /js
│       ├── main.js                  (nav, smooth scroll, theme toggle)
│       ├── reveal.js                (scroll-triggered animations)
│       ├── counters.js              (animated stat counters)
│       └── cursor-glow.js           (optional cursor-follow glow on cards)
├── /data
│   └── content.json                 (structured content — see §4)
└── README.md
```

---

## 3. Design tokens (starting point — adjust to taste, keep consistent)

```css
:root {
  /* Base */
  --bg: #0A0A0A;
  --bg-alt: #111111;
  --surface: #1C1C1C;
  --text-primary: #FAFAFA;
  --text-secondary: #B3B3B3;
  --text-muted: #6B6B6B;
  --border: rgba(255, 255, 255, 0.12);

  /* Glass */
  --glass-fill: rgba(255, 255, 255, 0.06);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-blur: 20px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  /* Accent (restrained — used sparingly: links, icons, key numbers) */
  --accent: #C9A24B;
  --accent-soft: rgba(201, 162, 75, 0.15);

  /* Type */
  --font-display: "Fraunces", "Playfair Display", serif;
  --font-body: "Inter", "Manrope", sans-serif;

  /* Motion */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --duration: 300ms;

  /* Radius / spacing */
  --radius-lg: 24px;
  --radius-md: 16px;
  --radius-sm: 8px;
}

[data-theme="light"] {
  --bg: #FAFAFA;
  --bg-alt: #F0F0F0;
  --surface: #FFFFFF;
  --text-primary: #0A0A0A;
  --text-secondary: #3D3D3D;
  --text-muted: #7A7A7A;
  --border: rgba(0, 0, 0, 0.1);
  --glass-fill: rgba(255, 255, 255, 0.5);
  --glass-border: rgba(0, 0, 0, 0.08);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}
```

Glass card utility class:

```css
.glass {
  background: var(--glass-fill);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
}
```

---

## 4. Content data (drop into `data/content.json` or inline — use verbatim,
do not invent facts)

```json
{
  "name": "Md. Kowshik Alam",
  "title": "Senior Executive, Finance & Accounts",
  "subtitle": "CA Apprentice · MBA (Finance & Accounts), BRAC University · BBA (Finance & Banking), IUBAT",
  "location": "Dhaka, Bangladesh",
  "phone": "01680748040",
  "email": "kowshik3066@gmail.com",
  "linkedin": "https://www.linkedin.com/in/md-kowshikalam-943b1597",
  "address": "Ka-167/Kha, Bottola, Khilkhet, Dhaka-1229",

  "summary": "A finance and accounts professional dedicated to continuous learning and research in the field. Currently at Bangladesh Honda Private Limited, focused on meaningful contribution, leadership growth, and excellence in financial operations.",

  "careerObjective": "A goal-oriented professional seeking a fulfilling career in finance and accounting, continuously building knowledge, skills, and experience to excel and deliver impact.",

  "trustStrip": [
    "British American Tobacco Bangladesh", "Power Grid Company of Bangladesh",
    "Prime Bank Limited", "Nippon Signal Co. Ltd.",
    "The Security Printing Corporation (Bangladesh) Ltd.", "Urmi Group"
  ],
  "credentialBadges": [
    { "label": "ICAB", "detail": "CA-CC, Institute of Chartered Accountants of Bangladesh" },
    { "label": "Baker Tilly International", "detail": "Articled under ACNABIN, an independent member firm" },
    { "label": "SAP", "detail": "Day-to-day transaction processing & reporting" },
    { "label": "IFRS / IAS", "detail": "Implementation & compliance, incl. IFRS 16 (ROU/Lease)" }
  ],

  "topSkills": ["Fixed Asset Management", "Leadership", "Financial Planning"],
  "skills": [
    "Fixed Asset Management", "Financial Planning & Reporting", "SAP",
    "Lease Accounting (ROU / IFRS 16)", "Statutory Audit", "Internal Audit",
    "SOx Compliance", "IAS / IFRS Implementation", "Leadership"
  ],
  "languages": ["English (Full Professional)"],

  "qualifications": {
    "professional": "Chartered Accountancy Course (CA-CC), Institute of Chartered Accountants of Bangladesh (ICAB) — articled under ACNABIN Chartered Accountants, an independent member firm of Baker Tilly International.",
    "academic": [
      { "degree": "MBA, Finance", "institution": "BRAC University", "result": "CGPA 3.18", "period": "Dec 2021 – Apr 2023" },
      { "degree": "BBA, Finance & Banking", "institution": "IUBAT", "result": "CGPA 3.32", "period": "2012 – 2017" },
      { "degree": "HSC, Business Studies", "institution": "Rajuk Uttara Model College", "result": "GPA 5.00", "period": "2010 – 2012" },
      { "degree": "SSC, Business Studies", "institution": "Kurmitola High School & College", "result": "GPA 4.88", "period": "2008 – 2010" }
    ]
  },

  "experience": [
    {
      "company": "Bangladesh Honda Private Limited",
      "role": "Senior Executive",
      "period": "April 2025 – Present",
      "location": "Dhaka, Bangladesh",
      "bullets": [
        "Ensure timely data entry of day-to-day business transactions in SAP.",
        "Check bills against supporting documents, ensuring compliance with local and company law.",
        "Maintain the Fixed Asset register.",
        "Ensure timely Fixed Asset entries (Acquisition / Addition / Disposal).",
        "Handle LC bill accounting activities.",
        "Conduct financial budget analysis.",
        "Manage organizational lease liability and Right-of-Use (ROU) assets.",
        "Prepare monthly reports.",
        "Assist in preparing financial statements and upgrading financial reporting policy."
      ]
    },
    {
      "company": "Bangladesh Honda Private Limited",
      "role": "Executive",
      "period": "December 2021 – April 2025",
      "location": "Dhaka, Bangladesh",
      "bullets": [
        "Ensured timely data entry of day-to-day business transactions in ERP.",
        "Checked bills against supporting documents for legal and company compliance.",
        "Maintained the Fixed Asset register.",
        "Ensured timely Fixed Asset entries (Acquisition / Addition / Disposal).",
        "Handled LC bill accounting activities."
      ]
    },
    {
      "company": "Health and Education for All (HAEFA)",
      "role": "Manager",
      "period": "May 2021 – December 2021",
      "location": "Bangladesh",
      "bullets": [
        "Prepared financial reports and budgets per project requirements.",
        "Authorized and monitored vouchers.",
        "Established financial policies and guidelines per management requirements."
      ]
    },
    {
      "company": "Prescription Point Limited",
      "role": "Accounting Services",
      "period": "December 2020 – April 2021",
      "location": "Bangladesh",
      "bullets": [
        "Established accounting and financial SOPs for the organization.",
        "Built the overall accounting module for the organization.",
        "Monitored accounts, treasury, and banking activities.",
        "Conducted financial income and cost analysis.",
        "Established organizational policies per management requirements."
      ]
    },
    {
      "company": "British American Tobacco (BAT)",
      "role": "Internal Auditor",
      "period": "August 2020 – January 2021",
      "location": "Dhaka, Bangladesh",
      "bullets": [
        "Performed SOx compliance testing.",
        "Assisted in upgrading the Delegation of Authority (DOA).",
        "Assisted in upgrading policies and guidelines.",
        "Assisted in adapting and implementing changes to IAS/IFRS accounting standards."
      ]
    },
    {
      "company": "ACNABIN Chartered Accountants",
      "role": "Articleship Student",
      "period": "April 2017 – August 2020",
      "location": "Dhaka",
      "note": "Independent member firm of Baker Tilly International",
      "bullets": [
        "As Auditor: gained entity understanding pre-audit, prepared financial analysis and management reports, and prepared audit reports per financial reporting standards.",
        "As Audit Reviewer: reviewed audit reports, annual financial statements, management reports, and performance assessment reports prepared by Union Porishod (UP) auditors; prepared final reviewer reports.",
        "As Accounting Service Provider: examined SOx compliance and updated SOx RACM; assisted in adapting IAS/IFRS changes; performed fixed asset verification and Fixed Asset Register (FAR) reconciliation; conducted internal audits (direct & indirect procurement, LVS procurement, overseas travel)."
      ]
    },
    {
      "company": "BRAC",
      "role": "Intern",
      "period": "October 2016 – December 2016",
      "location": "Dhaka, Bangladesh",
      "bullets": []
    }
  ],

  "auditAdvisory": [
    { "client": "British American Tobacco Bangladesh (BATB)", "service": "Accounting Service Provider", "role": "Supervisor" },
    { "client": "Nippon Signal Co. Ltd.", "service": "Statutory Audit", "role": "Audit In Charge" },
    { "client": "Power Grid Company of Bangladesh", "service": "Statutory Audit", "role": "Audit In Charge" },
    { "client": "The Security Printing Corporation (Bangladesh) Ltd.", "service": "Statutory Audit", "role": "Audit In Charge" },
    { "client": "Jolshiri Abashon", "service": "Statutory Audit", "role": "Audit In Charge" },
    { "client": "Matin Spinning Mills Ltd", "service": "Statutory Audit", "role": "Audit In Charge" },
    { "client": "Prime Bank Limited", "service": "Statutory Audit", "role": "Junior Team Member" },
    { "client": "Local Government Support Project (LGSP) III", "service": "Internal Audit", "role": "Package In Charge" },
    { "client": "Local Government Support Project (LGSP) II", "service": "Internal Audit", "role": "Junior Team Member" },
    { "client": "Urmi Group", "service": "Internal Audit", "role": "Senior Audit Associate" },
    { "client": "Rancon Automobiles Limited", "service": "Management Audit", "role": "Senior Audit Associate" },
    { "client": "Prime Finance Capital Management Limited", "service": "Management Audit", "role": "Semi-Senior Team Member" }
  ]
}
```

---

## 5. Build steps (for the AI coding agent)

1. Scaffold the file structure in §2.
2. Set up `variables.css` with the design tokens in §3 (both dark and light
   theme blocks).
3. Build `index.html` with all sections listed in `master_prompt.md` §3, in
   order, using the content in §4 verbatim — do not paraphrase names, dates,
   or figures.
4. Implement the glass-card component, nav bar (sticky, glass, active-link
   highlight), and theme toggle first — these are used everywhere.
5. Build the hero section with photo placeholder, animated specialty
   word-cycle, and animated stat counters.
5.5. Build a **"proof strip"** directly beneath the hero: a slim, muted
    marquee/row of the organizations from `trustStrip` (plain typographic
    wordmarks, not logos we don't have — small caps, low-opacity, subtle
    hover-brighten). This is the accountant-site "client logos" convention,
    substituting real audit engagements since he has no product/design work
    to show. Optionally auto-scroll it slowly (pause on hover).
6. Build the experience timeline (accordion or hover-expand cards).
7. Build the audit & advisory grid (with optional service-type filter) —
   this is the fuller version of the proof strip, with role + service type
   per engagement.
7.5. Build a **credentials & tools** row using `credentialBadges` — glass
    pill/badge components placed near "About" or "Qualifications," each
    showing the credential label + one-line detail on hover/tap. This is
    the accountant-site "certifications & software ecosystem" convention.
8. Build skills, education, and contact sections.
9. Wire up scroll-reveal animations (`reveal.js`) across all sections.
10. Add cursor-glow effect to hero and portfolio cards (optional, keep
    subtle).
11. Test responsiveness at 375px, 768px, 1024px, 1440px.
12. Run an accessibility pass: contrast, alt text, focus states, reduced-
    motion support.
13. Add favicon, meta tags, Open Graph tags.
14. Final QA: confirm no lorem ipsum, no invented facts, all links work
    (mailto, tel, LinkedIn). Confirm no booking widget, client portal, or
    pricing section was added — out of scope for this profile.

---

## 6. Notes for the client (you)

- Drop the real photo at `/assets/img/kowshik-photo.jpg` before final
  delivery — replace the placeholder. Use a real, well-lit professional
  headshot against a clean/neutral background — not a stock photo of
  calculators, coins, or handshakes. Treat it with a subtle black-and-white
  or duotone filter in the glass frame so it matches the palette.
- The accent color (`--accent`) is a single CSS variable — easy to swap if
  you want a different tone than muted gold.
- Everything content-related lives in `data/content.json` — updating his CV
  later just means editing that file, not the HTML.
- Deliberately excluded: Calendly/booking embed, secure client-portal link,
  service pricing tiers, FAQ about document uploads. These are standard on
  freelance-accountant sites soliciting paying clients; Kowshik's site is a
  corporate career portfolio, so a plain "Contact Me" (email/phone/LinkedIn)
  is the right CTA, not "Book a Discovery Call." If his goals change later
  (e.g. he starts freelance/advisory work on the side), these can be added.