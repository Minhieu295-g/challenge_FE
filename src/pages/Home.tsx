import Header from "../components/common/Header.tsx";
import HeroSection from "../components/banner/HeroSection.tsx";
import MovieSection from "../components/movie/MovieSection.tsx";
import Footer from "../components/common/Footer.tsx";

const Home = () => {
    return (
        <>
            <div className="bg-black text-white">
                <Header/>
                <main className="w-full px-4">
                    <HeroSection/>
                    <MovieSection type={"Top Rated TV Shows"}/>
                    <MovieSection type={"Trending Movies"}/>
                    <MovieSection type={"Top Rated Movies"}/>
                    <MovieSection type={"Trending TV Shows"}/>
                </main>
                <Footer/>
            </div>
        </>
    )
}
export default Home;