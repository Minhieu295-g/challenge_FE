
import {Play} from "lucide-react"
import { useEffect, useState } from "react"
import {Link, NavLink} from "react-router-dom"

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
            className={`fixed top-0 left-0 right-0 z-50 py-6 px-6 transition-all duration-300 ${
                isScrolled ? "bg-black shadow-md" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to={"/"} className="flex items-center gap-2">
                        <Play className="h-6 w-6 text-green-500 text-2xl"/>
                        <span className="text-2xl font-bold">theMovies</span>
                    </Link>
                </div>

                <nav>
                    <ul className="flex gap-6">
                        <li className="hover:text-green-500 transition-colors text-2xl">
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    `hover:text-red-500 transition-colors ${isActive ? "underline text-red-500" : ""}`
                                }
                            >
                                Home
                            </NavLink>

                        </li>
                        <li className="hover:text-green-500 transition-colors text-2xl">
                            <NavLink
                                to="/movie"
                                className={({isActive}) =>
                                    `hover:text-red-500 transition-colors ${isActive ? "underline text-red-500" : ""}`
                                }
                            >
                                Movie
                            </NavLink>

                        </li>
                        <li className="hover:text-red-500 transition-colors text-2xl">
                            <NavLink
                                to="/tv"
                                className={({isActive}) =>
                                    `${isActive ? "underline text-red-500" : ""}`
                                }
                            >
                                TV Series
                            </NavLink>

                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
