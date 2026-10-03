# 🖥️ macOS‑Style Interactive Developer Portfolio

<p align="center">
  <a href="https://portfolio-saksham842s-projects.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Demo-Visit_Portfolio-007AFF?style=for-the-badge&logo=safari&logoColor=white" alt="Live Demo"/>
  </a>
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19"/>
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4"/>
  <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP"/>
  <img src="https://img.shields.io/badge/Zustand-5.0-443e38?style=for-the-badge" alt="Zustand 5"/>
</p>

<p align="center">
  <b>An interactive, desktop operating system experience recreated entirely in the browser.</b><br/>
  Featuring a lock-screen landing, draggable and resizable windows, macOS traffic-light controls, animated dock magnification, Finder file explorer, multi-page PDF resume reader, interactive terminal, and dark/light themes.
</p>

<p align="center">
  Built with ❤️ by <b><a href="https://github.com/Saksham842">Saksham Hans</a></b>
</p>

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
  - [Window System (`WindowWrapper` HOC)](#window-system-windowwrapper-hoc)
  - [Centralized State Management (Zustand)](#centralized-state-management-zustand)
  - [Data-Driven Dynamic Viewers](#data-driven-dynamic-viewers)
  - [GSAP Animation Pipeline](#gsap-animation-pipeline)
- [💼 Featured Projects Showcase](#-featured-projects-showcase)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [⚙️ Customization Guide](#️-customization-guide)
  - [Adding New Projects](#adding-new-projects)
  - [Updating Resume & Background Media](#updating-resume--background-media)
- [📱 Responsive Design Strategy](#-responsive-design-strategy)
- [📄 License](#-license)

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **🔒 Lock‑Screen Landing** | Authentic macOS lock screen featuring a live digital clock, date display, user avatar, and an animated video backdrop. Seamless GSAP slide-up transition triggered by any keypress, click, or mobile tap. |
| **🪟 Draggable & Resizable Windows** | Native desktop window simulation powered by **GSAP Draggable**. Constrained to window headers, dynamic z-index stacking on focus, smooth window maximization/restoration, and 3-axis resize handles. |
| **🚦 Traffic‑Light Controls** | Pixel-perfect macOS traffic-light buttons: **Close** (fade out & unmount), **Minimize** (scale-down animation into the dock), and **Maximize** (expand to viewport bounds with stored restore coordinates). |
| **🌊 Magnifying Dock** | Interactive dock with fluid GSAP hover magnification, tooltip labels, active app status indicators, and toggling logic (open, focus, minimize). |
| **📂 Finder File Explorer** | Full file explorer interface with sidebar navigation (`Work`, `About Me`, `Resume`, `Trash`), nested folders, draggable desktop & folder icons, and file launch associations (text, images, PDFs, URLs). |
| **📜 Multi‑Page PDF Resume Viewer** | Embedded PDF rendering via `react-pdf` and `pdfjs-dist`, complete with zoom controls, download action, and adaptive scrollbar management during minimize/maximize states. |
| **💻 Interactive Terminal** | Terminal-inspired skills showcase categorized into Frontend, Backend, ML/AI, Databases, Styling, and Dev Tools with interactive command-line aesthetics. |
| **🧭 Safari Blog Browser** | macOS Safari mockup showcasing featured engineering articles and technical case studies with navigation chrome and external article redirection. |
| **🖼️ Photos Gallery** | Apple Photos-inspired grid layout with responsive column scaling and a dedicated lightbox image preview viewer. |
| **📬 Contact Hub** | Quick-connect social cards for GitHub, LinkedIn, and direct email communication with custom accent gradients. |
| **🌓 Dark & Light Theme** | System theme auto-detection (`prefers-color-scheme`) paired with manual toggle persisted across browser sessions via `localStorage`. |
| **🔤 Kinetic Typography** | Hero welcome headline featuring interactive GSAP proximity font-weight morphing on mouse movement. |

---

## 🏗️ System Architecture

### Window System (`WindowWrapper` HOC)

Every window in the application is encapsulated by the higher-order component `WindowWrapper(Component, windowKey)`. This abstraction decouples presentation logic from desktop window behaviors:

```jsx
// src/hoc/WindowWrapper.jsx
const WindowWrapper = (WrappedComponent, windowKey) => {
  return function WindowComponent(props) {
    // Manages:
    // - GSAP Draggable binding to #window-header
    // - GSAP scale/opacity lifecycle on open & minimize
    // - Viewport maximization bounds calculation & restore
    // - Dynamic z-index layering on pointer interaction
    // - 3-point resize event listeners (right, bottom, corner)
  };
};
```

| Window Capability | Engineering Implementation |
|---|---|
| **Lifecycle Transitions** | GSAP timelines orchestrate entrance (`scale: 0.85 → 1`, `opacity: 0 → 1`) and minimization (`scale: 0.2`, `opacity: 0`). `useLayoutEffect` prevents flash of unstyled/unopened content. |
| **Focus & Stacking** | `onMouseDown` invokes `focusWindow(key)` within the Zustand store, elevating the active window to the highest current `z-index`. |
| **Header Dragging** | GSAP Draggable is restricted strictly to the window titlebar (`#window-header`), preventing conflict with scrollable window content. Automatically disabled on mobile viewports. |
| **Maximize / Restore** | Caches prior bounds (left, top, width, height) before expanding to full viewport. Double-clicking header toggles state. On mobile, falls back to CSS `.maximized` class. |
| **Edge Resizing** | Native `mousedown`/`mousemove` delta trackers on right, bottom, and bottom-right corner handles with a enforced minimum bounding box of 350×250px. |

---

### Centralized State Management (Zustand)

Global UI and window state are managed using lightweight **Zustand** stores with **Immer** middleware:

#### 1. `useWindowStore` (`src/store/window.js`)
Controls the lifecycle, z-indexes, and active states for all 8 window components:
- `openWindow(key, data?)`: Activates window, assigns incremented z-index, and loads optional file payload.
- `closeWindow(key)`: Deactivates window, resets z-index, and clears payload.
- `focusWindow(key)`: Elevates window to the foreground.
- `minimizeWindow(key)` / `unminimizeWindow(key)`: Sets minimization flags for dock animation.
- `toggleMaximizeWindow(key)`: Flips maximized flag and viewport coordinates.

#### 2. `useLocationStore` (`src/store/location.js`)
Manages Finder file tree navigation, tracking the active directory (`WORK_LOCATION`, `ABOUT_LOCATION`, `RESUME_LOCATION`, `TRASH_LOCATION`) and directory history.

---

### Data-Driven Dynamic Viewers

Rather than creating hardcoded windows for every file, `TxtFile.jsx` and `ImgFile.jsx` operate as **generic previewers**:
- Double-clicking a `.txt` file in Finder dispatches:
  ```js
  openWindow("txtfile", { 
    name: "DeployGuard Project.txt", 
    description: ["Project overview...", "Key technical decisions..."] 
  });
  ```
- The generic viewer consumes this data payload from `useWindowStore`, enabling an infinite number of files and project writeups with zero component boilerplate.

---

### GSAP Animation Pipeline

1. **Lock Screen Exit**: Keypress/tap triggers `gsap.to("#landing", { y: "-100%", duration: 1.2, ease: "power4.inOut" })`. Once complete, pointer events are disabled to pass interactions to the desktop.
2. **Dock Magnification**: Mouse position relative to dock items calculates distance transforms, scaling neighboring icons dynamically with smooth GSAP interpolation.
3. **Hero Variable Font Proximity**: Letter spans in the welcome headline calculate cursor Euclidean distance to dynamically interpolate `font-weight` (100 to 900) in real time.

---

## 💼 Featured Projects Showcase

The portfolio showcases full-stack and machine learning projects, accessible via Finder under `Work`:

1. **🚀 DeployGuard — AI-Powered Performance Gate**
   - *Stack*: React, Node.js, Express, FastAPI, Python, PostgreSQL, Scikit-Learn, Groq LLMs, GitHub Apps
   - GitHub App preventing production regressions by automatically analyzing pull request bundle sizes and dependencies via hybrid NLP & LLM pipelines.
   - [Live Demo](https://deploy-guard-web.vercel.app) &bull; [GitHub](https://github.com/Saksham842/Deploy-Guard)

2. **🎬 CineRecML — NLP Movie Recommendation Engine**
   - *Stack*: React, FastAPI, Scikit-Learn, Pandas, NumPy, Tailwind CSS, Recharts
   - Content-based recommendation platform analyzing 5,000+ films using TF-IDF vectorization and cosine similarity with sub-20ms inference latency.
   - [Live Demo](https://movie-recommendor-ml.vercel.app/) &bull; [GitHub](https://github.com/Saksham842/Movie-Recommendor-ML)

3. **🌊 LeakyBucket — 3D Real-Time Traffic Simulator**
   - *Stack*: React, Vite, Three.js, Recharts, Tailwind CSS
   - Interactive 3D simulation of the Leaky Bucket traffic shaping algorithm with 60 FPS real-time packet rendering, buffer overflow metrics, and latency analytics.
   - [Live Demo](https://leaky-bucket-algorithm-simulator-eta.vercel.app/) &bull; [GitHub](https://github.com/Saksham842/Leaky-Bucket-Algorithm-Simulator)

4. **🧠 CodeMentor AI — Codebase Intelligence Platform**
   - *Stack*: React, Vite, Express.js, Groq LLMs
   - Repository comprehension platform providing automated architectural diagrams, security audit reports, code review simulations, and semantic code search.
   - [GitHub](https://github.com/Saksham842/CodeMentor)

5. **🖥️ macOS-Style Portfolio — This Application**
   - *Stack*: React 19, Vite 8, GSAP 3, Zustand 5, Tailwind CSS v4, react-pdf
   - Desktop operating system experience in the browser with full window lifecycle management and responsive adaptation.
   - [Live Demo](https://portfolio-saksham842s-projects.vercel.app/) &bull; [GitHub](https://github.com/Saksham842/Portfolio)

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Core Framework** | React 19 (`react`, `react-dom`), Vite 8 |
| **Styling & Design System** | Tailwind CSS v4 (`@tailwindcss/vite`), Custom Vanilla CSS Tokens |
| **Animation & Motion** | GSAP 3 (`gsap`, `@gsap/react`, `Draggable`, `useGSAP`) |
| **State Management** | Zustand 5 (`zustand`, `immer`) |
| **Document Processing** | `react-pdf`, `pdfjs-dist` |
| **Icons & UI Elements** | `lucide-react`, `react-tooltip` |
| **Date & Utilities** | `dayjs`, `clsx` |
| **Code Quality** | ESLint 10, React Hooks ESLint Plugin |

---

## 📂 Project Structure

```
resume-portfolio/
├── public/
│   ├── files/
│   │   └── my_resume.pdf             # PDF document rendered in Resume window
│   ├── icons/                        # Menu bar, Finder, and app status SVG icons
│   └── images/
│       ├── bg-video-30s.mp4          # High-fidelity lock screen video backdrop
│       ├── bg-video-optimized.mp4    # Lightweight fallback background video
│       ├── finder.png, safari.png... # High-res macOS dock application icons
│       └── me.png, me1.png, me3.jpg  # Profile and gallery photography
│
├── src/
│   ├── App.jsx                       # Root layout, lock screen overlay, desktop workspace
│   ├── index.css                     # Tailwind v4 directives, glassmorphic styling, animations
│   ├── main.jsx                      # Application entry point
│   │
│   ├── components/                   # macOS Shell Components
│   │   ├── Navbar.jsx                # macOS menu bar, live clock, battery/wifi icons, mobile menu
│   │   ├── Landing.jsx               # Lock-screen view with time, avatar, and swipe-up trigger
│   │   ├── Welcome.jsx               # Hero headline with GSAP proximity variable-font weight
│   │   ├── Dock.jsx                  # Animated dock with physics magnification & window triggers
│   │   ├── Home.jsx                  # Draggable desktop folder icons
│   │   └── WindowControls.jsx        # macOS traffic-light buttons (close, minimize, maximize)
│   │
│   ├── windows/                      # Application Window Components
│   │   ├── Finder.jsx                # Multi-pane file browser (Work, About, Resume, Trash)
│   │   ├── Terminal.jsx              # Categorized tech stack & CLI skills viewer
│   │   ├── Safari.jsx                # Blog article showcase with web navigation bar
│   │   ├── Resume.jsx                # Integrated react-pdf document reader & downloader
│   │   ├── Photos.jsx                # Image gallery with responsive grid layout
│   │   ├── Contact.jsx               # Social cards with direct email/profile links
│   │   ├── TxtFile.jsx               # Reusable text viewer for project case studies
│   │   └── ImgFile.jsx               # Reusable modal image viewer
│   │
│   ├── hoc/
│   │   └── WindowWrapper.jsx         # Windowing engine: GSAP drag, maximize, resize, z-index
│   │
│   ├── store/
│   │   ├── window.js                 # Zustand store: window open/close/focus/minimize/maximize
│   │   └── location.js               # Zustand store: Finder active path and navigation history
│   │
│   └── constants/
│       └── index.js                  # Single source of truth for projects, skills, dock, socials
│
├── eslint.config.js                  # ESLint configuration
├── package.json                      # Dependencies and npm run scripts
└── vite.config.js                    # Vite bundler configuration with Tailwind plugin
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **pnpm** / **yarn**)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saksham842/Portfolio.git
   cd Portfolio
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## ⚙️ Customization Guide

### Adding New Projects

All portfolio data is centrally configured in **[`src/constants/index.js`](file:///src/constants/index.js)**. To add a new project to Finder:

1. Open `src/constants/index.js`.
2. Locate `WORK_LOCATION.children` and append a new project folder:
   ```javascript
   {
     id: 10,
     name: "My Awesome Project",
     icon: "/images/folder.png",
     kind: "folder",
     position: "top-5 left-72",
     children: [
       {
         id: 1,
         name: "Overview.txt",
         icon: "/images/txt.png",
         kind: "file",
         fileType: "txt",
         description: [
           "A brief summary of what this project achieves...",
           "Key architectural patterns and technologies used."
         ]
       },
       {
         id: 2,
         name: "Live Demo",
         icon: "/images/safari.png",
         kind: "file",
         fileType: "url",
         href: "https://myproject.com"
       },
       {
         id: 3,
         name: "GitHub",
         icon: "/images/plain.png",
         kind: "file",
         fileType: "url",
         href: "https://github.com/your-username/my-project"
       }
     ]
   }
   ```

### Updating Resume & Background Media

- **Resume PDF**: Replace `public/files/my_resume.pdf` with your updated resume file.
- **Lock Screen Video**: Replace `public/images/bg-video-30s.mp4` with any looping MP4/WebM video of your choice.
- **Profile / Gallery Photos**: Add your images to `public/images/` and update the `gallery` array in `src/constants/index.js`.

---

## 📱 Responsive Design Strategy

| Screen Size | Experience Adaptation |
|---|---|
| **Desktop (≥ 640px)** | Full macOS operating system simulation. Freeform window dragging via GSAP, 3-handle window resizing, dynamic dock magnification, draggable desktop icons, multi-window multitasking. |
| **Mobile (< 640px)** | Tailored mobile shell. Windows automatically scale to full screen (5px edge inset, 0px maximized). Dragging and resizing are disabled to prevent touch gesture conflicts. Desktop icons are neatly tucked away, and navigation collapses into an elegant mobile drawer. |

---

## 📄 License

This project is open-source and available under the **[MIT License](LICENSE)**. Feel free to fork, customize, and use this template as the foundation for your personal portfolio.
