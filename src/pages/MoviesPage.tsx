"use client"

import type React from "react"
import SearchBar from "../components/movie/SearchBar"
import MovieList from "../components/movie/MovieList"
import type {MediaSectionProps} from "../utils/GetEndpoint.ts";

const MoviesPage:  React.FC<MediaSectionProps> = ({ type }) => {


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black">
            {/* Header */}
            <div className="text-center py-12 px-4">
                <h1 className="text-3xl sm:text-3xl lg:text-3xl font-bold text-white mb-2">{type}</h1>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Movie Lists */}
            <div className="max-w-7xl mx-auto space-y-8">
                <MovieList type={type} />

            </div>
        </div>
    )
}

export default MoviesPage
