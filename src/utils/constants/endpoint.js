//membuat variable API_KEY
const API_KEY = import.meta.env.VITE_API_KEY;
//membuat variable URL API : BASE_URL
const BASE_URL = "https://api.themoviedb.org/3";
//membuat variable endpoints (object)
const ENDPOINTS = {
    POPULAR : `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    NOWPLAYING : `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
    UPCOMING : `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
    TOPRATED : `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
    RECOM: (id) => `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`,
    TRENDING : `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
    DETAIL : (id) => `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`,
    SEARCH_MOVIE : `${BASE_URL}/search/movie?api_key=${API_KEY}`,
};

export default ENDPOINTS;