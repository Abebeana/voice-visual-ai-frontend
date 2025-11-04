import ChatBox from '@/components/ChatBox';
import MicButton from '@/components/MicButton';
import ResponseBox from '@/components/ResponseBox';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Voice Visual AI
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Ask questions using voice or text and get AI-powered responses with images
          </p>
        </header>

        <main className="space-y-6">
          <MicButton />
          <ChatBox />
          <ResponseBox />
        </main>

        <footer className="text-center mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by Next.js 14, Redux Toolkit & Flask Backend
          </p>
        </footer>
      </div>
    </div>
  );
}
