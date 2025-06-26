
import React, {useEffect, useRef, useState} from "react"
import type {Movie} from "../../types/Movie"
import MovieCard from "../movie/MovieCard.tsx";
import type {Category} from "../../types/Category.ts";

interface SimilarMoviesProps {
    movies: Movie[]
    type: Category
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies, type }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (!movies?.length) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % movies.length

                if (scrollContainerRef.current) {
                    const movieWidth = scrollContainerRef.current.scrollWidth / movies.length
                    scrollContainerRef.current.scrollTo({
                        left: nextIndex * movieWidth,
                        behavior: "smooth",
                    })
                }

                return nextIndex
            })
        }, 3000) // Move every 5 seconds

        return () => clearInterval(interval)
    }, [movies.length])



    return (
        <section className="mb-16 pd-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold ml-10">Similar</h2>
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
                    {movies?.map((movie) => (
                        <div key={movie.id} className="flex-shrink-0 w-48">
                            <MovieCard movie={movie} type={type} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                    {movies.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors hidden ${
                                index === currentIndex ? "bg-white" : "bg-gray-600"
                            }`}
                            onClick={() => {
                                setCurrentIndex(index)
                                if (scrollContainerRef.current) {
                                    const movieWidth = scrollContainerRef.current.scrollWidth / movies.length
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

export default SimilarMovies
