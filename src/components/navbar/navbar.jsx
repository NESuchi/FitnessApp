import styles from "./Navbar.module.css";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Navbar}>
        <div className={styles.Img}>
          <img
            className={styles.Logo}
            src={logo}
            height={117}
            width={117}
            alt="logo"
          />
        </div>
        <div className={styles.Navigation}>
          <Link to="/">Home</Link> |{" "}
          <Link to="/food-tracker">Food Tracker</Link> |{" "}
          <Link to="/exercises">Exercises</Link> |{" "}
          <Link to="/profile">Profile</Link> |{" "}
          <Link to="/kalender">Kalender</Link>
        </div>
        <Link to="/login" className={styles.Login}>
          <IoLogIn size={50} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
