import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import ScrollButton from './components/scrollButton/ScrollButton';
import { Outlet } from "react-router-dom";

import { checkAuthStatus } from './reducer/slices/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

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