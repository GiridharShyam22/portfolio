# Project Detail Click Feature Plan (Final)

## Summary
Add a click-to-open project detail modal for all six portfolio projects. Each project card remains visually the same, but clicking the card opens a polished case-study modal with screenshots, detailed stack explanation, key features, architecture notes, and project links. Existing Live Demo, APK, and GitHub buttons should continue opening directly without triggering the modal.

## Key Changes
- Add a new modal component, `ProjectDetailModal.jsx`, using the existing dark/glass visual language.
- **Dynamic Theming**: Each modal must dynamically inherit the background and accent theme of its parent project card (e.g., Amber for TalentRadar, Emerald for AyuSethu, etc.). The modal background should use a deep glassmorphic version of the project's specific gradient.
- Expand `src/data/projects.js` with structured detail fields:
  - `slug`, `role`, `overview`, `screenshots` (array of paths), `stackGroups`, `keyFeatures`, `architectureNotes`, `outcome`.
- **Screenshot Asset Mapping**:
  - `as[1-8].png/jpg` -> AyuSethu
  - `ss[1-4].png` -> Smart Spend
  - `sc[1-4].png` -> Soul Connect
  - `p[1-8].png` -> Prajwalan
  - `mh[1-7].png` -> Mana Hospitals
  - `tr[1-5].png` -> Talent Radar
- Add card click behavior in `Projects.jsx`:
  - Card click opens modal.
  - Action buttons (`github`, `demoUrl`, `apkUrl`) use `stopPropagation()` to prevent modal trigger.
  - Add a "Click to view case study" hover overlay or indicator on the project card.
- **Modal Layout & Components**:
  - **Header**: Project title, year, role, and immediate action buttons.
  - **Overview**: Professional one-line summary followed by a detailed description.
  - **Skills Visualization**: A `LogoLoop` (React Bits) component displaying tech logos used in the project.
  - **The Gallery (Independent of Count)**:
    - Implement a **Horizontal Scrollable Reel** for screenshots.
    - Each image sits in a high-fidelity container with custom shadows.
    - User can swipe/scroll through the images. This design remains visually balanced regardless of having 3 images or 8.
  - **Case Study Details**: Key features, Architecture notes, and Outcome sections.
- **Visual Constraints**:
  - NO emojis anywhere in the modal content.
  - Smooth transitions using Framer Motion.
- Accessibility and UX:
  - Close on `Esc`.
  - Close on overlay click.
  - Add visible close button.
  - Lock body scroll while modal is open.
  - Use `aria-modal`, `role="dialog"`, and descriptive labels.
  - No emojis anywhere.

## Content Defaults
- Use all six projects.
- Use balanced case-study depth, not full blog-style writeups.
- Start each project with its available screenshots in the horizontal reel.
- No "balancing" icons; the reel naturally handles varying image counts.
- Suggested detail sections per project:
  - `Description`
  - `Role & Impact`
  - `Technical Architecture`
  - `Key Features`
  - `Challenges & Outcomes`

## Test Plan
- Run `npm run build`.
- Verify every project card opens the correct modal.
- Verify GitHub, Live Demo, and APK buttons still open links and do not open the modal.
- Verify modal close works through close button, overlay click, and `Esc`.
- Verify mobile layout does not overflow horizontally.
- Verify screenshot fallback works if an image path is missing.
- Run a source scan to ensure no emoji characters are introduced.

## Assumptions
- Screenshot assets will be added manually by you under `public/screenshots`.
- First implementation will use a modal, not separate detail pages.
- The existing sticky project card layout will remain.
- The modal will use existing dependencies only: React, Framer Motion, Lucide/React Icons, and Tailwind.
