"use client";

import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setQuery } from "@/lib/redux/querySlice";

// Define SpeechRecognition types for TypeScript
interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
	length: number;
	item(index: number): SpeechRecognitionResult;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
	length: number;
	item(index: number): SpeechRecognitionAlternative;
	[index: number]: SpeechRecognitionAlternative;
	isFinal: boolean;
}

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
	error: string;
	message?: string;
}

interface ISpeechRecognition extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	onresult: ((event: SpeechRecognitionEvent) => void) | null;
	onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
	onend: (() => void) | null;
	start(): void;
	stop(): void;
}

declare global {
	interface Window {
		SpeechRecognition?: new () => ISpeechRecognition;
		webkitSpeechRecognition?: new () => ISpeechRecognition;
	}
}

export default function MicButton() {
	const dispatch = useAppDispatch();
	const [isListening, setIsListening] = useState(false);
	const [recognition, setRecognition] = useState<ISpeechRecognition | null>(
		null
	);
	const [isSupported, setIsSupported] = useState(true);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const SpeechRecognition =
				window.SpeechRecognition || window.webkitSpeechRecognition;

			if (SpeechRecognition) {
				const recognitionInstance = new SpeechRecognition();
				recognitionInstance.continuous = false;
				recognitionInstance.interimResults = false;
				recognitionInstance.lang = "en-US";

				recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
					const transcript = event.results[0][0].transcript;
					dispatch(setQuery(transcript));
					setIsListening(false);
				};

				recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
					console.error("Speech recognition error:", event.error);
					setIsListening(false);
				};

				recognitionInstance.onend = () => {
					setIsListening(false);
				};

				setRecognition(recognitionInstance);
			} else {
				setIsSupported(false);
			}
		}
	}, [dispatch]);

	const toggleListening = () => {
		if (!recognition) return;

		if (isListening) {
			recognition.stop();
			setIsListening(false);
		} else {
			try {
				recognition.start();
				setIsListening(true);
			} catch (error) {
				console.error("Error starting speech recognition:", error);
			}
		}
	};

	if (!isSupported) {
		return null; // Hide button if not supported
	}

	return (
		<button
			onClick={toggleListening}
			disabled={!recognition}
			className={`p-2 rounded-lg transition-all ${
				isListening
					? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
					: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
			} disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed`}
			title={isListening ? "Listening... (click to stop)" : "Click to speak"}>
			{isListening ? (
				<div className="relative w-5 h-5 flex items-center justify-center">
					<span className="absolute inline-block w-2 h-2 bg-white rounded-full animate-ping" />
					<span className="relative inline-block w-2 h-2 bg-white rounded-full" />
				</div>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
					/>
				</svg>
			)}
		</button>
	);
}
