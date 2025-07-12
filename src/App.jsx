import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import ScrollButton from './components/scrollButton/ScrollButton';
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <ScrollButton />
        </div>
    )
}

export default App;