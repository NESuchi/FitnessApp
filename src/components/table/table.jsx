import styles from './Table.module.css'

const Table = ({ data, columns, onEdit, onDelete, buttonName }) => {
    return (
        <table className={styles.TableWrapper}>
            <thead>
                <tr className={styles.RowWrapper}>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                    <th>Aktionen</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr className={styles.RowWrapper} key={index}>
                        {columns.map((col) => (
                            <td key={col.key} data-label={col.label}>
                                {col.render ? col.render(item) : String(item[col.key])}
                            </td>
                        ))}
                        <td className={styles.ButtonWrapper}>
                            <button className={`${styles.Button} ${styles.Edit}`} onClick={() => onEdit(item)}>{buttonName}</button>
                            {onDelete && (
                                <button className={`${styles.Button} ${styles.Delete}`} onClick={() => onDelete(item)}>Löschen</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;