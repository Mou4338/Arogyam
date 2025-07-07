'use client';

import React, { useEffect, useState } from 'react';
import HealthResources from './HealthResources';

const OutbreakNews = () => {
  const [articles, setArticles] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/news');
        const results = await res.json();
        setArticles(results);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    try {
      setLoading(true);
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const result = await res.json();
      setArticles(result);
    } catch (error) {
      console.error("Couldn't search the news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="outbreaknews" className="p-4 bg-slate-100 rounded shadow">
      <h2 className="text-3xl text-black font-semibold mb-6">Disease Outbreak Alerts</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* News Feed */}
        <div className="w-full lg:w-2/3 space-y-4 border border-gray-500 p-4 rounded bg-white text-gray-800">
          <form onSubmit={handleSearch} className="flex gap-2 mb-2">
            <input
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search outbreaks and dangers"
              className="border border-gray-600 bg-white text-black rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#3f8578] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#336d5d] transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          <h3 className="text-xl font-bold text-black">
            {input ? 'Search Results' : 'Recent Alerts'}
          </h3>

          {loading && <p className="text-sm text-gray-500">Loading news articles...</p>}
          {!loading && articles.length === 0 && (
            <p className="text-sm text-gray-500">No news found.</p>
          )}

          {!loading &&
            articles.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border border-teal-500 rounded-2xl p-2 bg-teal-50 shadow-xl"
              >
                {item.thumbnail && (
                  <img
                    className="w-20 h-20 object-cover rounded-md"
                    src={item.thumbnail}
                    alt="news"
                  />
                )}
                <div className="flex flex-col justify-between">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-teal-700 hover:underline"
                  >
                    {item.title}
                  </a>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.snippet}</p>
                  <p className="text-xs text-gray-600 mt-1">Published: {item.date}</p>
                  {item.source && (
                    <p className="text-xs text-gray-600">
                      Source:{' '}
                      {typeof item.source === 'object' ? item.source.name : item.source}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 p-2">
          <HealthResources />
        </div>
      </div>
    </div>
  );
};

export default OutbreakNews;
