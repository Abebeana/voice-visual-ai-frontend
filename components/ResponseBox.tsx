"use client";

import { useEffect, useRef } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ResponseBox() {
	// get whole query state (older shapes may not include responses)
	const queryState = useAppSelector((state) => state.query as any);
	const { response, loading, error, responses } = queryState || {};
	const lastResponseRef = useRef<HTMLDivElement>(null);

	// prefer array of responses if available, otherwise fall back to single response
	const items: Array<{ text: string; image?: string; createdAt?: string }> =
		Array.isArray(responses) && responses.length > 0
			? responses
			: response
			? [response]
			: [];

	// auto-scroll to the latest response when items change
	useEffect(() => {
		if (items.length > 0 && lastResponseRef.current) {
			// Scroll the last response into view
			setTimeout(() => {
				lastResponseRef.current?.scrollIntoView({ 
					behavior: "smooth", 
					block: "end" 
				});
			}, 150);
		}
	}, [items.length]);


	if (loading) {
		return (
			<div className="w-full">
				<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
					<div className="flex items-center gap-3">
						<div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
						<p className="text-blue-800 dark:text-blue-200 text-sm">
							Processing your request...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full">
				<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6">
					<div className="flex items-start gap-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<div>
							<h3 className="font-semibold text-red-800 dark:text-red-200 mb-1 text-sm">
								Error
							</h3>
							<p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!items || items.length === 0) {
		return (
			<div className="w-full">
				<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8">
					<p className="text-gray-500 dark:text-gray-400 text-center text-sm">
						Your responses will appear here. Type a query or use the microphone to start.
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="w-full space-y-6">
				{items.map((resp, idx) => {
					const isLast = idx === items.length - 1;
					return (
						<div
							key={`${resp.createdAt ?? idx}-${idx}`}
							ref={isLast ? lastResponseRef : null}
							className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
							
							{resp.text && (
								<div className="px-6 py-5">
									<div className="flex items-start gap-3 mb-3">
										<div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
											<svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
										<div className="flex-1">
											<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
												Response {idx + 1}
											</h3>
											<p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
												{resp.text}
											</p>
										</div>
									</div>
								</div>
							)}

							{resp.image && (
								<div className="w-full bg-gray-50 dark:bg-gray-900">
									{(() => {
										const raw = resp.image ?? "";
										const cleaned = raw.replace(/\s+/g, "");
										const imageSrc = cleaned.startsWith("data:")
											? cleaned
											: `data:image/png;base64,${cleaned}`;
										return (
											<Zoom>
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={imageSrc}
													alt={`Generated visualization ${idx + 1}`}
													className="w-full h-auto max-w-full cursor-zoom-in"
												/>
											</Zoom>
										);
									})()}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}
