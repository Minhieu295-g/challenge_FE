
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from "./layouts/Layout.tsx";
import {Outlet} from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop.tsx";
const queryClient = new QueryClient();
function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ScrollToTop />
            <Layout>
                <Outlet/>
            </Layout>
        </QueryClientProvider>
    )
}

export default App
