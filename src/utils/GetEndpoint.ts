import type {Category, MediaCategory} from "../types/Category.ts";

export type MediaSectionProps = {
    type: "Trending Movies" | "Top Rated Movies" | "Trending TV Shows" | "Top Rated TV Shows"
}

export const getEndpoint = (type: MediaSectionProps["type"]): MediaCategory => {
    switch (type) {
        case "Trending Movies":
            return "movie/popular"
        case "Top Rated Movies":
            return "movie/top_rated"
        case "Trending TV Shows":
            return "tv/popular"
        case "Top Rated TV Shows":
            return "tv/top_rated"
        default:
            return "movie/popular"
    }
}

export const getEndpointSearch = (type: MediaCategory): MediaCategory => {
    switch (type) {
        case "movie/popular":
        case "movie/top_rated":
            return "search/movie"
        case "tv/top_rated":
        case "tv/popular":
            return "search/tv"
        default:
            return "search/movie"
    }
}
export const getTypeMovies = (type: MediaCategory): Category => {
    switch (type) {
        case "movie/popular":
        case "movie/top_rated":
            return "movie"
        case "tv/top_rated":
        case "tv/popular":
            return "tv"
        default:
            return "movie"
    }
}
export const toCategory = (value?: string): Category | undefined => {
    return value === 'movie' || value === 'tv' ? value : undefined;
};
