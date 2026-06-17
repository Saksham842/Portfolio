import { useRef, useEffect } from "react";
import { dockApps } from "#constants/index.js";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

const Dock = () => {
	const { openWindow, closeWindow, minimizeWindow, unminimizeWindow, focusWindow, windows } = useWindowStore();
	const dockRef = useRef(null);

	useEffect(() => {
		const dock = dockRef.current;
		if (!dock) return;

		const icons = dock.querySelectorAll(".dock-icon");

		const animateIcons = (mouseX) => {
			const { left } = dock.getBoundingClientRect();
			let closestIcon = null;
			let minDistance = Infinity;

			icons.forEach((icon) => {
				const { left: iconLeft, width } = icon.getBoundingClientRect();
				const center = iconLeft - left + width / 2;
				const distance = Math.abs(mouseX - center);

				if (distance < minDistance) {
					minDistance = distance;
					closestIcon = icon;
				}

				// Reset all icons first
				gsap.to(icon, {
					scale: 1,
					y: 0,
					duration: 0.2,
					ease: "power1.out",
				});
			});

			// Animate only the closest icon
			if (closestIcon && minDistance < 80) {
				gsap.to(closestIcon, {
					scale: 1.25,
					y: -15,
					duration: 0.2,
					ease: "power1.out",
				});
			}
		};
		const handleMouseMove = (e) => {
			const { left } = dock.getBoundingClientRect();
			animateIcons(e.clientX - left);
		};

		const resetIcons = () => {
			icons.forEach((icon) => {
				gsap.to(icon, {
					scale: 1,
					y: 0,
					duration: 0.3,
					ease: "power1.out",
				});
			});
		};

		dock.addEventListener("mousemove", handleMouseMove);
		dock.addEventListener("mouseleave", resetIcons);

		return () => {
			dock.removeEventListener("mousemove", handleMouseMove);
			dock.removeEventListener("mouseleave", resetIcons);
		};
	}, []);

	const toggleApp = (app) => {
		if (!app.canOpen) return;

		const window = windows[app.id];

		if (!window) {
			console.error(`Window not found for app: ${app.id}`);
			return;
		}

		if (!window.isOpen) {
			openWindow(app.id);
		} else if (window.isMinimized) {
			unminimizeWindow(app.id);
			focusWindow(app.id);
		} else {
			// Find active top-most window
			const openNonMinimizedWindows = Object.entries(windows).filter(
				([, w]) => w.isOpen && !w.isMinimized
			);
			const isFocused =
				openNonMinimizedWindows.length > 0 &&
				window.zIndex === Math.max(...openNonMinimizedWindows.map(([, w]) => w.zIndex));

			if (isFocused) {
				minimizeWindow(app.id);
			} else {
				focusWindow(app.id);
			}
		}
	};

	return (
		<section id="dock">
			<div ref={dockRef} className="dock-container">
				{dockApps.map(({ id, name, icon, canOpen }) => (
					<div key={id} className="relative flex justify-center">
						<button
							type="button"
							className="dock-icon"
							aria-label={name}
							data-tooltip-id="dock-tooltip"
							data-tooltip-content={name}
							data-tooltip-delay-show={150}
							disabled={!canOpen}
							onClick={() => toggleApp({ id, canOpen })}
						>
							<img
								src={`/images/${icon}`}
								alt={name}
								loading="lazy"
								className={canOpen ? "" : "opacity-60"}
							/>
						</button>
					</div>
				))}
				<Tooltip id="dock-tooltip" place="top" className="tooltip" />
			</div>
		</section>
	);
};

export default Dock;
