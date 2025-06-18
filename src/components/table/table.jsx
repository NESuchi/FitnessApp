const Table = ({ data, columns, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>col.label</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((col) => (
                            <td key={col.key}>
                                {String(item[col.key])}
                            </td>
                        ))}
                        <td>
                            <button onClick={() => onEdit(item)}>Bearbeiten</button>
                            <button onClick={() => onDelete(item)}>Löschen</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;