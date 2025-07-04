import Serpapi from 'google-search-results-nodejs';
const search=new Serpapi.GoogleSearch("8a84cf812c2c2fd91f1fbdfd247ba320433468d7a34e5beded78155838608205")

export function fetchDiseaseNews(callback){
    search.json({
        engine:"google_news",
        q:"disease outbreak India",
        hl:"en",
        gl:"in"
    },callback);
}