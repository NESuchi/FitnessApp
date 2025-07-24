import styles from "./Navbar.module.css";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { IoClose, IoLogIn, IoLogOut, IoMenu } from "react-icons/io5";

import { logoutUser } from "@/reducer/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userMail = useSelector((state) => state.auth.user);

  const handleLogOut = () => {
    dispatch(logoutUser());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <div 
          className={`${styles.Overlay} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
        />
        
      <div className={styles.Wrapper}>
        <div className={styles.Navbar}>
          <div className={styles.Img}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img
                className={styles.Logo}
                src={logo}
                height={117}
                width={117}
                alt="logo"
              />
            </Link>
          </div>

          <button className={styles.BurgerMenu} onClick={toggleMenu}>
            {isMenuOpen ? <IoClose size={40} /> : <IoMenu size={40} />}
          </button>

          <div className={`${styles.Navigation} ${isMenuOpen ? styles.Open : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link> 
            <Link to="/food-tracker" onClick={() => setIsMenuOpen(false)}>Food Tracker</Link> 
            <Link to="/exercises" onClick={() => setIsMenuOpen(false)}>Exercises</Link> 
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link> 
            <Link to="/kalender" onClick={() => setIsMenuOpen(false)}>Kalender</Link>

            <div className={styles.AuthMobile}>
              {isLoggedIn && userMail ? (
                <div className={styles.MessageWrapper}>
                  <button className={styles.Button} onClick={handleLogOut}>
                    <IoLogOut size={30} /> Logout
                  </button>
                  <span className={styles.WelcomeMessage}>Willkommen, {userMail.email}</span>
                </div>
              ) : (
                <Link to="/login" className={styles.Login} onClick={() => setIsMenuOpen(false)}>
                  <IoLogIn size={30} /> Login
                </Link>
              )}
            </div>
          </div>
          
          <div className={styles.AuthDesktop}>
            {isLoggedIn && userMail ? (
              <div className={styles.MessageWrapper}>
                <button className={styles.Button} onClick={handleLogOut}>
                  <IoLogOut size={50} />
                </button>
                <span className={styles.WelcomeMessage}>Willkommen, {userMail.email}</span>
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
      </div>
    </>
  );
};

export default Navbar;
