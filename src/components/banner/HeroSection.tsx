import { Play } from "lucide-react"

const HeroSection = () => {
    return (
        <section className="relative h-screen min-h-[600px] w-full flex items-center">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://image.tmdb.org/t/p/original/yBDvgpyynDsbMyK21FoQu1c2wYR.jpg"
                    alt="The Accountant 2 Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
            </div>

            <div className="container mx-auto px-6 pt-24 z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 max-w-2xl">
                        <h1 className="text-6xl font-bold mb-6">
                            The Accountant<sup>2</sup>
                        </h1>
                        <p className="text-gray-300 mb-8 text-lg">
                            When an old acquaintance is murdered, Wolff is compelled to solve the case. Realizing more extreme
                            measures are necessary, Wolff recruits his estranged and highly lethal brother, Brax, to help. In
                            partnership with Marybeth Medina, they uncover a deadly conspiracy, becoming targets of a ruthless network
                            of killers who will stop at nothing to keep their secrets buried.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center">
                                Watch now
                            </button>
                            <button className="border border-white hover:bg-white/10 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center gap-2">
                                <Play className="h-4 w-4" />
                                Watch trailer
                            </button>
                        </div>
                    </div>

                    {/* Movie Poster */}
                    <div className="flex-1 flex justify-end">
                        <img
                            src="https://image.tmdb.org/t/p/w500//kMDUS7VmFhb2coRfVBoGLR8ADBt.jpg"
                            alt="The Accountant 2 Poster"
                            className="rounded-lg shadow-lg max-w-xs object-cover z-10"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
