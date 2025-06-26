"use client"

import type React from "react"
import type {CastMember} from "../../types/Cast.ts";

interface CastSectionProps {
    cast: CastMember[]
}

const CastSection: React.FC<CastSectionProps> = ({ cast }) => {
    const displayCast = cast.slice(0, 5) // Maximum 5 actors

    if (displayCast.length === 0) return null

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-6">Casts</h3>
            <div className="flex space-x-6 overflow-x-auto pb-4">
                {displayCast.map((actor) => (
                    <div key={actor.id} className="flex-shrink-0 text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-gray-700">
                            {actor.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                    alt={actor.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <span className="text-2xl">👤</span>
                                </div>
                            )}
                        </div>
                        <div className="max-w-20">
                            <p className="text-white font-medium text-sm leading-tight">{actor.name}</p>
                            {actor.character && <p className="text-gray-400 text-xs mt-1 leading-tight">{actor.character}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CastSection
