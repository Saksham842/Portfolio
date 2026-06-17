# macOS-Style Developer Portfolio

An interactive developer portfolio that recreates the macOS desktop experience in the browser — draggable windows, animated dock, Finder file explorer, PDF resume viewer, gallery, terminal, and more.

Built with **React 19 + Vite + GSAP + Zustand + Tailwind CSS v4**.

---

## Features

- **Lock‑Screen Landing** — macOS‑style lock screen with live clock, date, name, and "Press any key to enter". Slides up with GSAP on keypress or click/tap. Background video auto‑plays and loops.
- **Draggable Windows** — Every window is independently draggable via GSAP Draggable (header‑only drag). Z‑index stacking on focus. Double‑click header to maximize.
- **Window Controls** — Red/yellow/green traffic‑light buttons: close, minimize (scales down), maximize (fills viewport). Smooth GSAP transitions for all states.
- **Animated Dock** — macOS‑style dock at the bottom with hover magnification (GSAP). Clicking a dock icon toggles the corresponding window (open / focus / minimize).
- **Finder File Explorer** — Browse projects, About Me, Resume, and Trash via a sidebar + content pane. Files and folders are draggable within Finder. Opens txt files, images, PDFs, and URLs in dedicated viewers.
- **Desktop Home Icons** — Folder icons on the desktop that open directly into Finder at the corresponding location. Draggable via GSAP.
- **PDF Resume Viewer** — Inline multi‑page PDF rendering with `react-pdf`. Download button. Scrollbar hidden when minimized, visible when maximized.
- **Photos Gallery** — Grid‑based image gallery with click‑to‑preview in a separate image viewer window. 5‑column grid on desktop, 2‑column on mobile.
- **Safari / Articles Window** — Styled blog/articles browser with search bar and macOS‑style toolbar.
- **Terminal / Skills Window** — Tech stack displayed in a terminal‑style UI with checkmarks and categories.
- **Contact Window** — Social links (GitHub, LinkedIn, Email) rendered as colorful cards with profile picture and description.
- **macOS Navbar** — Top menu bar with logo, navigation links, icons (WiFi, search, user), live clock (updating every second), and theme toggle.
- **Mobile Hamburger Menu** — On small screens, the nav links collapse into a hamburger button that opens a sheet overlay with Projects, Contact, Resume, and Theme toggle.
- **Dark / Light Theme** — Toggle via the Theme button. Persisted to `localStorage`. Respects system `prefers-color-scheme` on first load.
- **Resize Handles** — Windows can be resized from the right, bottom, and bottom‑right edges (disabled when maximized).
- **GSAP Text Animation** — Welcome text uses variable‑font‑weight GSAP hover effect (letters get bolder based on mouse proximity).
- **Responsive Design** — Mobile‑friendly with full‑screen windows (5px inset), hidden desktop‑only elements, and touch‑optimized interaction (drag disabled on mobile).

---

## Project Structure

```
src/
├── App.jsx                   # Root — mounts Landing, background video, main layout
├── index.css                 # Global styles, Tailwind v4 theme, all window CSS, mobile overrides
├── main.jsx                  # ReactDOM entry
│
├── components/
│   ├── Navbar.jsx            # macOS menu bar with live clock, nav links, mobile hamburger
│   ├── Landing.jsx           # Lock‑screen overlay (time, date, "Press any key to enter")
│   ├── Welcome.jsx           # Hero text with GSAP variable‑font hover effect
│   ├── Dock.jsx              # macOS dock with hover magnification (GSAP)
│   ├── Home.jsx              # Desktop folder icons (draggable via GSAP)
│   ├── WindowControls.jsx    # Red/yellow/green traffic‑light buttons
│   └── index.js              # Barrel export
│
├── windows/
│   ├── Terminal.jsx          # Tech stack in terminal style
│   ├── Safari.jsx            # Blog/articles browser with toolbar + search
│   ├── Finder.jsx            # File explorer — sidebar + content pane + draggable items
│   ├── Photos.jsx            # Gallery grid — click image for preview
│   ├── Contact.jsx           # Social links with profile card
│   ├── Resume.jsx            # Inline PDF viewer + download button
│   ├── TxtFile.jsx           # Generic text viewer (opened from Finder)
│   ├── ImgFile.jsx           # Generic image preview (opened from Finder/Photos)
│   └── index.js              # Barrel export
│
├── hoc/
│   └── WindowWrapper.jsx     # HOC wrapping every window — GSAP animations, drag, focus, resize, maximize
│
├── store/
│   ├── window.js             # Zustand store — open/close/minimize/maximize/focus windows, z-index
│   └── location.js           # Zustand store — active Finder folder/location
│
└── constants/
    └── index.js              # All app data: nav links, dock apps, blog posts, tech stack,
                              # socials, gallery, Finder file tree (WORK_LOCATION, ABOUT_LOCATION,
                              # RESUME_LOCATION, TRASH_LOCATION), WINDOW_CONFIG
```

---

## Architecture

### Window System

Every window is wrapped with the `WindowWrapper` HOC:

```jsx
WindowWrapper(Component, windowKey)
```

This HOC handles:

| Concern | Implementation |
|---|---|
| **Open/close animation** | GSAP `scale 0.85 → 1`, `opacity 0 → 1` on open; `scale → 0.2`, `opacity → 0` on minimize. Uses `useLayoutEffect` to set initial hidden state (`display: none`) when closed. |
| **Dragging** | GSAP Draggable on the `#window-header` element only. Disabled during maximize. Disabled entirely on mobile (<640px). |
| **Z‑index / focus** | `onMouseDown` calls `focusWindow(key)` from the Zustand store, bumping the window's z-index. |
| **Maximize** | Saves pre‑maximize bounds (position + size), then animates to full viewport. Restores on un‑maximize. On mobile, CSS `.maximized` class handles it without GSAP. |
| **Resize** | Three handles (right, bottom, bottom‑right) use `mousedown`/`mousemove` listeners. Minimum size: 350×250px. Hidden on mobile. |
| **Double‑click header** | Toggles maximize state. |

### State Management (Zustand)

**`useWindowStore`** — manages all window lifecycle:

| Action | Description |
|---|---|
| `openWindow(key, data?)` | Opens window, assigns next z-index, optionally sets data payload |
| `closeWindow(key)` | Closes window, resets z-index, clears data |
| `focusWindow(key)` | Brings window to front by incrementing z-index |
| `minimizeWindow(key)` | Sets `isMinimized = true` |
| `unminimizeWindow(key)` | Sets `isMinimized = false` |
| `toggleMaximizeWindow(key)` | Toggles `isMaximized` |

**`useLocationStore`** — manages Finder navigation:

| Action | Description |
|---|---|
| `setActiveLocation(location)` | Sets the active folder/location in Finder |
| `resetActiveLocation()` | Resets to default `Work` location |

### Data‑Driven Windows

`TxtFile` and `ImgFile` are **generic viewers** — they read their content from the window store's `data` field. When `openWindow("txtfile", { name, description, ... })` is called (e.g. from Finder), the window renders whatever data was passed in, allowing one component to display project descriptions, about‑me text, or any content.

### Animation Flow

1. Page loads → **Landing** (lock‑screen) covers viewport with `z-index: 9999`
2. User presses any key / clicks / taps → GSAP slides landing up `y: "-100%"` (1.2s, `power4.inOut`)
3. Landing gets `pointer-events: none` after animation completes
4. Main content is revealed: desktop icons, dock, navbar, welcome text
5. Windows open via GSAP scale+fade animation when triggered from dock, navbar, or desktop icons

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Animation | GSAP 3 (Draggable, useGSAP plugin) |
| State Management | Zustand 5 + Immer middleware |
| PDF Viewer | react-pdf + pdfjs-dist |
| Icons | lucide-react |
| Utilities | clsx, dayjs |
| Tooltips | react-tooltip |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/Saksham842/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for Production

```bash
npm run build
npm run preview
```

---

## Adding Your Content

All portfolio content lives in **`src/constants/index.js`**:

| Constant | What it controls |
|---|---|
| `navLinks` | Navbar menu items and which window they open |
| `dockApps` | Dock icons, names, and window keys |
| `blogPosts` | Safari / Articles window posts (title, date, image, link) |
| `techStack` | Terminal / Skills window categories |
| `socials` | Contact window cards (platform, credential, link, color) |
| `gallery` | Photos window gallery images |
| `photosLinks` | Photos sidebar items (Library, Memories, Places, etc.) |
| `WORK_LOCATION` | Finder → Work — folder structure with projects, files, and URLs |
| `ABOUT_LOCATION` | Finder → About Me — profile images and bio text |
| `RESUME_LOCATION` | Finder → Resume — PDF file reference |
| `TRASH_LOCATION` | Finder → Trash — miscellaneous images |

Place your **resume PDF** at `public/files/my_resume.pdf`.

Place **background videos** at `public/images/bg-video-30s.mp4` (primary) and `public/images/bg-video-optimized.mp4` (fallback).

---

## Window Keys Reference

| Key | Window | Description |
|---|---|---|
| `terminal` | Skills | Tech stack in terminal style |
| `safari` | Articles | Blog posts browser |
| `finder` | Portfolio | File explorer with sidebar |
| `photos` | Gallery | Image gallery grid |
| `contact` | Contact | Social links card |
| `resume` | Resume | PDF resume viewer |
| `txtfile` | Text Viewer | Generic text file viewer |
| `imgfile` | Image Viewer | Generic image preview |

Open any window programmatically:

```js
import { useWindowStore } from "#store/window.js";
openWindow("terminal");
openWindow("txtfile", { name: "note.txt", description: ["Hello!"] });
```

---

## Responsive Notes

- **Desktop** (≥640px): Full macOS‑like experience with draggable windows, dock magnification, desktop icons, resize handles.
- **Mobile** (<640px):
  - Windows become full‑screen with 5px inset (or 0px when maximized)
  - Drag, resize, and dock mousemove effects are disabled
  - GSAP maximize/unmaximize animation is skipped — CSS handles it via `.maximized` class
  - Desktop icons (`#home`) are hidden
  - Nav links collapse into a hamburger menu with sheet overlay
  - Gallery switches from 5‑column to 2‑column grid
  - Contact layout stacks vertically
  - Finder sidebar becomes a horizontal row
  - Safari search bar is hidden
  - A notice is displayed: "Move to a desktop site or PC for a better experience"

---

## License

MIT — feel free to use this as inspiration or a starting template for your own portfolio.
