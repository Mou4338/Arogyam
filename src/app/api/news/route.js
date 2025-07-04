// app/api/news/route.js
export async function GET() {
  const apiKey = process.env.SERPAPI_KEY; 
  const query = "disease outbreak India";

  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google_news&api_key=${apiKey}&hl=en&gl=in`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return Response.json(data.news_results || []);
  } catch (error) {
    console.error("Server error fetching SerpAPI:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch SerpAPI" }), { status: 500 });
  }
}
