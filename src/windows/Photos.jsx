import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { photosLinks, gallery } from "#constants/index.js";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";

const Photos = () => {
	const { openWindow } = useWindowStore();

	return (
		<>
			<div id="window-header">
				<WindowControls target="photos" />
				<h2>Gallery</h2>
			</div>

			<div className="flex flex-1 min-h-0 overflow-y-auto">
				{/* Gallery grid */}
				<div className="gallery flex-1">
					<ul>
						{gallery.map(({ id, img }) => (
							<li
								key={id}
								className="cursor-pointer"
								onClick={() =>
									openWindow("imgfile", {
										name: `gallery-${id}.png`,
										imageUrl: img,
									})
								}
							>
								<img src={img} alt={`gallery-${id}`} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;
