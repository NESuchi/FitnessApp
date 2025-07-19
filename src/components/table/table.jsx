import styles from './Table.module.css'

const Table = ({ data, columns, onEdit, onDelete }) => {
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
                            <td key={col.key}>
                                {col.render ? col.render(item) : String(item[col.key])}
                            </td>
                        ))}
                        <td>
                            <button className={`${styles.Button} ${styles.Edit}`} onClick={() => onEdit(item)}>Bearbeiten</button>
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