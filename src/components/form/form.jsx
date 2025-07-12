import { useState } from "react";

const Form = ({ schema, initialValues, onSubmit }) => {
    const [formData, setFormData] = useState(initialValues); //Initial Values aus den Configs

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

    return (
        <form onSubmit={handleSubmit}>
            {schema.map((field) => 
                <div key={field.name}>
                    <label>{field.label}</label>
                    {field.type === 'checkbox' ? (
                        <input
                            type="checkbox"
                            name={field.name}
                            checked={formData[field.name] || false}
                            onChange={handleChange}
                        />
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                        />
                    )}
                </div>
            )}
            <button type="submit">Speichern</button>
        </form>
    )
}

export default Form;