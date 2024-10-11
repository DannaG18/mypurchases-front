import React from "react";
import FormComponent from "../FormProps";
import { create } from "../../api/CategoryService";

// Definimos una interfaz para el modelo Category
interface Category {
    id: number;
    description: string;
    status: boolean;
}

// Definimos una interfaz para los datos del formulario
interface CategoryFormData {
    id: number;
    description: string;
    status: 'available' | 'not available';
}

const CategoryForm: React.FC = () => {
    const initialCategory: CategoryFormData = {
        id: 0,
        description: '',
        status: 'available',
    };

    const categoryFields: { 
        name: keyof CategoryFormData; 
        type: string; 
        label: string; 
        options?: string[] 
    }[] = [
        { 
            name: 'description', 
            type: 'text', 
            label: 'Description' 
        },
        {
            name: 'status',
            type: 'dropdown',
            label: 'Status',
            options: ['available', 'not available'],
        },
    ];

    const handleSubmitCategory = async (formData: CategoryFormData) => {
        // Convertimos los datos del formulario al formato que espera la API
        const categoryData: Category = {
            id: formData.id,
            description: formData.description,
            status: formData.status === 'available'
        };

        await create(categoryData);
    };

    return (
        <FormComponent
            initialData={initialCategory}
            onSubmit={handleSubmitCategory}
            fields={categoryFields}
            title="Add Category"
            redirectPath="/category-list"
        />
    );
};

export default CategoryForm;