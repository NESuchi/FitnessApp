import styles from './Form.module.css';
import { useState, useEffect } from "react";

const Form = ({ schema, initialValues, onSubmit, onCancel, name }) => {
    const [formData, setFormData] = useState(initialValues); //Initial Values aus den Configs

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    // Wird bei jeder Änderung in einem Feld des Formulars ausgelöst um Zustände zu handlen
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Zustände aktualisieren
        setFormData({
            ...formData, // Alle bisherigen Objekte Kopieren, für Felder die nicht geändert zu erhalten
            [name]: type === 'checkbox' ? checked : value, // Überprüfung auf checkbox
        });
    };
    // Ausführung wenn Formular gesendet wird
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Ruft Funktion die über prop mitgegeben wurde auf und gibt formData weiter
        setFormData(initialValues); // setzt das Formular au die Initialvalues zurück
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setFormData(initialValues);
    }

    return (
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
            <div className={styles.FlexBox}>
                {schema.map((field) => 
                    <div key={field.name}>
                        <label className={styles.label}>{field.label}</label>
                        {field.type === 'checkbox' ? (
                            <input
                                className={styles.inputCheckbox}
                                type="checkbox"
                                name={field.name}
                                checked={formData[field.name] || false}
                                onChange={handleChange}
                            />
                        ) : field.type === 'select' ? (
                            <select 
                                className={styles.InputSelect}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required={field.required}
                            >
                                {field.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                className={styles.inputDefault}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required={field.required}
                            />
                        )}
                    </div>
                )}
            </div>
            <div className={styles.buttonWrapper}>
                <button className={`${styles.Button} ${styles.Save}`} type="submit">{name}</button>
                {onCancel && (
                    <button className={`${styles.Button} ${styles.Cancel}`} type="button" onClick={handleCancel}>Abbrechen</button>
                )}
            </div>
        </form>
    )
}

export default Form;