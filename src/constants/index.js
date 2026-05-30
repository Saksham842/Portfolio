const navLinks = [
	{
		id: 1,
		name: "Projects",
		type: "finder",
	},
	{
		id: 3,
		name: "Contact",
		type: "contact",
	},
	{
		id: 4,
		name: "Resume",
		type: "resume",
	},
];

const navIcons = [
	{
		id: 1,
		img: "/icons/wifi.svg",
	},
	{
		id: 2,
		img: "/icons/search.svg",
	},
	{
		id: 3,
		img: "/icons/user.svg",
	},
	{
		id: 4,
		img: "/icons/mode.svg",
	},
];

const dockApps = [
	{
		id: "finder",
		name: "Portfolio",
		icon: "finder.png",
		canOpen: true,
	},
	{
		id: "safari",
		name: "Articles",
		icon: "safari.png",
		canOpen: true,
	},
	{
		id: "photos",
		name: "Gallery",
		icon: "photos.png",
		canOpen: true,
	},
	{
		id: "contact",
		name: "Contact",
		icon: "contact.png",
		canOpen: true,
	},
	{
		id: "terminal",
		name: "Skills",
		icon: "terminal.png",
		canOpen: true,
	},
	{
		id: "trash",
		name: "Archive",
		icon: "trash.png",
		canOpen: false,
	},
];

const blogPosts = [
	{
		id: 1,
		date: "May 1, 2026",
		title:
			"Building a GitHub App with Node.js: Automating Pull Request Reviews",
		image: "/images/blog1.png",
		link: "https://github.com/",
	},
	{
		id: 2,
		date: "Apr 15, 2026",
		title:
			"Movie Recommendation Systems: TF-IDF and Cosine Similarity Explained",
		image: "/images/blog2.png",
		link: "https://github.com/",
	},
	{
		id: 3,
		date: "Mar 20, 2026",
		title: "Full-Stack Development with FastAPI and React: A Practical Guide",
		image: "/images/blog3.png",
		link: "https://github.com/",
	},
];

const techStack = [
	{
		category: "Frontend",
		items: ["React.js", "Next.js", "TypeScript"],
	},
	{
		category: "Styling",
		items: ["Tailwind CSS", "GSAP", "Framer Motion"],
	},
	{
		category: "Backend",
		items: ["Node.js", "Express.js", "FastAPI"],
	},
	{
		category: "ML / AI",
		items: ["Scikit-Learn", "Pandas", "NumPy"],
	},
	{
		category: "Database",
		items: ["PostgreSQL", "MySQL", "MongoDB"],
	},
	{
		category: "Dev Tools",
		items: ["Git", "GitHub", "Vercel", "Postman"],
	},
];

const socials = [
	{
		id: 1,
		text: "Github",
		icon: "/icons/github.svg",
		bg: "#f4656b",
		link: "https://github.com/",
	},
	{
		id: 2,
		text: "LinkedIn",
		icon: "/icons/linkedin.svg",
		bg: "#05b6f6",
		link: "https://linkedin.com/",
	},
	{
		id: 3,
		text: "Email",
		icon: "/icons/twitter.svg",
		bg: "#ff866b",
		link: "mailto:sakshamhans842@gmail.com",
	},
];

const photosLinks = [
	{
		id: 1,
		icon: "/icons/gicon1.svg",
		title: "Library",
	},
	{
		id: 2,
		icon: "/icons/gicon2.svg",
		title: "Memories",
	},
	{
		id: 3,
		icon: "/icons/file.svg",
		title: "Places",
	},
	{
		id: 4,
		icon: "/icons/gicon4.svg",
		title: "People",
	},
	{
		id: 5,
		icon: "/icons/gicon5.svg",
		title: "Favorites",
	},
];

const gallery = [
	{
		id: 1,
		img: "/images/gal1.png",
	},
	{
		id: 2,
		img: "/images/gal2.png",
	},
	{
		id: 3,
		img: "/images/gal3.png",
	},
	{
		id: 4,
		img: "/images/gal4.png",
	},
];

export {
	navLinks,
	navIcons,
	dockApps,
	blogPosts,
	techStack,
	socials,
	photosLinks,
	gallery,
};

const WORK_LOCATION = {
	id: 1,
	type: "work",
	name: "Work",
	icon: "/icons/work.svg",
	kind: "folder",
	children: [
		// ▶ Project 1
		{
			id: 5,
			name: "DeployGuard",
			icon: "/images/folder.png",
			kind: "folder",
			position: "top-10 left-5",
			windowPosition: "top-[5vh] left-5",
			children: [
				{
					id: 1,
					name: "DeployGuard Project.txt",
					icon: "/images/txt.png",
					kind: "file",
					fileType: "txt",
					position: "top-5 left-10",
					description: [
						"DeployGuard is a GitHub App that automatically analyzes pull requests and blocks merges when performance checks fail.",
						"Instead of manually reviewing every PR for performance issues, the app uses an NLP model trained on 200+ commit messages to classify pull requests automatically.",
						"Think of it like a smart gatekeeper for your codebase—catching performance regressions before they reach production.",
						"It's built with Node.js, Python, React, PostgreSQL, FastAPI, and Scikit-Learn, featuring JWT-based authentication and CI/CD-ready API proxy handling.",
					],
				},
				{
					id: 2,
					name: "deployguard.com",
					icon: "/images/safari.png",
					kind: "file",
					fileType: "url",
					href: "https://github.com/",
					position: "top-10 right-20",
				},
				{
					id: 4,
					name: "deployguard.png",
					icon: "/images/image.png",
					kind: "file",
					fileType: "img",
					position: "top-52 right-80",
					imageUrl: "/images/project-1.png",
				},
				{
					id: 5,
					name: "Design.fig",
					icon: "/images/plain.png",
					kind: "file",
					fileType: "fig",
					href: "https://github.com/",
					position: "top-60 right-20",
				},
			],
		},

		// ▶ Project 2
		{
			id: 6,
			name: "CineRecML",
			icon: "/images/folder.png",
			kind: "folder",
			position: "top-52 right-80",
			windowPosition: "top-[20vh] left-7",
			children: [
				{
					id: 1,
					name: "CineRecML Project.txt",
					icon: "/images/txt.png",
					kind: "file",
					fileType: "txt",
					position: "top-5 right-10",
					description: [
						"CineRecML is a movie recommendation system powered by TF-IDF vectorization and cosine similarity.",
						"Instead of scrolling endlessly through streaming platforms, you get instant, personalized movie recommendations based on what you've enjoyed.",
						"Think of it like having a film-savvy friend who always knows exactly what to suggest next.",
						"It's built with Python, FastAPI, React, and Scikit-Learn, with TMDB API integration for posters and cached similarity matrices for blazing-fast responses.",
					],
				},
				{
					id: 2,
					name: "cinerecml.com",
					icon: "/images/safari.png",
					kind: "file",
					fileType: "url",
					href: "https://github.com/",
					position: "top-20 left-20",
				},
				{
					id: 4,
					name: "cinerecml.png",
					icon: "/images/image.png",
					kind: "file",
					fileType: "img",
					position: "top-52 left-80",
					imageUrl: "/images/project-2.png",
				},
				{
					id: 5,
					name: "Design.fig",
					icon: "/images/plain.png",
					kind: "file",
					fileType: "fig",
					href: "https://github.com/",
					position: "top-60 left-5",
				},
			],
		},

		// ▶ Project 3
		{
			id: 7,
			name: "IEEE RAMP 2027 Website",
			icon: "/images/folder.png",
			kind: "folder",
			position: "top-10 left-80",
			windowPosition: "top-[33vh] left-7",
			children: [
				{
					id: 1,
					name: "IEEE RAMP 2027 Project.txt",
					icon: "/images/txt.png",
					kind: "file",
					fileType: "txt",
					position: "top-5 left-10",
					description: [
						"The IEEE RAMP 2027 Conference Website is the official platform for researchers and industry professionals attending the conference at ABV-IIITM Gwalior.",
						"Instead of a static page, it's a fully responsive platform where attendees can explore conference tracks, speaker profiles, registration details, and event updates.",
						"Think of it like the digital front door for an international IEEE conference—professional, informative, and always up to date.",
						"It's built with Next.js, TypeScript, and Tailwind CSS, ensuring a modern, performance-optimized experience across all devices.",
					],
				},
				{
					id: 2,
					name: "ieee-ramp-2027.com",
					icon: "/images/safari.png",
					kind: "file",
					fileType: "url",
					href: "https://github.com/",
					position: "top-10 right-20",
				},
				{
					id: 4,
					name: "ieee-ramp-2027.png",
					icon: "/images/image.png",
					kind: "file",
					fileType: "img",
					position: "top-52 right-80",
					imageUrl: "/images/project-3.png",
				},
				{
					id: 5,
					name: "Design.fig",
					icon: "/images/plain.png",
					kind: "file",
					fileType: "fig",
					href: "https://github.com/",
					position: "top-60 right-20",
				},
			],
		},
	],
};

const ABOUT_LOCATION = {
	id: 2,
	type: "about",
	name: "About me",
	icon: "/icons/info.svg",
	kind: "folder",
	children: [
		{
			id: 1,
			name: "me.png",
			icon: "/images/image.png",
			kind: "file",
			fileType: "img",
			position: "top-10 left-5",
			imageUrl: "/images/saksham.jpg",
		},
		{
			id: 2,
			name: "casual-me.png",
			icon: "/images/image.png",
			kind: "file",
			fileType: "img",
			position: "top-28 right-72",
			imageUrl: "/images/saksham-2.jpg",
		},
		{
			id: 3,
			name: "conference-me.png",
			icon: "/images/image.png",
			kind: "file",
			fileType: "img",
			position: "top-52 left-80",
			imageUrl: "/images/saksham-3.jpeg",
		},
		{
			id: 4,
			name: "about-me.txt",
			icon: "/images/txt.png",
			kind: "file",
			fileType: "txt",
			position: "top-60 left-5",
			subtitle: "Meet the Developer Behind the Code",
			image: "/images/saksham.jpg",
			description: [
				"Hey! I'm Saksham 👋, a CS undergrad at ABV-IIITM Gwalior with a passion for Full-Stack development and Machine Learning.",
				"I specialize in React, Node.js, FastAPI, and Python—and I love building things that are fast, intelligent, and actually useful.",
				"I'm big on clean architecture, scalable backends, and ML systems that solve real problems without the fluff.",
				"Outside of coding, you'll find me grinding LeetCode at odd hours, coordinating IEEE events, or convincing myself that one more side project is definitely a good idea 😅",
			],
		},
	],
};

const RESUME_LOCATION = {
	id: 3,
	type: "resume",
	name: "Resume",
	icon: "/icons/file.svg",
	kind: "folder",
	children: [
		{
			id: 1,
			name: "Resume.pdf",
			icon: "/images/pdf.png",
			kind: "file",
			fileType: "pdf",
			// href: "/your/resume/path.pdf",
		},
	],
};

const TRASH_LOCATION = {
	id: 4,
	type: "trash",
	name: "Trash",
	icon: "/icons/trash.svg",
	kind: "folder",
	children: [
		{
			id: 1,
			name: "trash1.png",
			icon: "/images/image.png",
			kind: "file",
			fileType: "img",
			position: "top-10 left-10",
			imageUrl: "/images/trash-1.png",
		},
		{
			id: 2,
			name: "trash2.png",
			icon: "/images/image.png",
			kind: "file",
			fileType: "img",
			position: "top-40 left-80",
			imageUrl: "/images/trash-2.png",
		},
	],
};

export const locations = {
	work: WORK_LOCATION,
	about: ABOUT_LOCATION,
	resume: RESUME_LOCATION,
	trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
	finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
