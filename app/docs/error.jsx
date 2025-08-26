'use client';

import Link from 'next/link';
import React from 'react';

export default function DocsError({ error, reset }) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Docs error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Documentation Error
      </h1>
      <p className="text-xl mb-6">
        We couldn&apos;t load the documentation content from our repository.
      </p>
      <div className="mt-8 space-x-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => reset()}
        >
          Try Again
        </button>
        <Link 
          href="/"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 