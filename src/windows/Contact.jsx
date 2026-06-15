import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import { socials } from "#constants/index.js";

const Contact = () => {
	return (
		<>
			<div id="window-header">
				<WindowControls target="contact" />
				<h2>Contact Me</h2>
			</div>

			<div className="p-5 space-y-5">
				<div className="flex gap-5">
					<img
						src="/images/profile.png"
						alt="Profile"
						className="w-32 h-32 rounded-full shrink-0"
					/>
					<div className="space-y-3">
						<h3>Let's Connect</h3>
						<p>Feel free to reach out for collaborations, opportunities, or discussions around software engineering, AI, and development projects. Always open to connecting with like-minded builders and creators.</p>
					</div>
				</div>

				<ul>
					{socials.map(({ id, bg, link, icon, text, credential }) => (
						<li key={id} style={{ backgroundColor: bg }}>
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								title={text}
								className="flex items-center gap-2"
							>
								<img src={icon} alt={text} className="size-5 shrink-0" />
								<div>
									<p className="text-xs opacity-70">{text}</p>
									<p className="font-medium text-sm">{credential}</p>
								</div>
							</a>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
