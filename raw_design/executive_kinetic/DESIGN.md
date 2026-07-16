---
name: Executive Kinetic
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444653'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#003c36'
  on-tertiary: '#ffffff'
  tertiary-container: '#00554e'
  on-tertiary-container: '#5fcdbf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
---

## Brand & Style
The design system is engineered for a high-stakes, multi-tenant event management environment where professional reliability meets the kinetic energy of live productions. The brand personality is authoritative yet frictionless, designed to evoke a sense of absolute control for administrators and seamless discovery for attendees.

The visual style is **Corporate Modern**, leaning into high-fidelity precision. It utilizes generous whitespace, purposeful data visualization, and a "layered functionalism" approach. This ensures that while the interface remains professional and trustworthy, it possesses the vibrancy necessary to represent diverse event types—from corporate summits to music festivals. The system is designed to scale across multiple organizational identities, maintaining a neutral structural backbone that allows tenant-specific content to shine.

## Colors
The color palette is anchored in **Royal Blue (#1E40AF)** to establish an immediate sense of institutional stability and trust. This is balanced by **Electric Purple (#7C3AED)**, used strategically for high-intent actions and "event excitement" touchpoints.

- **Primary (Royal Blue):** Reserved for core navigation, primary buttons, and structural branding.
- **Secondary (Electric Purple):** Used for accents, notifications, and "Live Now" indicators.
- **Tertiary (Teal):** Applied to success states and specific data visualization categories.
- **Neutrals:** A sophisticated range of Slate Grays is used to manage cognitive load in data-heavy dashboard views. Backgrounds utilize a subtle off-white (#F8FAFC) to reduce glare during long management sessions.

## Typography
This design system utilizes **Inter** as its sole typeface to ensure maximum legibility across complex data tables, schedules, and analytics. The type scale is strictly mathematical, favoring clarity and information density.

- **Headlines:** Use tighter letter-spacing and heavier weights to create a strong visual hierarchy.
- **Body Text:** Optimized for long-form reading in documentation and event descriptions.
- **Labels:** Set in uppercase with increased letter-spacing for secondary metadata and table headers.
- **Monospace:** **JetBrains Mono** is introduced specifically for technical IDs, ticket codes, and developer-facing API keys within the admin suite.

## Layout & Spacing
The layout follows a **Fluid Grid** logic with fixed maximum widths for dashboard containers. 

- **Admin Dashboards:** Use a 12-column grid with a persistent left-hand navigation rail (280px). Content resides in "Canvas" areas with 24px gutters.
- **Public Landing Pages:** Utilize a centered 12-column grid with a maximum width of 1440px. 
- **Spacing Rhythm:** Based on an 8px root system. All padding and margins must be multiples of 8 (8, 16, 24, 32, 48, 64). 
- **Adaptation:** On mobile, the 12-column grid collapses to a single column with 16px side margins. Data tables in the admin view should transition to a card-stacking pattern or a horizontally scrollable container with a frozen first column.

## Elevation & Depth
Depth in this design system is created through **Tonal Layers** and **Low-Contrast Outlines**. We avoid heavy, dramatic shadows to maintain a clean, professional aesthetic.

- **Level 0 (Base):** The primary background color (#F8FAFC).
- **Level 1 (Cards/Containers):** White background (#FFFFFF) with a 1px border in a soft neutral (#E2E8F0).
- **Level 2 (Dropdowns/Modals):** White background with a subtle, diffused ambient shadow (0px 4px 12px rgba(0, 0, 0, 0.05)) and a slightly darker border.
- **Depth Logic:** Higher elevation levels are used exclusively for temporary UI (tooltips, menus, modals) to keep the primary workspace feeling flat and focused.

## Shapes
The shape language is **Rounded**, reflecting a modern and approachable corporate identity. 

- **Small Components (Buttons, Inputs):** 0.5rem (8px) radius.
- **Medium Components (Cards, Modals):** 1rem (16px) radius.
- **Large Components (Hero sections, Large containers):** 1.5rem (24px) radius.
- **Interactive States:** Buttons should never be fully pill-shaped; they maintain their 8px radius to feel structural and aligned with the grid.

## Components

### Buttons
- **Primary:** Solid Royal Blue with white text. High-contrast, 8px radius.
- **Secondary:** Outlined Blue or Purple with a 1px stroke. 
- **Ghost:** No background or border, used for low-priority actions in toolbars.

### Cards
Cards are the primary vessel for information. They must feature a 1px #E2E8F0 border and 24px internal padding. In the multi-tenant context, cards may feature a small "Tenant Tag" in the top right corner.

### Data Tables
Tables are high-density. Headers are sticky, set in `label-md` with a subtle gray background. Rows use alternating "Zebra" striping on hover to help eye-tracking across wide data sets.

### Inputs & Selects
Field labels are always visible (not floating). Focus states use a 2px Royal Blue ring with a 2px offset to ensure accessibility and clear focus management.

### Status Chips
Used for event status (e.g., "Draft", "Live", "Completed"). 
- **Live:** Secondary Purple background with 10% opacity and solid Purple text.
- **Draft:** Neutral Slate background with solid Slate text.
- **Success:** Teal background with 10% opacity and solid Teal text.

### Navigation
- **Global Rail:** Dark Slate (#1E293B) for the Admin sidebar to distinguish the management interface from the white content canvas.
- **Tenant Switcher:** A prominent dropdown at the top of the sidebar allows users to toggle between different organization accounts.