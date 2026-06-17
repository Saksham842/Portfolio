# macOS‑Style Portfolio

**[Live Demo](https://portfolio-saksham842s-projects.vercel.app/)** &nbsp;|&nbsp; Built by **Saksham Hans**

An interactive developer portfolio that recreates the macOS desktop experience entirely in the browser — lock‑screen landing, draggable windows, animated dock, Finder file explorer, PDF resume viewer, gallery, terminal, and more.

Built with **React 19 + Vite 8 + GSAP + Zustand + Tailwind CSS v4**.

---

## Features

| | |
|---|---|
| **Lock‑Screen Landing** | macOS‑style lock screen with live clock, date, and name. GSAP slide‑up animation on keypress or tap. Looping background video. |
| **Draggable Windows** | Every window is independently draggable via GSAP Draggable (header‑only). Z‑index stacking on focus. Double‑click header to maximize. |
| **Window Controls** | Red/yellow/green traffic‑light buttons — close, minimize (scales down with GSAP), maximize (fills viewport). All animated. |
| **Animated Dock** | macOS‑style dock with hover magnification via GSAP. Click toggles open / focus / minimize for each window. |
| **Finder File Explorer** | Sidebar + content pane navigation through Projects, About Me, Resume, and Trash. Opens text files, images, PDFs, and URLs in dedicated viewers. Files draggable within Finder. |
| **Desktop Icons** | Folder icons on the desktop that open directly into Finder. Draggable via GSAP. |
| **PDF Resume Viewer** | Inline multi‑page PDF rendering with `react-pdf`. Download button. Scrollbar adaptive — hidden when minimized, visible when maximized. |
| **Photos Gallery** | Grid gallery with click‑to‑preview in a separate image viewer. 5‑column desktop, 2‑column mobile. |
| **Safari / Articles** | Styled blog browser with macOS‑style toolbar and search bar. |
| **Terminal / Skills** | Tech stack displayed in a terminal‑style UI with categories and checkmarks. |
| **Contact Window** | Social links (GitHub, LinkedIn, Email) as colorful cards with profile picture. |
| **Dark / Light Theme** | Toggle persisted to `localStorage`. Respects system `prefers-color-scheme` on first load. |
| **Mobile Responsive** | Full‑screen windows (5px inset), hamburger menu, grid/stack layout changes, drag disabled on touch. |
| **Resize Handles** | Windows resizable from right, bottom, and bottom‑right edges. |
| **GSAP Text Animation** | Welcome text with variable‑font‑weight GSAP hover effect — letters dynamically bold based on mouse proximity. |

---

## Architecture

### Window System — `WindowWrapper` HOC

Every window is wrapped with a generic `WindowWrapper(Component, windowKey)` higher‑order component that provides:

| Concern | Implementation |
|---|---|
| **Open / Close / Minimize** | GSAP animates `scale` and `opacity`. Uses `useLayoutEffect` for instant `display: none` when closed to prevent flash. |
| **Dragging** | GSAP Draggable bound to `#window-header` only. Disabled during maximize and entirely on mobile (<640px). |
| **Z‑Index / Focus** | `onMouseDown` triggers `focusWindow(key)` in the Zustand store, which increments the window's z-index. |
| **Maximize** | Saves pre‑maximize bounds (position + size), animates to full viewport. Reverses on un‑maximize. On mobile, CSS `.maximized` class handles it without GSAP. |
| **Resize** | Three `mousedown`/`mousemove` handles (right, bottom, corner). Minimum 350×250px. Hidden on mobile. |

### State Management — Zustand

**`useWindowStore`** — centralized lifecycle for all windows:

| Action | Description |
|---|---|
| `openWindow(key, data?)` | Opens window, assigns next z-index, optionally sets data payload |
| `closeWindow(key)` | Closes window, resets z-index, clears data |
| `focusWindow(key)` | Brings window to front |
| `minimizeWindow(key)` | Sets `isMinimized = true` |
| `unminimizeWindow(key)` | Sets `isMinimized = false` |
| `toggleMaximizeWindow(key)` | Toggles `isMaximized` |

**`useLocationStore`** — manages Finder's active folder/location navigation.

### Data‑Driven Viewers

`TxtFile` and `ImgFile` are generic — they render whatever content is passed via `openWindow(key, data)`. This lets one component display project descriptions, about‑me text, or any file content.

### Animation Flow

1. Page loads → **Landing** (lock‑screen) covers viewport at `z-index: 9999`
2. Keypress or click → GSAP slides landing up `y: "-100%"` (`power4.inOut`, 1.2s)
3. `pointer-events: none` set after animation completes
4. Main content revealed: desktop icons, dock, navbar, welcome text
5. Windows animate in with GSAP scale+fade when triggered from dock, navbar, or desktop icons

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Animation | GSAP 3 (Draggable, useGSAP plugin) |
| State Management | Zustand 5 + Immer |
| PDF | react-pdf + pdfjs-dist |
| Icons | lucide-react |
| Utilities | clsx, dayjs |

---

## Project Structure

```
src/
├── App.jsx                   # Root — Landing, background video, main layout
├── index.css                 # Tailwind v4 theme, all window CSS, mobile overrides
│
├── components/
│   ├── Navbar.jsx            # macOS menu bar with live clock, nav links, mobile hamburger
│   ├── Landing.jsx           # Lock‑screen overlay
│   ├── Welcome.jsx           # Hero text with GSAP font‑weight hover effect
│   ├── Dock.jsx              # Dock with GSAP magnification
│   ├── Home.jsx              # Desktop folder icons (draggable via GSAP)
│   ├── WindowControls.jsx    # Traffic‑light buttons
│
├── windows/
│   ├── Terminal.jsx, Safari.jsx, Finder.jsx, Photos.jsx
│   ├── Contact.jsx, Resume.jsx, TxtFile.jsx, ImgFile.jsx
│
├── hoc/
│   └── WindowWrapper.jsx     # HOC — GSAP animations, drag, focus, resize, maximize
│
├── store/
│   ├── window.js             # Zustand — window lifecycle
│   └── location.js           # Zustand — Finder navigation
│
└── constants/
    └── index.js              # All content: projects, dock, tech stack, socials, gallery, Finder tree
```

---

## Responsive Strategy

| Viewport | Behavior |
|---|---|
| **Desktop** (≥640px) | Full macOS experience — drag, resize, dock magnification, desktop icons, all layouts |
| **Mobile** (<640px) | Windows go full‑screen (5px inset, 0px when maximized). Drag/resize disabled. GSAP maximize skipped — CSS `.maximized` class handles it. Desktop icons hidden. Nav links become hamburger sheet. Gallery → 2 columns. Contact stacks. Finder sidebar → horizontal row. Safari search hidden. |
