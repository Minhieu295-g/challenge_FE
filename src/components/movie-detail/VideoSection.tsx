"use client"

import type React from "react"
import { useState } from "react"
import { Play, X } from "lucide-react"
import type {Video} from "../../types/Video.ts";

interface VideoSectionProps {
    videos: Video[]
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)

    const displayVideos = videos
        .filter((video) => video.site === "YouTube")
        .sort((a, b) => {
            if (a.type === "Trailer" && b.type !== "Trailer") return -1
            if (b.type === "Trailer" && a.type !== "Trailer") return 1
            return 0
        })
        .slice(0, 5)

    if (displayVideos.length === 0) return null


    const openVideo = (video: Video) => {
        setSelectedVideoId(video.id)
    }




    const closeVideo = () => {
        setSelectedVideoId(null)
    }

    return (
        <>
            <section className="bg-black py-16 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                        {displayVideos.map((video) => (

                            <div key={video.id} className="relative group">
                                <div className="mt-4">
                                    <h2 className="text-white font-semibold text-lg line-clamp-2 mb-10">{video.name}</h2>
                                </div>
                                {selectedVideoId === video.id ? (
                                    // 🟢 Đã chọn: Hiển thị video player
                                    <div className="relative aspect-video">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                                            title={video.name}
                                            className="w-full h-full rounded-lg"
                                            allowFullScreen
                                            allow="autoplay; encrypted-media"
                                        />
                                        <button
                                            onClick={closeVideo}
                                            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white"
                                        >
                                            <X className="w-5 h-5"/>
                                        </button>
                                    </div>
                                ) : (
                                    // 🔴 Chưa chọn: Hiển thị thumbnail
                                    <div
                                        onClick={() => openVideo(video)}
                                        className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
                                    >
                                        <img
                                            src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                                            alt={video.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"/>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Play className="w-6 h-6 text-white fill-white ml-1"/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Tên và loại video */}

                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Video Modal */}


        </>
    )
}

export default VideoSection
