"use client";
import React, { useEffect, useState } from "react";
import { fetchDiseaseNews } from "@/utils/alertsFeed";
import HealthResources from "./HealthResources";

const OutbreakNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const results = await fetchDiseaseNews();
        setArticles(results);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    loadNews();
  }, []);

  return (
    <div id="outbreaknews" className="p-4 bg-slate-100 rounded shadow">
      <h2 className="text-3xl text-black font-semibold mb-6">Disease Outbreak Alerts</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">

        {/* News Section */}
        <div className="w-full lg:w-2/3 space-y-4 border border-gray-300 p-4 rounded bg-white text-gray-800">
          <div className="relative mb-2">
            <input
              type="search"
              placeholder="Search outbreaks and dangers"
              className="border border-gray-600 bg-white text-black rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h3 className="text-xl font-bold text-black">Recent Alerts</h3>

          {articles.length === 0 && (
            <p className="text-sm text-gray-500">No news found.</p>
          )}

          {articles.slice(0, 5).map((item, index) => (
            <div key={index} className="flex gap-4 border border-gray-200 rounded-md p-3 bg-slate-50 shadow-sm">
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
                  className="text-lg font-semibold text-blue-700 hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-sm text-gray-600 line-clamp-2">{item.snippet}</p>
                <p className="text-xs text-gray-500 mt-1">Published: {item.date}</p>
                {item.source && (
                  <p className="text-xs text-gray-400">Source: {typeof item.source === 'object' ? item.source.name : item.source}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 p-2">
          <HealthResources/>
        </div>
      </div>
    </div>
  );
};

export default OutbreakNews;
