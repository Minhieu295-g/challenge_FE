import type { Movie } from "../../types/Movie"
import { Play } from "lucide-react"
import {getImageUrl} from "../../utils/GetImage.ts";

interface MovieCardProps {
    movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <div className="cursor-pointer group">
            <div className="relative overflow-hidden rounded-lg mb-2">
                <img
                    src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
                    alt={`${movie.title} poster`}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        Watch
                    </button>
                </div>
            </div>
            <h3 className="text-sm font-medium truncate">{movie.title}</h3>
        </div>
    )
}

export default MovieCard
