import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import ScrollButton from './components/scrollButton/scrollButton';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FoodTracker from "./pages/FoodTracker";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Profile";
import Kalender from "./pages/Kalender";
import Login from "./pages/Login";

import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import UeberUns from './pages/UeberUns';

import NotFound from "./pages/NotFound"

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/food-tracker' element={ <FoodTracker /> } />
                    <Route path='/exercises' element={ <Exercises /> } />
                    <Route path='/profile' element={ <Profile /> } />
                    <Route path='/kalender' element={ <Kalender /> } />
                    <Route path='/login' element={ <Login /> } />

                    <Route path='/datenschutz' element={ <Datenschutz /> } />
                    <Route path='/impressum' element={ <Impressum /> } />
                    <Route path='/ueber-uns' element={ <UeberUns /> } />

                    <Route path='*' element={ <NotFound /> } />                
                </Routes>
                <Footer />
            </BrowserRouter>
            <ScrollButton />
        </div>
    )
}

export default App;