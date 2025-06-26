"use client"

import type React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Star, Calendar, Clock, Globe } from "lucide-react"
import { fetchMovieDetail, fetchMovieCast, fetchMovieVideo, fetchMovieSimilar } from "../../api/MovieApi"
import type {MovieResponse } from "../../types/Movie"
import CastSection from "./CastSection"
import VideoSection from "./VideoSection"
import SimilarMovies from "./SimilarMovies"
import type {CastResponse} from "../../types/Cast.ts";
import type {DetailResponse} from "../../types/Detail.ts";
import type {VideoResponse} from "../../types/Video.ts";
import {toCategory} from "../../utils/GetEndpoint.ts";

const MovieDetail: React.FC = () => {
    const { type, id } = useParams<{ type: string; id: string }>()
    const movieId = Number.parseInt(id || "552524")
    const mediaType = toCategory(type) || 'movie';

    const { data: details, isLoading: detailsLoading } = useQuery<DetailResponse>({
        queryKey: ["movieDetail", mediaType, movieId],
        queryFn: () => fetchMovieDetail(mediaType, movieId),
        enabled: !!movieId,
    })

    const { data: castData } = useQuery<CastResponse>({
        queryKey: ["movieCast", mediaType, movieId],
        queryFn: () => fetchMovieCast(mediaType, movieId),
        enabled: !!movieId,
    })

    const { data: videoData } = useQuery<VideoResponse>({
        queryKey: ["movieVideos", mediaType, movieId],
        queryFn: () => fetchMovieVideo(mediaType, movieId),
        enabled: !!movieId,
    })

    const { data: similarData } = useQuery<MovieResponse>({
        queryKey: ["similarMovies", mediaType, movieId],
        queryFn: () => fetchMovieSimilar(mediaType, movieId),
        enabled: !!movieId,
    })

    if (detailsLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        )
    }

    if (!details) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Movie not found</h2>
                    <p className="text-gray-400">The requested movie could not be loaded.</p>
                </div>
            </div>
        )
    }

    const backdropUrl = details.backdrop_path
        ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
        : "/placeholder.svg?height=1080&width=1920"

    const posterUrl = details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : "/placeholder.svg?height=750&width=500"

    const title = details.name  || "Unknown Title"
    const releaseDate = details.first_air_date
    const runtime = details.episode_run_time?.[0]

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div
                className="relative min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url(${backdropUrl})`,
                }}
            >

                {/* Main Content */}
                <div className="flex items-center min-h-screen px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-12 max-w-7xl mx-auto w-full pt-20">
                        {/* Movie Poster */}
                        <div className="flex-shrink-0">
                            <img src={posterUrl || "/placeholder.svg"} alt={title} className="w-80 h-auto rounded-2xl shadow-2xl" />
                        </div>

                        {/* Movie Info */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">{title}</h1>

                                {/* Genres */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {details.genres?.slice(0, 4).map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30"
                                        >
                      {genre.name}
                    </span>
                                    ))}
                                </div>

                                {/* Movie Stats */}
                                <div className="flex flex-wrap items-center gap-6 text-white/80 mb-6">
                                    {details.vote_average && (
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            <span>{details.vote_average.toFixed(1)}</span>
                                        </div>
                                    )}
                                    {releaseDate && (
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-5 h-5" />
                                            <span>{new Date(releaseDate).getFullYear()}</span>
                                        </div>
                                    )}
                                    {runtime && (
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-5 h-5" />
                                            <span>{runtime} min</span>
                                        </div>
                                    )}
                                    {details.origin_country && (
                                        <div className="flex items-center space-x-2">
                                            <Globe className="w-5 h-5" />
                                            <span>{details.origin_country.join(", ")}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Overview */}
                                <p className="text-white/90 text-lg leading-relaxed max-w-3xl">{details.overview}</p>
                            </div>

                            {/* Cast Section */}
                            {castData && <CastSection cast={castData.cast} />}
                        </div>
                    </div>
                </div>
            </div>

            {videoData && videoData.results.length > 0 && <VideoSection videos={videoData.results} />}

            {similarData && similarData.results.length > 0 && <SimilarMovies movies={similarData.results} type={mediaType} />}
        </div>
    )
}

export default MovieDetail
