import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom'
import { IoLogIn } from "react-icons/io5";

const Navbar = () => {
    return (
        <div>
            <img
                src={logo}
                height={50}
                width={50}
                alt="logo"
            />
            <div>
                <Link to="/">Home</Link> | {" "}
                <Link to="/food-tracker">Food Tracker</Link> | {" "}
                <Link to="/exercises">Exercises</Link> | {" "}
                <Link to="/profile">Profile</Link> | {" "}
                <Link to="/kalender">Kalender</Link>
            </div>
            <Link to="/login">
                <IoLogIn />
            </Link>
        </div>
    )
}

export default Navbar;