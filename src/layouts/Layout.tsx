import type {ReactNode} from "react";
import Header from "../components/common/Header.tsx";
import Footer from "../components/common/Footer.tsx";

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;