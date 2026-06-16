import { Navbar, Welcome, Dock, Home, Landing } from "#components";
import { Draggable } from "gsap/Draggable";
import { Terminal, Safari, Contact, Photos, Resume, Finder, TxtFile, ImgFile } from "#windows/index.js";
import gsap from "gsap";
import { useState, useRef, useEffect, useCallback } from "react";
gsap.registerPlugin(Draggable);

const App = () => {
	const [dismissed, setDismissed] = useState(false);
	const landingRef = useRef(null);

	const handleDismiss = useCallback(() => {
		if (dismissed || !landingRef.current) return;
		setDismissed(true);
		gsap.to(landingRef.current, {
			y: "-100%",
			duration: 1.2,
			ease: "power4.inOut",
			onComplete: () => {
				if (landingRef.current) landingRef.current.style.pointerEvents = "none";
			},
		});
	}, [dismissed]);

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "F12" || e.key === "F5") return;
			handleDismiss();
		};
		const onClick = () => handleDismiss();
		const el = landingRef.current;
		window.addEventListener("keydown", onKey);
		el?.addEventListener("click", onClick);
		return () => {
			window.removeEventListener("keydown", onKey);
			el?.removeEventListener("click", onClick);
		};
	}, [handleDismiss]);

	return (
		<>
			{dismissed && (
				<video id="bg-video" autoPlay muted playsInline
					onTimeUpdate={(e) => { if (e.target.currentTime >= 30) e.target.currentTime = 0; }}
				>
					<source src="/images/bg-video.mp4" type="video/mp4" />
				</video>
			)}
			<Landing ref={landingRef} />
			<main>
				<Navbar />
				<Welcome />
				<Home />
				<Dock />

				{/* Windows */}
				<Terminal />
				<Safari />
				<Contact />
				<Photos />
				<Resume />
				<Finder />
				<TxtFile />
				<ImgFile />
			</main>
		</>
	);
};

export default App;
