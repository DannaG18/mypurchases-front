import { useEffect, useState } from 'react';
import styles from '../styles/List.module.css';

interface ListComponentProps<T> {
    entityName: string;
    fetchAll: () => Promise<T[]>;
    deleteEntity: (id: number) => Promise<void>;
    updateEntity: (entity: T) => Promise<T>;
    entityFields: {
        name: string; // Aceptar rutas anidadas
        label: string;
        type: string;
    }[];
}

const ListComponent = <T extends { id: number; status?: boolean; category?: { id: number; description: string } }>({
    entityName,
    fetchAll,
    deleteEntity,
    updateEntity,
    entityFields,
}: ListComponentProps<T>) => {
    const [entities, setEntities] = useState<T[]>([]);
    const [editingEntityId, setEditingEntityId] = useState<number | null>(null);
    const [editedEntity, setEditedEntity] = useState<Partial<T>>({});

    const loadEntities = async () => {
        const response = await fetchAll();
        setEntities(response);
        console.log('Loaded entities:', response);
    };

    useEffect(() => {
        loadEntities();
    }, []);

    const handleSaveEntity = async () => {
        if (editingEntityId) {
            const entityToUpdate = { ...editedEntity, id: editingEntityId } as T;
            await updateEntity(entityToUpdate);
            setEditingEntityId(null);
            setEditedEntity({});
            loadEntities();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = e.target.checked;
            setEditedEntity((prev) => ({ ...prev, [name]: checked }));
        } else {
            setEditedEntity((prev) => ({ ...prev, [name]: value }));
        }
    };

    const getNestedValue = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => {
            if (acc && typeof acc === 'object') {
                return acc[part];
            }
            return undefined;
        }, obj);
    };

    const displayFieldValue = (entity: T, fieldName: string) => {
        if (fieldName === 'status') {
            return entity.status ? 'Available' : 'Not Available';
        }
        // Verificar la categoría más explícitamente
        if (fieldName === 'category.description') {
            return entity.category?.description || 'No category'; // Manejo de categorías vacías
        }

        const value = getNestedValue(entity, fieldName);
        if (value === null || value === undefined) return '';

        if (typeof value === 'object') {
            return value.description || JSON.stringify(value);
        }

        return String(value);
    };

    return (
        <div className={styles.listContainer}>
            <div className={styles.listHeader}>
                <h2>{entityName} List</h2>
            </div>
            <ul className={styles.list}>
                {entities.map((entity) => (
                    <li key={entity.id} className={styles.listItem}>
                        {entityFields.map((field) => (
                            <div key={field.name} className={styles.info}>
                                <label className={styles.label}>{field.label}</label>
                                {editingEntityId === entity.id ? (
                                    field.type === 'checkbox' ? (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            checked={!!getNestedValue(editedEntity, field.name)}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={getNestedValue(editedEntity, field.name) || ''}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    )
                                ) : (
                                    <p className={styles.value}>
                                        {displayFieldValue(entity, field.name)}
                                    </p>
                                )}
                            </div>
                        ))}
                        <div className={styles.buttonContainer}>
                            {editingEntityId === entity.id ? (
                                <button className={styles.saveButton} onClick={handleSaveEntity}>Save</button>
                            ) : (
                                <button
                                    className={styles.editButton}
                                    onClick={() => {
                                        setEditingEntityId(entity.id);
                                        setEditedEntity(entity);
                                    }}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className={styles.deleteButton}
                                onClick={() => deleteEntity(entity.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListComponent;