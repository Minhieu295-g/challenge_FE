import axios from 'axios';
import type {MovieResponse} from "../types/Movie.ts";
import type {MediaCategory} from "../types/Category.ts";
import type {CastResponse} from "../types/Cast.ts";
import type {VideoResponse} from "../types/Video.ts";
import type {DetailResponse} from "../types/Detail.ts";

const tmdbApi = axios.create({
    baseURL: import.meta.env.VITE_TMDB_API_HOST,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'en-US',
    },
});

export const fetchMedia = async (type: MediaCategory, page?: number, search?: string): Promise<MovieResponse> => {
    try {
        const res = await tmdbApi.get<MovieResponse>(`/${type}`, {
            params: {
                ...(page ? { page } : {}),
                ...(search ? { query: search } : {})
            }
        });
        return res.data;
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        throw new Error(`Failed to fetch ${type} data`);
    }
};

export const fetchMovieCast = async (type: string, id: number): Promise<CastResponse> => {
    try {
        const res = await tmdbApi.get<CastResponse>(`/${type}/${id}/credits`, );
        return res.data;
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        throw new Error(`Failed to fetch ${type} data`);
    }
};

export const fetchMovieVideo = async (type: string, id: number): Promise<VideoResponse> => {
    try {
        const res = await tmdbApi.get<VideoResponse>(`/${type}/${id}/videos`, );
        return res.data;
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        throw new Error(`Failed to fetch ${type} data`);
    }
};

export const fetchMovieSimilar = async (type: string, id: number): Promise<MovieResponse> => {
    try {
        const res = await tmdbApi.get<MovieResponse>(`/${type}/${id}/similar`, );
        return res.data;
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        throw new Error(`Failed to fetch ${type} data`);
    }
};

export const fetchMovieDetail = async (type: string, id: number): Promise<DetailResponse> => {
    try {
        const res = await tmdbApi.get<DetailResponse>(`/${type}/${id}`, );
        return res.data;
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        throw new Error(`Failed to fetch ${type} data`);
    }
};