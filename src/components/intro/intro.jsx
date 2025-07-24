import styles from './Intro.module.css';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Intro = ({ titel, text, imgHigh, imgCenter, imgLow }) => {
    const [isAnimationActive, setIsAnimationActive] = useState(window.innerWidth > 1300);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll ({
        target: ref,
        offset: ['start end', 'end start'],
    });

    useEffect (() => {
        const handleResize = () => {
            setIsAnimationActive(window.innerWidth > 1300);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const moveContent = useTransform(scrollYProgress, [0,1], [-100, 200]);
    const moveImg = useTransform(scrollYProgress, [0,1], ['-13%', '20%']);

    return (
        <div ref={ref} className={styles.Wrapper}>
            <motion.div className={styles.ContentWrapper} style={{ y: isAnimationActive ? moveContent : 0 }}>
                <div className={styles.Content}>
                    <h2>{titel}</h2>
                    <p>{text}</p>
                </div>
            </motion.div>
            <div className={styles.ImgWrapper}>
                <motion.img src={imgHigh} className={`${styles.Img} ${styles.High}`} style={{ y: isAnimationActive ? moveImg : 0 }} />
                <motion.img src={imgCenter} className={`${styles.Img} ${styles.Center}`} style={{ y: isAnimationActive ? moveImg : 0 }} />
                <motion.img src={imgLow} className={`${styles.Img} ${styles.Low}`} style={{ y: isAnimationActive ? moveImg : 0 }} />
            </div>
        </div>
    )
}

export default Intro;