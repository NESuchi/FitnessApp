import styles from './Display.module.css';
import ProgressBar from './progressBar/ProgressBar';

const Display = ({ data }) => {
    if (data.actual === 0) return <p className='ErrorParagraph'>Keine Angaben</p>;

    return (
        <div className={styles.Wrapper}>
            <h3>{data.label}</h3>
            <div className={styles.Values}>
                    <span>{data.actual}</span>
                    <span>/ {data.max} {data.unit}</span>
            </div>

            {data.label === "Kalorien" && (
                <div className={styles.extraInfo}>
                    <p>Durch Sport verbrannt: <span>{data.burned} {data.unit}</span></p>
                    <p className={styles.deficit}>
                        Defizit: <span>{data.deficit} {data.unit}</span>
                    </p>
                </div>
            )}

            <ProgressBar value={data.actual} max={data.max} />
        </div>
    )
}

export default Display;