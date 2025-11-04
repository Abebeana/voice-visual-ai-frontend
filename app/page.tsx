import ChatBox from "@/components/ChatBox";
import MicButton from "@/components/MicButton";
import ResponseBox from "@/components/ResponseBox";

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-50 dark:from-gray-900 dark:to-gray-800 dark:bg-gradient-to-br flex flex-col">
			{/* Header */}
			{/* <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
				<div className="max-w-4xl mx-auto px-4 py-4">
					<h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
						Voice Visual AI
					</h1>
				</div>
			</header> */}

			{/* Scrollable responses area */}
			<main id="responsesArea" className="flex-1 overflow-auto">
				<div className="max-w-4xl mx-auto px-4 py-6">
					<ResponseBox />
				</div>
			</main>

			{/* Fixed input bar at bottom - ChatGPT style */}
			<div className="sticky bottom-0 bg-gradient-to-t from-gray-50 via-gray-50 dark:from-gray-900 dark:via-gray-900 pt-6 pb-8">
				<div className="max-w-3xl mx-auto px-4">
					<ChatBox />
				</div>
				{/* <div className="text-center mt-3">
					<p className="text-xs text-gray-500 dark:text-gray-400">
						Powered by Next.js 14, Redux Toolkit & Flask Backend
					</p>
				</div> */}
			</div>
		</div>
	);
}
