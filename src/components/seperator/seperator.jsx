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

    const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const contentY = useTransform(scrollYProgress, [0, 1], [200, -200]);

    return (
        <div ref={ref} className={styles.Wrapper}>
            <motion.div
                className={styles.ImgContainer}
                style={{
                    backgroundImage: `url(${img})`,
                    y: bgY,
                }}
            />

            <motion.div className={styles.Content} style={{ y: contentY }}>
                <h2>{titel}</h2>
                <p>{text}</p>
            </motion.div>
        </div>
    )
}

export default Seperator;