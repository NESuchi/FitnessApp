import styles from './intro.module.css';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Intro = ({ titel, text, imgHigh, imgCenter, imgLow }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll ({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const moveContent = useTransform(scrollYProgress, [0,1], [-100, 200]);
    const moveImg = useTransform(scrollYProgress, [0,1], ['-13%', '20%']);

    return (
        <div ref={ref} className={styles.Wrapper}>
            <motion.div className={styles.ContentWrapper} style={{ y: moveContent }}>
                <div className={styles.Content}>
                    <h2>{titel}</h2>
                    <p>{text}</p>
                </div>
            </motion.div>
            <div className={styles.ImgWrapper}>
                <motion.img src={imgHigh} className={`${styles.Img} ${styles.High}`} style={{ y: moveImg }} />
                <motion.img src={imgCenter} className={`${styles.Img} ${styles.Center}`} style={{ y: moveImg }} />
                <motion.img src={imgLow} className={`${styles.Img} ${styles.Low}`} style={{ y: moveImg }} />
            </div>
        </div>
    )
}

export default Intro;