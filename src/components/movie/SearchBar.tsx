"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Search, X } from "lucide-react"

interface SearchBarProps {
    placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Enter keyword" }) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    useEffect(() => {
        const keyword = searchParams.get("keyword")
        if (keyword) {
            setQuery(keyword)
        }
    }, [searchParams])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`?keyword=${encodeURIComponent(query.trim())}`)
        } else {
            navigate(location.pathname)        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const clearSearch = () => {
        setQuery("")
        navigate(location.pathname)
    }

    const hasSearch = searchParams.get("keyword")

    return (
        <div className="flex justify-left mb-12 ml-10">
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="w-80 px-6 py-3 pr-12 bg-black/50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                    {hasSearch && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <button
                    type="submit"
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-200 flex items-center gap-2"
                >
                    <Search className="h-4 w-4" />
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchBar
