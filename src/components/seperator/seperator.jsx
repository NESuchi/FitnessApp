import styles from './Seperator.module.css'
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react';

const Seperator = ({ titel, text, img }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const contentY = useTransform(scrollYProgress, [0, 1], [300, -300]);

    const imgStyle = {
        backgroundImage: `url(${img})`
    };

    return (
        <div ref={ref} className={styles.Wrapper}>
            <div
                className={styles.ImgContainer}
                style={imgStyle}
                role='img'
            />

            <motion.div className={styles.Content} style={{ y: contentY }}>
                <h2>{titel}</h2>
                <p>{text}</p>
            </motion.div>
        </div>
    )
}

export default Seperator;