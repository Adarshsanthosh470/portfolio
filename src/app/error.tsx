'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-neutral-400 mb-8 max-w-md">
        An error occurred while loading this page. Please try refreshing or going back.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-all"
      >
        Try again
      </button>
    </div>
  );
}
