export async function fetchDiseaseNews() {
  const res = await fetch("/api/news");
  if (!res.ok) throw new Error("Failed to fetch news");
  return await res.json();
}