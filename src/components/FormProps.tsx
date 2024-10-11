import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Form.module.css';

interface Field<T> {
    name: keyof T;
    type: string;
    label: string;
    manualId?: boolean;
    options?: string[];
}

interface FormComponentProps<T> {
    initialData: T;
    onSubmit: (data: T) => Promise<void>;
    fields: Field<T>[];
    title: string;
    redirectPath: string;
}

const FormComponent = <T extends { [key: string]: any }>({
    initialData,
    onSubmit,
    fields,
    title,
    redirectPath
}: FormComponentProps<T>) => {
    const [formData, setFormData] = useState<T>(initialData);
    const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});
    const navigate = useNavigate();

    const handleChange = (name: keyof T, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            navigate(redirectPath);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Error submitting form' });
        }
    };

    const handleViewClick = () => {
        navigate(redirectPath); // Redirigir al componente de lista
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>{title}</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {fields.map((field) => (
                        <div key={String(field.name)} className={styles.fieldContainer}>
                            <label className={styles.label} htmlFor={String(field.name)}>
                                {field.label}
                            </label>
                            {field.type === 'dropdown' ? (
                                <select
                                    id={String(field.name)}
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="">Select {field.label}</option>
                                    {field.options?.map((option, index) => (
                                        <option key={index} value={option}> {/* Usar index como key */}
                                            {option} {/* Opción visible */}
                                        </option>
                                    ))}
                                </select>

                            ) : (
                                <input
                                    id={String(field.name)}
                                    type={field.type}
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    disabled={field.name === 'id' && !field.manualId}
                                    className={styles.input}
                                />
                            )}
                            {errors[field.name] && (
                                <p className={styles.error}>{errors[field.name]}</p>
                            )}
                        </div>
                    ))}
                    <button type="submit" className={styles.submitButton}>
                        Save
                    </button>
                    <button
                        type="button"
                        className={styles.viewButton}
                        onClick={handleViewClick}
                    >
                        View
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;
