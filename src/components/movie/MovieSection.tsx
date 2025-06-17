
import { ChevronRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import MovieCard from "./MovieCard"
import type { MovieResponse } from "../../types/Movie.ts"
import {fetchMedia} from "../../api/MovieApi.ts"
import type {MediaCategory} from "../../types/Category.ts";

type MediaSectionProps = {
    type: 'Trending Movies' | 'Top Rated Movies' | 'Trending TV Shows' | 'Top Rated TV Shows';
};

const getEndpoint = (type: MediaSectionProps['type']): MediaCategory => {
    switch (type) {
        case 'Trending Movies':
            return 'movie/popular';
        case 'Top Rated Movies':
            return 'movie/top_rated';
        case 'Trending TV Shows':
            return 'tv/popular';
        case 'Top Rated TV Shows':
            return 'tv/top_rated';
        default:
            return 'movie/popular';
    }
};


const MovieSection: React.FC<MediaSectionProps> = ({ type }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const endpoint = getEndpoint(type);

    const { data: popularMovies, isLoading: loadingPopular } = useQuery<MovieResponse>({
        queryKey: ['media', endpoint],
        queryFn: () => fetchMedia(endpoint),
    });

    useEffect(() => {
        if (!popularMovies?.results.length) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % popularMovies.results.length

                if (scrollContainerRef.current) {
                    const movieWidth = scrollContainerRef.current.scrollWidth / popularMovies.results.length
                    scrollContainerRef.current.scrollTo({
                        left: nextIndex * movieWidth,
                        behavior: "smooth",
                    })
                }

                return nextIndex
            })
        }, 3000) // Move every 5 seconds

        return () => clearInterval(interval)
    }, [popularMovies?.results.length])

    console.log(popularMovies)

    if (loadingPopular) return <p>Loading...</p>

    return (
        <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{type.toString()}</h2>
                <button className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                    View more
                    <ChevronRight className="h-4 w-4 ml-1" />
                </button>
            </div>

            <div className="relative overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {popularMovies?.results.map((movie) => (
                        <div key={movie.id} className="flex-shrink-0 w-48">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                    {popularMovies?.results.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors hidden ${
                                index === currentIndex ? "bg-white" : "bg-gray-600"
                            }`}
                            onClick={() => {
                                setCurrentIndex(index)
                                if (scrollContainerRef.current) {
                                    const movieWidth = scrollContainerRef.current.scrollWidth / popularMovies.results.length
                                    scrollContainerRef.current.scrollTo({
                                        left: index * movieWidth,
                                        behavior: "smooth",
                                    })
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MovieSection
