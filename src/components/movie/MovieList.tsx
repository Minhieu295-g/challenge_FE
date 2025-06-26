"use client"

import type React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useRef } from "react"
import MovieCard from "./MovieCard"
import type { MovieResponse } from "../../types/Movie.ts"
import { fetchMedia } from "../../api/MovieApi.ts"
import { useLocation } from "react-router-dom"
import {getEndpoint, getEndpointSearch, getTypeMovies, type MediaSectionProps} from "../../utils/GetEndpoint.ts";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const MovieList: React.FC<MediaSectionProps> = ({ type }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const query = useQuery()
    const search = query.get("keyword") || undefined

    const baseEndpoint = getEndpoint(type)
    const endpoint = search ? getEndpointSearch(baseEndpoint) : baseEndpoint
    const getType = getTypeMovies(endpoint);

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<MovieResponse>({
        queryKey: ["media", endpoint, search],
        queryFn: ({ pageParam = 1 }) => fetchMedia(endpoint, pageParam as number, search),
        getNextPageParam: (lastPage) => {
            const nextPage = (lastPage.page || 1) + 1
            return nextPage <= (lastPage.total_pages ?? 1) ? nextPage : undefined
        },
        initialPageParam: 1,
    })

    const allMovies = data?.pages.flatMap((page) => page.results) ?? []


    if (isLoading) {
        return (
            <section className="mb-16 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                    <span className="ml-3 text-gray-400">Loading {type.toLowerCase()}...</span>
                </div>
            </section>
        )
    }

    return (
        <section className="mb-16 px-4 sm:px-6 lg:px-8">


            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {allMovies.map((movie) => (
                        <div key={movie.id} className="flex-shrink-0 transition-transform duration-200 hover:scale-105">
                            <MovieCard movie={movie} type={getType}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-colors duration-200 flex items-center gap-2 border border-white"
                >
                    {isFetchingNextPage ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Loading...
                        </>
                    ) : hasNextPage ? (
                        "Watch More"
                    ) : (
                        "No more movies"
                    )}
                </button>
            </div>
        </section>
    )
}

export default MovieList
