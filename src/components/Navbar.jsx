import { navLinks, navIcons } from "#constants/index.js";
import dayjs from "dayjs";
import useWindowStore from "#store/window.js";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
	const { openWindow } = useWindowStore();
	const [time, setTime] = useState(() => dayjs());
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(dayjs());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const toggleDarkMode = () => {
		const isDark = document.documentElement.classList.toggle("dark");
		localStorage.setItem("theme", isDark ? "dark" : "light");
	};

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
			document.documentElement.classList.add("dark");
		}
	}, []);

	const handleNavClick = (type) => {
		openWindow(type);
		setMenuOpen(false);
	};

	return (
		<nav>
			<div>
				<img src="/images/logo.svg" alt="logo" />
				<p className="font-bold hidden sm:block">Saksham's Portfolio</p>

				<ul>
					{navLinks.map(({ id, name, type }) => (
						<li key={id} onClick={() => openWindow(type)} className="nav-item">
							<p>{name}</p>
						</li>
					))}
					<li onClick={toggleDarkMode} className="nav-item">
						<p>Theme</p>
					</li>
				</ul>
			</div>

			<div>
				<ul>
					{navIcons.filter(({ id }) => id !== 4).map(({ id, img }) => (
						<li key={id} className="nav-item">
							<img src={img} className="nav-icon" alt={`icon-${id}`} />
						</li>
					))}
				</ul>
			</div>

			<div className="flex items-center gap-2">
				<time>{time.format("ddd, MMM D, h:mm A")}</time>
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className="sm:hidden nav-item"
					aria-label="Toggle menu"
				>
					{menuOpen ? <X size={18} /> : <Menu size={18} />}
				</button>
			</div>

			{/* Mobile menu overlay */}
			{menuOpen && (
				<div className="fixed inset-0 z-50 sm:hidden">
					<div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
					<div className="absolute top-14 left-2 right-2 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
						{navLinks.map(({ id, name, type }) => (
							<button
								key={id}
								onClick={() => handleNavClick(type)}
								className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
							>
								{name}
							</button>
						))}
						<hr className="border-gray-200 dark:border-gray-700" />
						<button
							onClick={() => { toggleDarkMode(); setMenuOpen(false); }}
							className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						>
							Toggle Theme
						</button>
						<div className="px-3 pt-1 text-xs text-gray-500 dark:text-gray-400">
							{time.format("ddd, MMM D, h:mm A")}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
