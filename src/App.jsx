import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FoodTracker from "./pages/FoodTracker";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Profile";
import Kalender from "./pages/Kalender";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound"

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/food-tracker' element={ <FoodTracker /> } />
                <Route path='/exercises' element={ <Exercises /> } />
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/kalender' element={ <Kalender /> } />
                <Route path='/login' element={ <Login /> } />                
                <Route path='*' element={ <NotFound /> } />                
            </Routes>
        </BrowserRouter>
    )
}

export default App;