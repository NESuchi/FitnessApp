import styles from './ProgressBar.module.css';

const ProgressBar = ({ value, max }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    return (
        <div className={styles.Wrapper}>
            {percentage < 100 ? (
                <div 
                    className={styles.ProgressBarFill}
                    style={{ width: `${Math.min(percentage, 100)}%`}}
                />
            ) : (
                <div 
                    className={`${styles.ProgressBarFill} ${styles.Over}`}
                    style={{ width: `${Math.min(percentage, 100)}%`}}
                />
            )}
        </div>
    )
}

export default ProgressBar;