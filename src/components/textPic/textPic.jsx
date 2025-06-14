import styles from './textPic.module.css';

const TextPic = ({ titel, text, img }) => {

    return (
        <div className={styles.Wrapper}>
            <div className={styles.ContentWrapper}>
                <div className={styles.Content}>
                    <h2>{titel}</h2>
                    <p>{text}</p>
                </div>
             </div>
             <div className={styles.ImgWrapper}>
                <img src={img} alt="picture" />
             </div>
        </div>
    )
}

export default TextPic;