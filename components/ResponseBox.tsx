'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import Image from 'next/image';

export default function ResponseBox() {
  const { response, loading, error } = useAppSelector((state) => state.query);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-6">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-blue-800 dark:text-blue-200 font-semibold">
              Processing your request...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-6">
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                Error
              </h3>
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-6">
        <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Your response will appear here. Type a query or use the microphone to start.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Response:
        </h3>
        
        {response.text && (
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {response.text}
            </p>
          </div>
        )}

        {response.image && (
          <div className="mt-4 border-t-2 border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Generated Image:
            </h4>
            <div className="relative w-full bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={`data:image/png;base64,${response.image}`}
                alt="Generated response"
                width={800}
                height={600}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
