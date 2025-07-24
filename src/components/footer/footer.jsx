import styles from './Footer.module.css';
import { FaRegCompass, FaDatabase, FaKey, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Img from '@/assets/Dummy-2.png'

const navItems = [
    {
        title: "Navigation",
        icon: <FaRegCompass />,
        list: [
            {
                title: "Food Tracker",
                path: "/food-tracker",
            },
            {
                title: "Exercises",
                path: "/exercises",
            },
            {
                title: "Profile",
                path: "/profile",
            },
            {
                title: "Kalender",
                path: "/kalender",
            },
        ],
    },
    {
        title: "Rechtliches",
        icon: <FaDatabase />,
        list: [
            {
                title: "Impressum",
                path: "/impressum",
            },
            {
                title: "Datenschutz",
                path: "/datenschutz",
            },
            {
                title: "Über uns",
                path: "/ueber-uns",
            },
        ],
    },
    {
        title: "Nützliches",
        icon: <FaKey />,
        list: [
            {
                title: "Hochschule",
                path: "https://www.hs-furtwangen.de"
            },
            {
                title: "HFU-Felix",
                path: "https://felix.hs-furtwangen.de/dmz/",
            },
            {
                title: "MIO-Portal",
                path: "https://mio.hs-furtwangen.de/qisserver/pages/cs/sys/portal/hisinoneStartPage.faces",
            },
        ],
    },
];

const Footer = () => {
    return (
        <div className={styles.Wrapper}>
            <div className={styles.ImgWrapper}>
                <img src={Img} alt="FooterImg" />
            </div>
            <div className={styles.Navigation}>
                
                {navItems.map((section)=> (
                    <div key={section.title} className={styles.Section}>
                        <ul className={styles.LinkList}>
                            <li>
                                <h4 className={styles.SectionTitle}>
                                    {section.icon} {section.title}
                                </h4>
                            </li>
                            {section.list.map((item) => {
                                const isExternal = item.path.startsWith("http");
                                return (
                                    <li key={item.title}>
                                        {isExternal ? (
                                            <a href={item.path} target='_blank' rel='noopener noreferrer' className={styles.Link}>
                                                {item.title}
                                            </a>
                                        ) : (
                                            <Link to={item.path} className={styles.Link}>
                                                {item.title}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}

                <div className={styles.Section}>
                    <ul className={styles.LinkList}>
                        <li>
                            <h4 className={styles.SectionTitle}>
                                <IoShareSocialSharp /> Socials
                            </h4>
                        </li>
                        <li>
                            <a 
                                href="https://www.instagram.com/tf_nico.e/?next=%2F" 
                                target='_blank' rel='noopener noreferrer' 
                                className={styles.Link}
                            >
                                <FaInstagram size={35} />
                            </a>
                        </li>
                        <li>
                            <a 
                                href="https://github.com/NESuchi" 
                                target='_blank' rel='noopener noreferrer' 
                                className={styles.Link}
                            >
                                <FaGithub size={35} />
                            </a>
                        </li>
                        <li>
                            <a 
                                href="https://www.linkedin.com/in/nico-eberhardt-aa52792b0/" 
                                target='_blank' rel='noopener noreferrer' 
                                className={styles.Link}
                            >
                                <FaLinkedin size={35} />
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Footer;