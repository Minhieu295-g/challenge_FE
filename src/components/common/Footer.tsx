
import { Play } from "lucide-react"

const Footer = () => {
    const navigationLinks = {
        leftColumn: [
            { label: "Home", href: "/" },
            { label: "Contact us", href: "/contact" },
            { label: "Term of services", href: "/terms" },
            { label: "About us", href: "/about" },
        ],
        middleColumn: [
            { label: "Live", href: "/live" },
            { label: "FAQ", href: "/faq" },
            { label: "Premium", href: "/premium" },
        ],
        rightColumn: [
            { label: "You must watch", href: "/must-watch" },
            { label: "Recent release", href: "/recent" },
            { label: "Top IMDB", href: "/top-imdb" },
            { label: "Privacy policy", href: "/privacy" },
        ],
    }

    return (
        <footer className="relative">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://img.pikbest.com/ai/illus_our/20230422/83a8dec832f43af3bc88c44e3223e9b2.jpg!w700wp')",
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Content */}
            <div className="relative z-10 px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    {/* Logo */}
                    <div className="flex justify-center items-center mb-12">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                <Play className="w-6 h-6 text-white fill-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">theMovies</h2>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {/* Left Column */}
                        <div className="flex flex-col space-y-4">
                            {navigationLinks.leftColumn.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-white text-lg hover:text-green-400 transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Middle Column */}
                        <div className="flex flex-col space-y-4">
                            {navigationLinks.middleColumn.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-white text-lg hover:text-green-400 transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col space-y-4">
                            {navigationLinks.rightColumn.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-white text-lg hover:text-green-400 transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center mt-12 pt-8 border-t border-gray-700">
                        <p className="text-gray-400 text-sm">© 2024 theMovies. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
