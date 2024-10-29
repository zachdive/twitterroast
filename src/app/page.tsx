'use client'

import { useState } from 'react';

export default function Home() {
  const [twitterUrl, setTwitterUrl] = useState('');
  const [roast, setRoast] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoast = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/.netlify/functions/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ twitterUrl }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('API route not found. Please check your server configuration.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      setRoast(data.roast);
    } catch (error) {
      console.error('Error generating roast:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setRoast('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <main className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Twitter Roaster</h1>
        <div className="mb-4">
          <input
            type="text"
            value={twitterUrl}
            onChange={(e) => {
              setTwitterUrl(e.target.value);
              console.log('Updated Twitter URL:', e.target.value);
            }}
            placeholder="Enter Twitter URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleRoast}
          disabled={!twitterUrl}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
          onMouseEnter={() => console.log('Twitter URL:', twitterUrl, 'Button disabled:', !twitterUrl)}
        >
          {isLoading ? 'Roasting...' : 'Roast This Twitter'}
        </button>
        {isLoading && (
          <div className="mt-4 text-center text-gray-600">
            Generating roast...
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            <h2 className="font-semibold mb-2">Error:</h2>
            <p>{error}</p>
          </div>
        )}
        {roast && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <h2 className="font-semibold mb-2">Roast Result:</h2>
            <p className="text-gray-800">{roast}</p>
          </div>
        )}
      </main>
    </div>
  );
}
