"use client"

import { Film } from "lucide-react"
import { useEffect, useState } from "react"

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
                isScrolled ? "bg-black shadow-md" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Film className="h-6 w-6 text-green-500" />
                    <span className="text-xl font-bold">theMovies</span>
                </div>
                <nav>
                    <ul className="flex gap-6">
                        <li className="hover:text-green-500 transition-colors">
                            <a href="#">Home</a>
                        </li>
                        <li className="hover:text-green-500 transition-colors">
                            <a href="#">Movies</a>
                        </li>
                        <li className="hover:text-green-500 transition-colors">
                            <a href="#">TV Series</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
