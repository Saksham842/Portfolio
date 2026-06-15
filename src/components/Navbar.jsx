import { navLinks, navIcons } from "#constants/index.js";
import dayjs from "dayjs";
import useWindowStore from "#store/window.js";
import { useState, useEffect } from "react";

const Navbar = () => {
	const { openWindow } = useWindowStore();
	const [time, setTime] = useState(() => dayjs());

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

	return (
		<nav>
			<div>
				<img src="/images/logo.svg" alt="logo" />
				<p className="font-bold">Saksham's Portfolio</p>

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

			<div>
				<time>{time.format("ddd, MMM D, h:mm A")}</time>
			</div>
		</nav>
	);
};

export default Navbar;
