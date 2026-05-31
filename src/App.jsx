import { Navbar, Welcome, Dock, Home } from "#components";
import { Draggable } from "gsap/Draggable";
import { Terminal, Safari, Contact, Photos, Resume, Finder, TxtFile, ImgFile } from "#windows/index.js";
import gsap from "gsap";
gsap.registerPlugin(Draggable);

const App = () => {
	return (
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
	);
};

export default App;
