import axios from 'axios';
import type {MovieResponse} from "../types/Movie.ts";
import type {MediaCategory} from "../types/Category.ts";

const tmdbApi = axios.create({
    baseURL: import.meta.env.VITE_TMDB_API_HOST,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'en-US',
    },
});

export const fetchMedia = async (type: MediaCategory): Promise<MovieResponse> => {
    try {
        const res = await tmdbApi.get<MovieResponse>(`/${type}`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        throw new Error(`Failed to fetch ${type} data`);
    }
};
