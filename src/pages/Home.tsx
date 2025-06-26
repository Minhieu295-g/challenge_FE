import HeroSection from "../components/banner/HeroSection.tsx";
import MovieSection from "../components/movie/MovieSection.tsx";

const Home = () => {
    return (
        <>
            <div className="bg-black text-white">
                <main className="w-full px-4">
                    <HeroSection/>
                    <MovieSection type={"Top Rated TV Shows"}/>
                    <MovieSection type={"Trending Movies"}/>
                    <MovieSection type={"Top Rated Movies"}/>
                    <MovieSection type={"Trending TV Shows"}/>
                </main>
            </div>
        </>
    )
}
export default Home;