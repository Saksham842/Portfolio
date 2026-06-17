import useWindowStore from "#store/window.js";
import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
	const Wrapped = (props) => {
		const { focusWindow, toggleMaximizeWindow, windows } = useWindowStore();
		const { isOpen, zIndex, isMinimized, isMaximized } = windows[windowKey];
		const ref = useRef(null);
		const prevBounds = useRef(null);
		const dragInstanceRef = useRef(null);

		// Header-only dragging
		useGSAP(() => {
			const el = ref.current;
			if (!el) return;

			if (window.innerWidth < 640) return;

			const [instance] = Draggable.create(el, {
				trigger: el.querySelector("#window-header"),
				onPress: () => focusWindow(windowKey),
			});
			dragInstanceRef.current = instance;

			return () => instance.kill();
		}, []);

		// Double-click header to maximize
		const handleDblClick = (e) => {
			const header = ref.current?.querySelector("#window-header");
			const controls = ref.current?.querySelector("#window-controls");
			if (header && header.contains(e.target) && (!controls || !controls.contains(e.target))) {
				toggleMaximizeWindow(windowKey);
			}
		};

		// Window opening and minimize/unminimize animations
		useGSAP(() => {
			const el = ref.current;
			if (!el) return;

			if (!isOpen) {
				el.style.display = "none";
				return;
			}

			if (isMinimized) {
				gsap.to(el, {
					scale: 0.2,
					opacity: 0,
					duration: 0.25,
					ease: "power2.in",
					onComplete: () => {
						el.style.display = "none";
					},
				});
			} else {
				el.style.display = "block";
				if (windows[windowKey].isMaximized) {
					gsap.set(el, {
						x: 0, y: 0, left: 0, top: 0,
						width: window.innerWidth,
						height: window.innerHeight,
					});
				}
				gsap.to(el, {
					scale: 1,
					opacity: 1,
					duration: 0.25,
					ease: "power2.out",
				});
			}
		}, [isOpen, isMinimized]);

		// Maximization animations and constraints
		useGSAP(() => {
			const el = ref.current;
			if (!el) return;

			const instance = dragInstanceRef.current;

			// On mobile, let CSS handle maximize/unmaximize
			if (window.innerWidth < 640) return;

			if (isMaximized) {
				if (instance) instance.disable();

				// Save current layout and translate positions
				const rect = el.getBoundingClientRect();
				prevBounds.current = {
					left: el.style.left || `${rect.left}px`,
					top: el.style.top || `${rect.top}px`,
					width: el.style.width || `${rect.width}px`,
					height: el.style.height || `${rect.height}px`,
					x: gsap.getProperty(el, "x"),
					y: gsap.getProperty(el, "y"),
				};

				// Maximize to cover the entire view area
				gsap.to(el, {
					x: 0,
					y: 0,
					left: 0,
					top: 0,
					width: window.innerWidth,
					height: window.innerHeight,
					duration: 0.25,
					ease: "power2.out",
				});
			} else {
				if (instance) instance.enable();

				if (prevBounds.current) {
					// Restore size, position, and drag translation
					gsap.to(el, {
						x: prevBounds.current.x,
						y: prevBounds.current.y,
						left: prevBounds.current.left,
						top: prevBounds.current.top,
						width: prevBounds.current.width,
						height: prevBounds.current.height,
						duration: 0.25,
						ease: "power2.out",
					});
				}
			}
		}, [isMaximized]);

		// Resize event handling (only binds when NOT maximized)
		useGSAP(() => {
			const el = ref.current;
			if (!el || isMaximized) return;

			const rightHandle = el.querySelector(".resize-handle-r");
			const bottomHandle = el.querySelector(".resize-handle-b");
			const bottomRightHandle = el.querySelector(".resize-handle-br");

			if (!rightHandle || !bottomHandle || !bottomRightHandle) return;

			const startResize = (e, direction) => {
				e.preventDefault();
				e.stopPropagation();
				focusWindow(windowKey);

				const startX = e.clientX;
				const startY = e.clientY;
				const startWidth = el.offsetWidth;
				const startHeight = el.offsetHeight;

				const doResize = (moveEvent) => {
					if (direction === "right" || direction === "both") {
						const newWidth = Math.max(350, startWidth + (moveEvent.clientX - startX));
						el.style.width = `${newWidth}px`;
					}
					if (direction === "bottom" || direction === "both") {
						const newHeight = Math.max(250, startHeight + (moveEvent.clientY - startY));
						el.style.height = `${newHeight}px`;
					}
				};

				const stopResize = () => {
					window.removeEventListener("mousemove", doResize);
					window.removeEventListener("mouseup", stopResize);
				};

				window.addEventListener("mousemove", doResize);
				window.addEventListener("mouseup", stopResize);
			};

			const onMouseDownR = (e) => startResize(e, "right");
			const onMouseDownB = (e) => startResize(e, "bottom");
			const onMouseDownBR = (e) => startResize(e, "both");

			rightHandle.addEventListener("mousedown", onMouseDownR);
			bottomHandle.addEventListener("mousedown", onMouseDownB);
			bottomRightHandle.addEventListener("mousedown", onMouseDownBR);

			return () => {
				rightHandle.removeEventListener("mousedown", onMouseDownR);
				bottomHandle.removeEventListener("mousedown", onMouseDownB);
				bottomRightHandle.removeEventListener("mousedown", onMouseDownBR);
			};
		}, [isMaximized, isOpen]);

		useLayoutEffect(() => {
			const el = ref.current;
			if (!el) return;
			if (isOpen && !isMinimized) {
				el.style.display = "block";
				gsap.set(el, { scale: 0.85, opacity: 0 });
			}
		}, [isOpen]);

		return (
			<section
				id={windowKey}
				ref={ref}
				style={{ zIndex }}
				className={`absolute window-wrapper ${isMaximized ? "maximized" : ""}`}
				onMouseDown={() => focusWindow(windowKey)}
				onDoubleClick={handleDblClick}
			>
				<Component {...props} />
				{!isMaximized && (
					<>
						<div className="resize-handle-r" />
						<div className="resize-handle-b" />
						<div className="resize-handle-br" />
					</>
				)}
			</section>
		);
	};

	Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

	return Wrapped;
};

export default WindowWrapper;
