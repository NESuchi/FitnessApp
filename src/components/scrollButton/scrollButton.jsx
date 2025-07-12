import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from './ScrollButton.module.css';

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);
    // Anhand der Scrollweite die Sichtbarkeit kontrollieren
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };
    // An anfang der Seite scrollen
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    // Eventlistener für den Button
    useEffect( () => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`${styles.ScrollButton} ${visible ? styles.Visible : ""}`}
        >
            <FaArrowUp size={20} />
        </button>
    )
}

export default ScrollButton;