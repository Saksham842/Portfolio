# 🖥️ macOS-Style Developer Portfolio

A stunning, interactive developer portfolio built to mimic the **macOS desktop experience** — complete with draggable windows, an animated dock, a fully functional Finder, PDF resume viewer, gallery, and more.

> Built with React + Vite + GSAP + Zustand + TailwindCSS v4

---

## ✨ Features

- 🪟 **Draggable Windows** — Every window is independently draggable and z-index aware, powered by GSAP Draggable
- 🚀 **Animated Window Open/Close** — Smooth scale + fade animations when windows open, via GSAP
- 🗂️ **Finder Window** — Navigate through project folders and files just like macOS Finder, with sidebar and content pane
- 📄 **PDF Resume Viewer** — Inline, multi-page PDF rendering using `react-pdf` with a download button
- 🖼️ **Photos Gallery** — Grid-based gallery with click-to-preview in a separate image viewer window
- 🌐 **Safari Window** — A stylized articles/blog browser with a full macOS-style toolbar
- 📞 **Contact Window** — Social links rendered as colourful cards
- 💻 **Terminal Window** — Displays tech stack in a styled terminal-style UI
- 🏠 **Desktop Home Icons** — Draggable folder icons on the desktop that open directly into Finder
- 🧭 **macOS Navbar** — Live clock, app menu links, and icon controls
- ⚓ **macOS Dock** — Animated dock with magnification effect on hover, toggling windows open/close

---

## 🗂️ Project Structure

```
src/
├── App.jsx                  # Root component, mounts all windows + layout
├── index.css                # Global styles, TailwindCSS v4 theme, all window CSS
│
├── components/
│   ├── Navbar.jsx           # macOS-style menu bar with live clock
│   ├── Welcome.jsx          # Animated variable-font hero text
│   ├── Dock.jsx             # macOS dock with hover magnification (GSAP)
│   ├── Home.jsx             # Desktop folder icons (draggable via GSAP)
│   ├── WindowControls.jsx   # Red/yellow/green traffic light buttons
│   └── index.js             # Barrel export
│
├── windows/
│   ├── Terminal.jsx         # Tech stack display in terminal style
│   ├── Safari.jsx           # Blog/articles browser with toolbar
│   ├── Finder.jsx           # File explorer with sidebar + folder navigation
│   ├── Photos.jsx           # Gallery grid — click image to open in viewer
│   ├── Contact.jsx          # Social links (GitHub, LinkedIn, Email)
│   ├── Resume.jsx           # Inline PDF viewer with download
│   ├── TxtFile.jsx          # Text/About viewer (opened from Finder)
│   ├── ImgFile.jsx          # Image preview viewer (opened from Finder/Photos)
│   └── index.js             # Barrel export
│
├── hoc/
│   └── WindowWrapper.jsx    # Higher-order component wrapping every window
│                            # Handles: GSAP open animation, dragging, z-index focus
│
├── store/
│   ├── window.js            # Zustand store — open/close/focus windows, z-index
│   └── location.js          # Zustand store — active Finder folder/location
│
└── constants/
    └── index.js             # All app data: nav links, dock apps, blog posts,
                             # tech stack, socials, gallery, Finder file tree
```

---

## 🏗️ Architecture

### Window System

Every window component is wrapped with the `WindowWrapper` HOC:

```
WindowWrapper(Component, windowKey)
```

This HOC:
- Reads `isOpen` and `zIndex` from the **Zustand window store**
- Plays a **GSAP open animation** (`scale 0.8 → 1`, `opacity 0 → 1`) on mount
- Attaches **GSAP Draggable** to let users move the window anywhere
- Calls `focusWindow(key)` on `mouseDown` to bring the window to the front
- Uses `useLayoutEffect` to instantly `display: none` when closed (no flash)

### State Management (Zustand)

**`useWindowStore`** — manages all window lifecycle:

| Action | Description |
|---|---|
| `openWindow(key, data?)` | Opens window, bumps z-index, optionally sets data payload |
| `closeWindow(key)` | Closes window, resets z-index |
| `focusWindow(key)` | Brings window to front by incrementing z-index |

**`useLocationStore`** — manages Finder navigation:

| Action | Description |
|---|---|
| `setActiveLocation(item)` | Sets the active folder/location in Finder |
| `resetActiveLocation()` | Resets to the default `Work` location |

### Data-Driven Windows

`TxtFile` and `ImgFile` windows are **generic viewers** — they read their content from the window store's `data` field. When `openWindow("txtfile", { name, description, ... })` is called (e.g. from Finder), the window renders whatever data was passed in.

This allows one component to display project descriptions, about-me text, or any other content.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | TailwindCSS v4 + Vanilla CSS |
| Animation | GSAP 3 (Draggable, useGSAP) |
| State | Zustand 5 + Immer |
| PDF Viewer | react-pdf + pdfjs-dist |
| Icons | lucide-react |
| Utilities | clsx, dayjs |
| Tooltips | react-tooltip |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Adding Your Content

All portfolio content lives in **`src/constants/index.js`**. Update these to personalize:

| Constant | What it controls |
|---|---|
| `navLinks` | Navbar menu items and which window they open |
| `dockApps` | Dock icons and their window keys |
| `blogPosts` | Safari/Articles window posts |
| `techStack` | Terminal window tech categories |
| `socials` | Contact window social links |
| `gallery` | Photos window gallery images |
| `WORK_LOCATION` | Finder → Work projects (folders + files) |
| `ABOUT_LOCATION` | Finder → About Me files |
| `RESUME_LOCATION` | Finder → Resume PDF |

Place your **resume PDF** at `public/files/resume.pdf`.

---

## 🪟 Window Keys Reference

Each window has a unique key used in the store:

| Key | Window |
|---|---|
| `terminal` | Tech Stack terminal |
| `safari` | Blog/Articles browser |
| `finder` | File explorer |
| `photos` | Gallery |
| `contact` | Contact links |
| `resume` | PDF resume viewer |
| `txtfile` | Text file viewer (generic) |
| `imgfile` | Image file viewer (generic) |

To open any window programmatically:
```js
const { openWindow } = useWindowStore();
openWindow("terminal"); // open with no data
openWindow("txtfile", { name: "note.txt", description: ["Hello!"] }); // open with data
```

---

## 📱 Responsive Notes

This portfolio is **designed for desktop/tablet screens**. A friendly notice is displayed on small screens (`< sm` breakpoint) and several UI elements (Dock, desktop icons) are hidden on mobile via Tailwind's responsive classes.

---

## 📄 License

MIT — feel free to use this as inspiration or a starting template for your own portfolio.

---

<p align="center">Made with ❤️ by <strong>Saksham Hans</strong></p>
