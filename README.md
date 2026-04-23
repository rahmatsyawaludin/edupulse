# 📡 EduPulse — Interactive Learning Dashboard

> A dynamic, state-driven learning dashboard demonstrating instructional design principles applied through modern front-end engineering.

**Live Demo → [rahmatsyawaludin.github.io/edupulse](https://rahmatsyawaludin.github.io/edupulse)**

---

## Overview

EduPulse bridges the gap between instructional design expertise and front-end engineering. Built as a showcase for ICT Integrator and Digital Learning Specialist profiles, this project moves beyond static web design into dynamic, state-driven UIs — applying learning science directly to the interface itself.

Traditional LMS platforms suffer from cognitive overload. EduPulse responds with minimalism and student-centered UX: progress visualization, immediate feedback loops, and clean component architecture that keeps learners focused.

---

## Features

### 📚 Dynamic Course Library
- Searchable and filterable course card gallery
- Component-based architecture — each card is a reusable React component driven by a data array
- Real-time enrollment state with XP rewards
- Progress bars with smooth CSS transitions

### ⚡ Interactive Quiz Engine
- 5-question knowledge quiz on Instructional Design & Learning Science
- Instant feedback with explanations grounded in learning theory (Bjork, Wiggins & McTighe)
- Conditional rendering: results screen only appears after the final question
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
| **Framework** | React 18 — `useState`, `useEffect`, `useMemo` hooks |
| **Rendering** | Pure `React.createElement` (no JSX, no build step) |
| **Styling** | Custom CSS with CSS variables — mobile-first responsive grid |
| **State** | Lifted state at App root, shared across Dashboard, Library, and Quiz |
| **Animations** | CSS `@keyframes` + JS-triggered width transitions |
| **Accessibility** | Semantic HTML (`header`, `nav`, `main`), `disabled` button states, `title` attributes |
| **Deployment** | Zero build — 3 files hosted directly on GitHub Pages |
| **Typography** | Playfair Display · DM Sans · JetBrains Mono |

---

## Design Rationale

This UI applies learning science to its own interface:

- **Immediate feedback** — Quiz answers trigger explanation-rich responses (per Hattie & Timperley's feedback model)
- **Progress visibility** — Animated progress bars leverage the goal-gradient effect to sustain motivation
- **Reduced cognitive load** — High-contrast accent colors on a dark base guide attention without overwhelming
- **Gamification** — XP and badge systems apply self-determination theory (competence, autonomy)

---

## Repository Structure

```
edupulse/
├── index.html   ← HTML skeleton, loads React CDN + files below
├── style.css    ← All styles (CSS variables, layout, components)
├── app.js       ← All React logic (data, components, state)
└── README.md    ← This file
```

---

## Running Locally

No installation or build step required.

```bash
git clone https://github.com/rahmatsyawaludin/edupulse.git
cd edupulse
# Open index.html directly in your browser, or:
npx serve .
```

---

## About

**Rahmat Syawaludin** — Instructional Designer & Learning Experience Specialist

Master of Education (Digital Learning) · Monash University · WAM 76.69 · 4× High Distinctions  
LPDP Full Scholarship · Registered AR Patent · 3 Peer-Reviewed Publications

[Portfolio](https://rahmatsyawaludin.github.io/portfolio) · [LinkedIn](https://linkedin.com/in/rahmat-syawaludin) · [Email](mailto:rahmatsywldn@gmail.com)

---

*EduPulse demonstrates that effective educational technology is both pedagogically sound and technically robust — not one or the other.*
