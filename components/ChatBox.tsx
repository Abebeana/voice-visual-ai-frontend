'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setQuery, clearQuery, sendQuery } from '@/lib/redux/querySlice';

export default function ChatBox() {
  const dispatch = useAppDispatch();
  const { query, loading } = useAppSelector((state) => state.query);

  const handleSend = () => {
    if (query.trim()) {
      dispatch(sendQuery(query));
    }
  };

  const handleClear = () => {
    dispatch(clearQuery());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <textarea
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        onKeyDown={handleKeyDown}
        placeholder="Type your query here..."
        disabled={loading}
        className="w-full min-h-[120px] p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
        rows={4}
      />
      <div className="flex gap-3 mt-3">
        <button
          onClick={handleSend}
          disabled={loading || !query.trim()}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
        <button
          onClick={handleClear}
          disabled={loading}
          className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
