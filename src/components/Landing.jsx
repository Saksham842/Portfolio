import { useState, useEffect, forwardRef } from "react";
import dayjs from "dayjs";

const Landing = forwardRef((_, ref) => {
	const [time, setTime] = useState(() => dayjs());

	useEffect(() => {
		const timer = setInterval(() => setTime(dayjs()), 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div ref={ref} id="landing">
			<video id="landing-video" autoPlay muted playsInline
				onTimeUpdate={(e) => { if (e.target.currentTime >= 30) e.target.currentTime = 0; }}
			>
				<source src="/images/bg-video.mp4" type="video/mp4" />
			</video>
			<div className="landing-content">
				<time className="landing-time">{time.format("h:mm")}</time>
				<p className="landing-date">{time.format("dddd, MMMM D, YYYY")}</p>
				<p className="landing-name">Saksham's Portfolio</p>
				<p className="landing-prompt">Press any key to enter</p>
			</div>
		</div>
	);
});

export default Landing;
