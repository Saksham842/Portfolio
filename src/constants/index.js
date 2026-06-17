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
		date: "Feb 2026",
		title:
			"Goldman Sachs Hackerrank Experience – GSIH'26",
		image: "/images/blog2.png",
		link: "https://www.linkedin.com/posts/saksham-hans-0a4564323_goldmansachs-hackerrank-gsih2026-share-7465499387214016512-Bo0f/",
	},
	{
		id: 2,
		date: "Mar 2026",
		title:
			"DeployGuard – AI Performance Gate",
		image: "/images/blog3.png",
		link: "https://www.linkedin.com/posts/saksham-hans-0a4564323_buildinpublic-github-devtools-ugcPost-7471907207110868992-rfan/",
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
		credential: "Saksham842",
		icon: "/icons/github.svg",
		bg: "#f4656b",
		link: "https://github.com/Saksham842",
	},
	{
		id: 2,
		text: "LinkedIn",
		credential: "saksham-hans",
		icon: "/icons/linkedin.svg",
		bg: "#05b6f6",
		link: "https://www.linkedin.com/in/saksham-hans-0a4564323",
	},
	{
		id: 3,
		text: "Email",
		credential: "sakshamhans842@gmail.com",
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
		img: "/images/me.png",
	},
	{
		id: 2,
		img: "/images/me1.png",
	},
	{
		id: 3,
		img: "/images/me3.jpg",
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
			position: "top-5 left-5",
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
						"DeployGuard is an AI-powered GitHub App that prevents performance regressions from reaching production by automatically analyzing pull requests and enforcing configurable performance quality gates.",
						"The platform detects bundle size bloat, dependency-related performance risks, and other regression indicators before code is merged, integrating directly into GitHub Checks and developer workflows.",
						"The system combines a hybrid machine learning pipeline with LLM-powered analysis to identify likely regression causes and generate actionable recommendations.",
						"Commit classifications are performed using a custom NLP model trained on 200+ commit messages, with intelligent fallback to large language models for ambiguous cases, balancing accuracy, latency, and operational cost.",
						"Built as a distributed microservice architecture, DeployGuard leverages GitHub Actions for build-time metric collection, an Express.js backend for webhook orchestration and repository management, a FastAPI-based AI service for classification and analysis, and a React dashboard for historical performance tracking and threshold configuration.",
						"The platform includes GitHub OAuth authentication, PostgreSQL-backed persistence, automated CI/CD integration, baseline performance tracking, and real-time repository analytics.",
						"Developed using Node.js, React, FastAPI, Python, PostgreSQL, Scikit-Learn, Sentence Transformers, GitHub Apps, and Groq LLMs, DeployGuard demonstrates full-stack software engineering, machine learning integration, scalable system design, and developer tooling automation.",
					],
				},
				{
					id: 2,
					name: "deployguard.com",
					icon: "/images/safari.png",
					kind: "file",
					fileType: "url",
					href: "https://deploy-guard-web.vercel.app",
					position: "top-5 right-20",
				},
				{
					id: 3,
					name: "github.com",
					icon: "/images/plain.png",
					kind: "file",
					fileType: "url",
					href: "https://github.com/Saksham842/Deploy-Guard",
					position: "top-36 left-10",
				},
				{
					id: 4,
					name: "deployguard.png",
					icon: "/images/image.png",
					kind: "file",
					fileType: "img",
					position: "top-36 right-20",
					imageUrl: "/images/deploy-guard.png",
				},
				],
		},

		// ▶ Project 2
		{
			id: 6,
			name: "CineRecML",
			icon: "/images/folder.png",
			kind: "folder",
			position: "top-36 left-5",
			windowPosition: "top-[20vh] left-7",
			children: [
				{
					id: 1,
					name: "CineRecML Project.txt",
					icon: "/images/txt.png",
					kind: "file",
					fileType: "txt",
					position: "top-5 left-10",
					description: [
						"CineRecML is an AI-powered movie recommendation engine that leverages Natural Language Processing (NLP) to analyze the cinematic characteristics of over 5,000 films and deliver highly relevant content-based recommendations.",
						"Using TF-IDF vectorization and cosine similarity, the system transforms movie metadata—including plot summaries, cast information, crew details, and keywords—into high-dimensional feature vectors, enabling sub-20ms recommendation inference.",
						"The platform follows a decoupled full-stack architecture with a FastAPI-powered machine learning backend and a React-based frontend featuring interactive visualizations and recommendation explainability.",
						"To optimize performance, similarity matrices are precomputed and serialized, allowing real-time recommendation retrieval with minimal latency. Additional engineering challenges solved include cloud deployment across Vercel and Render, cold-start handling, API routing, CORS management, and optimized media delivery.",
						"Built with React, FastAPI, Scikit-Learn, Pandas, NumPy, Tailwind CSS, Framer Motion, and Recharts, CineRecML demonstrates end-to-end machine learning engineering, from data preprocessing and feature extraction to scalable deployment and user-centric visualization of recommendation insights.",
					],
				},
				{
					id: 2,
					name: "cinerecml.com",
					icon: "/images/safari.png",
					kind: "file",
					fileType: "url",
					href: "https://movie-recommendor-ml.vercel.app/",
					position: "top-5 right-20",
				},
				{
					id: 3,
					name: "github.com",
					icon: "/images/plain.png",
					kind: "file",
					fileType: "url",
					href: "https://github.com/Saksham842/Movie-Recommendor-ML",
					position: "top-36 left-10",
				},
				{
					id: 4,
					name: "cinerecml.png",
					icon: "/images/image.png",
					kind: "file",
					fileType: "img",
					position: "top-36 right-20",
					imageUrl: "/images/cineRecMl.png",
				},
			],
		},

		// ▶ Project 3
		{
			id: 7,
			name: "LeakyBucket",
			icon: "/images/folder.png",
			kind: "folder",
			position: "top-5 left-72",
			windowPosition: "top-[33vh] left-7",
			children: [
				{
					id: 1,
					name: "LeakyBucket Project.txt",
					icon: "/images/txt.png",
					kind: "file",
					fileType: "txt",
					position: "top-5 left-10",
					description: [
						"LeakyBucket is a real-time network traffic simulation platform that visualizes the behavior of the Leaky Bucket traffic shaping algorithm through immersive 3D packet animations and live performance analytics.",
						"The application enables users to dynamically adjust network parameters such as packet inflow rate, leak rate, and buffer capacity while observing their impact on congestion, packet loss, throughput, and queuing delay in real time.",
						"Built with React, Vite, Three.js, and Recharts, the simulator combines high-fidelity 3D visualization with an analytics dashboard that provides actionable insights into network behavior.",
						"The simulation engine is optimized for smooth 60 FPS execution using efficient state management techniques, allowing thousands of packet state transitions to be processed without impacting UI responsiveness.",
						"The platform features real-time latency estimation, session-wide traffic analytics, packet drop monitoring, peak load tracking, and interactive visual feedback to help users understand traffic shaping concepts intuitively.",
						"By transforming an abstract networking algorithm into a highly interactive and visually engaging experience, LeakyBucket demonstrates expertise in frontend engineering, real-time simulations, performance optimization, data visualization, and computer networking fundamentals.",
					],
				},
				{
					id: 2,
					name: "leakybucket.com",
					icon: "/images/safari.png",
					kind: "file",
					fileType: "url",
					href: "https://leaky-bucket-algorithm-simulator-eta.vercel.app/",
					position: "top-5 right-20",
				},
				{
					id: 3,
					name: "github.com",
					icon: "/images/plain.png",
					kind: "file",
					fileType: "url",
					href: "https://github.com/Saksham842/Leaky-Bucket-Algorithm-Simulator",
					position: "top-36 left-10",
				},
				{
					id: 4,
					name: "lkbs.png",
					icon: "/images/image.png",
					kind: "file",
					fileType: "img",
					position: "top-36 right-20",
					imageUrl: "/images/lkbs.png",
				},
				],
		},

		// ▶ Project 4
		{
			id: 8,
			name: "CodeMentor AI",
			icon: "/images/folder.png",
			kind: "folder",
			position: "top-67 left-5",
			windowPosition: "top-[60vh] left-7",
			children: [
				{
					id: 1,
					name: "CodeMentor AI Project.txt",
					icon: "/images/txt.png",
					kind: "file",
					fileType: "txt",
					position: "top-5 left-10",
					description: [
						"CodeMentor AI is an AI-powered code intelligence platform that transforms complex software repositories into searchable, explainable, and actionable knowledge.",
						"Developers can upload a ZIP archive or connect a GitHub repository to receive comprehensive insights, including architecture analysis, security audits, complexity reports, contributor analytics, AI-powered code reviews, interview simulations, and context-aware codebase chat.",
						"The platform combines static code analysis, project structure extraction, and large language model reasoning to create a unified understanding of an entire codebase.",
						"Rather than simply answering questions about individual files, CodeMentor AI builds project-wide context to generate architecture diagrams, identify technical debt, surface security vulnerabilities, explain design decisions, and provide tailored onboarding paths for new contributors.",
						"Built with React, Vite, Express.js, and Groq-powered LLMs, the system features a modular dashboard architecture with semantic code search, AI-generated documentation, ATS-optimized resume generation, multi-perspective code reviews, and interactive interview simulations using configurable AI personas.",
						"The platform also includes project evolution tracking, complexity hotspot detection, and security gap analysis to help developers understand, maintain, and improve large-scale codebases more effectively.",
						"Designed as a developer productivity and learning platform, CodeMentor AI demonstrates expertise in full-stack development, AI integration, software architecture analysis, developer tooling, knowledge retrieval systems, and scalable user experience design.",
					],
				},
				{
					id: 2,
					name: "img-and-link-coming-soon.txt",
					icon: "/images/txt.png",
					kind: "file",
					fileType: "txt",
					position: "top-5 right-20",
					description: [
						"Image and link coming soon.",
					],
				},
				{
					id: 3,
					name: "github.com",
					icon: "/images/plain.png",
					kind: "file",
					fileType: "url",
					href: "https://github.com/Saksham842/CodeMentor",
					position: "top-36 left-10",
				},
			],
		},

		// ▶ Project 5
		{
			id: 9,
			name: "Portfolio",
			icon: "/images/folder.png",
			kind: "folder",
			position: "top-36 left-72",
			windowPosition: "top-[5vh] right-10",
			children: [
				{
					id: 1,
					name: "Portfolio Project.txt",
					icon: "/images/txt.png",
					kind: "file",
					fileType: "txt",
					position: "top-5 left-10",
					description: [
						"This project is a macOS-inspired portfolio platform that recreates the desktop operating system experience within the browser through a fully interactive window management system.",
						"Users can navigate a virtual desktop featuring draggable windows, an animated application dock, a Finder-style file explorer, a PDF resume viewer, image galleries, terminal interfaces, and application-like navigation, delivering an immersive and highly engaging portfolio experience.",
						"Built with React, Vite, GSAP, Zustand, and Tailwind CSS, the application leverages a custom windowing architecture that supports dynamic window lifecycle management, z-index stacking, focus control, drag-and-drop interactions, and smooth animation orchestration.",
						"A centralized state management layer coordinates window states, Finder navigation, content rendering, and application interactions, enabling a desktop-like user experience entirely within the browser.",
						"The platform features reusable data-driven window components capable of rendering dynamic content such as project descriptions, image previews, documents, and portfolio assets without requiring separate implementations for each content type.",
						"Additional optimizations include responsive state updates, efficient rendering strategies, and GSAP-powered animations that maintain fluid interactions across complex UI workflows.",
						"By combining modern frontend engineering with desktop operating system design principles, the project demonstrates expertise in React architecture, state management, animation systems, component abstraction, user experience design, and interactive web application development.",
					],
				},
				{
					id: 2,
					name: "portfolio.com",
					icon: "/images/safari.png",
					kind: "file",
					fileType: "url",
					href: "https://portfolio-saksham842s-projects.vercel.app/",
					position: "top-5 right-20",
				},
				{
					id: 3,
					name: "github.com",
					icon: "/images/plain.png",
					kind: "file",
					fileType: "url",
					href: "https://github.com/Saksham842/Portfolio",
					position: "top-36 left-10",
				},
				{
					id: 4,
					name: "portfolio.png",
					icon: "/images/image.png",
					kind: "file",
					fileType: "img",
					position: "top-36 right-20",
					imageUrl: "/images/portfolio.png",
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
			imageUrl: "/images/me.png",
		},
		{
			id: 2,
			name: "me1.png",
			icon: "/images/image.png",
			kind: "file",
			fileType: "img",
			position: "top-28 right-72",
			imageUrl: "/images/me1.png",
		},
		{
			id: 3,
			name: "me3.jpg",
			icon: "/images/image.png",
			kind: "file",
			fileType: "img",
			position: "top-52 left-80",
			imageUrl: "/images/me3.jpg",
		},
		{
			id: 4,
			name: "about-me.txt",
			icon: "/images/txt.png",
			kind: "file",
			fileType: "txt",
			position: "top-60 left-5",
			description: [
				"Computer Science undergraduate at ABV-IIITM Gwalior with a strong academic record (CGPA 9.34/10) and a demonstrated passion for building intelligent software systems at the intersection of AI, machine learning, and software engineering.",
				"Skilled in designing and developing full-stack applications, developer platforms, and ML-powered products using Python, React, Node.js, FastAPI, PostgreSQL, and modern cloud deployment workflows.",
				"My work spans AI-assisted developer tooling, recommendation systems, code intelligence platforms, performance engineering, and data-driven applications.",
				"Notable projects include DeployGuard, an AI-powered GitHub App for automated performance regression detection and analysis, and CodeMentor AI, a comprehensive codebase intelligence platform featuring architecture analysis, security auditing, semantic search, interview simulation, and AI-powered project understanding.",
				"Through these projects, I have gained experience in machine learning pipelines, NLP, REST APIs, distributed application architecture, database systems, CI/CD automation, and large language model integration.",
				"Beyond technical development, I actively contribute to technical communities through IEEE, participate in hackathons and research-oriented programs, and continuously explore emerging areas such as LLMs, intelligent agents, developer infrastructure, and scalable software systems.",
				"I am particularly interested in opportunities that combine rigorous engineering with applied AI research to solve meaningful real-world problems.",
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
			name: "my_resume.pdf",
			icon: "/images/pdf.png",
			kind: "file",
			fileType: "pdf",
			href: "/files/my_resume.pdf",
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
	finder: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
	contact: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
	resume: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
	safari: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
	photos: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
	terminal: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
	txtfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
	imgfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
