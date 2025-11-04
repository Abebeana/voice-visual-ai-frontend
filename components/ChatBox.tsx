"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setQuery, clearQuery, sendQuery } from "@/lib/redux/querySlice";
import MicButton from "./MicButton";

export default function ChatBox() {
	const dispatch = useAppDispatch();
	const { query, loading } = useAppSelector((state) => state.query);

	const handleSend = () => {
		if (query.trim()) {
			dispatch(sendQuery(query));
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className="w-full">
			{/* ChatGPT-style input container */}
			<div className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg hover:shadow-xl transition-shadow focus-within:border-gray-400 dark:focus-within:border-gray-500">
				<textarea
					value={query}
					onChange={(e) => dispatch(setQuery(e.target.value))}
					onKeyDown={handleKeyDown}
					placeholder="Message Voice Visual AI..."
					disabled={loading}
					className="w-full min-h-[56px] max-h-[200px] p-4 pr-24 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none"
					rows={1}
					style={{ 
						scrollbarWidth: 'thin',
						scrollbarColor: '#888 transparent'
					}}
				/>
				
				{/* Button container - positioned absolutely in bottom right */}
				<div className="absolute bottom-2 right-2 flex items-center gap-2">
					<MicButton />
					<button
						onClick={handleSend}
						disabled={loading || !query.trim()}
						className="p-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400 transition-colors disabled:cursor-not-allowed"
						title="Send message">
						{loading ? (
							<div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
						) : (
							<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
							</svg>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
