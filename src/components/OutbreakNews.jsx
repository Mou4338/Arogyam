"use client"
import React, { useState, useEffect } from 'react'
import { fetchDiseaseNews } from '@/utils/alertsFeed'


const OutbreakNews = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchDiseaseNews((data) => {
            if (data && data.news_results) {
                setArticles(data.news_results);
            }
        });
    }, [])

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Disease Outbreak Alerts</h2>
            <ul className="space-y-3">
                {articles.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} target="_blank" className="text-blue-600 hover:underline">
                            {item.title}
                        </a>
                        <p className="text-xs text-gray-500">{item.snippet}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OutbreakNews
