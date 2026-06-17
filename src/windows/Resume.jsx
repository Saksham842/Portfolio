import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { Download } from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
	const [numPages, setNumPages] = useState(null);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	return (
		<>
			<div id="window-header">
				<WindowControls target="resume" />
				<h2>my_resume.pdf</h2>
				<a
					href="files/my_resume.pdf"
					download
					className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
					title="Download resume"
				>
					<Download className="icon" size={24} /> Download
				</a>
			</div>

			<div className="overflow-y-auto resume-container p-4 flex flex-col items-center select-text">
				<Document
					file="files/my_resume.pdf"
					onLoadSuccess={onDocumentLoadSuccess}
					loading={
						<div className="flex-center p-10 text-sm font-georama text-neutral-500">
							Loading PDF...
						</div>
					}
					error={
						<div className="flex-center p-10 text-sm font-georama text-red-500">
							Failed to load PDF.
						</div>
					}
				>
					{Array.from(new Array(numPages), (el, index) => (
						<Page
							key={`page_${index + 1}`}
							pageNumber={index + 1}
							width={600}
							className="shadow-lg mb-4 last:mb-0 rounded-sm overflow-hidden"
						/>
					))}
				</Document>
			</div>
		</>
	);
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
