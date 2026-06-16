import { useRef, useEffect } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
	subtitle: { min: 100, max: 400, default: 100 },
	title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
	return [...text].map((char, i) => (
		<span
			key={i}
			className={className}
			style={{
				fontVariationSettings: `'wght' ${baseWeight}`,
			}}
		>
			{char === " " ? "\u00A0" : char}
		</span>
	));
};

const setupTextHover = (container, type) => {
	if (!container) return () => {};

	const letters = container.querySelectorAll("span");
	const { min, max, default: base } = FONT_WEIGHTS[type];

	const animateLetter = (letter, weight, duration = 0.25) => {
		return gsap.to(letter, {
			duration,
			ease: "power2.out",
			fontVariationSettings: `'wght' ${weight}`,
		});
	};

	const handleMouseMove = (e) => {
		const { left } = container.getBoundingClientRect();
		const mouseX = e.clientX - left;

		letters.forEach((letter) => {
			const { left: l, width: w } = letter.getBoundingClientRect();
			const distance = Math.abs(mouseX - (l - left + w / 2));
			const intensity = Math.exp(-(distance ** 2) / 20000);

			animateLetter(letter, min + (max - min) * intensity);
		});
	};

	const handleMouseLeave = () => {
		letters.forEach((letter) => animateLetter(letter, base, 0.3));
	};

	container.addEventListener("mousemove", handleMouseMove);
	container.addEventListener("mouseleave", handleMouseLeave);

	return () => {
		container.removeEventListener("mousemove", handleMouseMove);
		container.removeEventListener("mouseleave", handleMouseLeave);
	};
};

const Welcome = () => {
	const titleRef = useRef(null);
	const subtitleRef = useRef(null);

	useEffect(() => {
		const titleCleanup = setupTextHover(titleRef.current, "title");
		const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

		return () => {
			subtitleCleanup();
			titleCleanup();
		};
	}, []);

	return (
		<section id="welcome">
			<div className="hidden sm:block">
				<p ref={subtitleRef}>
					{renderText(
						"Hey, I'm Saksham! Welcome to my",
						"text-3xl font-georama",
						100,
					)}
				</p>
				<h1 ref={titleRef} className="mt-7">
					{renderText("portfolio", "text-9xl italic font-georama")}
				</h1>
			</div>

			<div className="sm:hidden flex flex-col items-center gap-4 text-center px-6">
				<p className="text-2xl font-georama font-light text-gray-300">Hey, I'm Saksham!</p>
				<h1 className="text-5xl italic font-georama font-bold text-white">portfolio</h1>
				<p className="text-sm text-gray-400 mt-4 max-w-xs">
					Tap the menu icon in the top-right to explore Projects, Contact, and Resume.
				</p>
			</div>
		</section>
	);
};

export default Welcome;
