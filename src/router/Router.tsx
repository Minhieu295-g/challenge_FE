import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import MoviesPage from "../pages/MoviesPage.tsx";
import MovieDetail from "../components/movie-detail/MovieDetail.tsx";
import Home from "../pages/Home.tsx";

export const Router = createBrowserRouter([
    {path: '/',
    element: <App/>,
    children: [

        {
            index: true,
            element: <Home/>
        },
        {
            path: "movie",
            element: <MoviesPage type={"Trending Movies"}/>,
        },
        {
            path: "tv",
            element: <MoviesPage type={"Trending TV Shows"}/>,
        },
        {
            path: "/:type/:id",
            element: <MovieDetail />,
        }

    ]}
])
