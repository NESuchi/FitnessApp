import { useState } from "react";

const Form = ({ schema, initialValues, onSubmit }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData(initialValues);
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