# 📡 EduPulse — Interactive Learning Dashboard

> A dynamic, state-driven learning dashboard demonstrating instructional design principles applied through modern front-end engineering.

**Live Demo:** [rahmatsyawaludin.github.io/edupulse](https://rahmatsyawaludin.github.io/edupulse)

---

## Overview

EduPulse bridges the gap between instructional design expertise and front-end engineering. Built as a showcase for ICT Integrator and Digital Learning Specialist profiles, this project moves beyond static web design into dynamic, state-driven UIs — applying learning science directly to the interface itself.

Traditional LMS platforms suffer from cognitive overload. EduPulse responds with minimalism and student-centered UX: progress visualization, immediate feedback loops, and clean component architecture that keeps learners focused.

---

## Features

### 📚 Dynamic Course Library
- Searchable and filterable course card gallery
- Component-based architecture — each card is a reusable React component driven by a JSON data source
- Real-time enrollment state with XP rewards
- Progress bars animated via React state transitions

### ⚡ Interactive Quiz Engine
- 5-question knowledge quiz on Instructional Design & Learning Science
- Instant feedback with explanations grounded in learning theory (Bjork, Wiggins & McTighe, Bloom)
- Conditional rendering: results screen appears only after the final question
- Score tracking with XP calculation (+20 XP per correct answer)

### 📊 Visual Progress Tracker
- Live dashboard synced to user actions across all pages
- Sidebar progress bars update in real-time without page refresh
- Badge system (locked/unlocked states)
- Activity feed reflecting recent learning actions

---

## Technical Highlights

| Concern | Implementation |
|---|---|
| **Framework** | React 18 (Hooks: `useState`, `useEffect`, `useMemo`, `useCallback`) |
| **Styling** | Custom CSS with CSS variables — mobile-first, responsive grid |
| **State Management** | Lifted state at App root, prop-drilled to child components |
| **Animations** | CSS keyframes + JS-triggered transitions for progress bars |
| **Accessibility** | Semantic HTML (`<header>`, `<nav>`, `<main>`), ARIA-compatible button states |
| **Deployment** | Single-file, zero-build — hosted on GitHub Pages |
| **Typography** | Playfair Display (display) + DM Sans (body) + JetBrains Mono (data) |

---

## Design Rationale

This project applies learning science to its own UI:

- **Immediate feedback** — Quiz answers trigger instant, explanation-rich responses (per Hattie & Timperley's feedback model)
- **Progress visibility** — Animated progress bars leverage goal-gradient effect to sustain motivation
- **Reduced cognitive load** — Dark, low-contrast base with strategic accent colors guides attention without overwhelming
- **Gamification** — XP system and badge unlocks apply self-determination theory principles (competence, autonomy)

---

## Repository Structure

```
edupulse/
├── index.html        # Complete application (single-file, no build step)
└── README.md         # This file
```

---

## Running Locally

No installation required.

```bash
# Clone the repo
git clone https://github.com/rahmatsyawaludin/edupulse.git

# Open in browser
open index.html
```

Or serve with any static file server:

```bash
npx serve .
```

---

## About the Author

**Rahmat Syawaludin** — Instructional Designer & Learning Experience Specialist

- Master of Education (Digital Learning) — Monash University | WAM: 76.69 | 4× High Distinctions
- LPDP Full Scholarship Awardee
- Registered patent in Augmented Reality education
- 3+ peer-reviewed publications

📎 [Portfolio](https://rahmatsyawaludin.github.io/portfolio) · [LinkedIn](https://linkedin.com/in/rahmat-syawaludin) · [Email](mailto:rahmatsywldn@gmail.com)

---

*EduPulse was designed to demonstrate that effective educational technology is both pedagogically sound and technically robust — not one or the other.*
