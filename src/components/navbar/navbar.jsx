import styles from "./Navbar.module.css";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { IoLogIn, IoLogOut } from "react-icons/io5";

import { logoutUser } from "@/reducer/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userMail = useSelector((state) => state.auth.user);

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

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
        {isLoggedIn && userMail ? (
          <div className={styles.MessageWrapper}>
            <button className={styles.Button} onClick={handleLogOut}>
              <IoLogOut size={50} />
            </button>
            <span className={styles.WelcomeMessage}>Wollkommen, {userMail.email}</span>
          </div>
        ) : (
          <button className={styles.Button} >
            <Link to="/login" className={styles.Login}>
              <IoLogIn size={50} />
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
