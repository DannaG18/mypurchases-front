import React, { useEffect, useState } from "react";
import FormComponent from "../FormProps";
import { create } from "../../api/ProductService";
import { findAll } from "../../api/CategoryService";

interface Category {
    id: number;
    description: string;
}

interface Product {
    id: number;
    name: string;
    category: Category;
    barcode: string;
    price: number;
    stock: number;
    status: boolean;
}

interface ProductFormData {
    id: number;
    name: string;
    category: string;
    barcode: string;
    price: number;
    stock: number;
    status: 'available' | 'not available';
}

interface Field<T> {
    name: keyof T;
    type: string;
    label: string;
    manualId?: boolean;
    options?: string[];
}

const ProductForm: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [clientFields, setClientFields] = useState<Field<ProductFormData>[]>([]);

    const initialProduct: ProductFormData = {
        id: 0,
        name: '',
        category: '',
        barcode: '',
        price: 0,
        stock: 0,
        status: 'available'
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await findAll();
                setCategories(fetchedCategories);

                // Transformamos las categorías a strings para el dropdown
                const categoryOptions = fetchedCategories.map(cat => cat.description);

                setClientFields([
                    { 
                        name: 'name', 
                        type: 'text', 
                        label: 'Name' 
                    },
                    {
                        name: 'category',
                        type: 'dropdown',
                        label: 'Category',
                        options: categoryOptions
                    },
                    { 
                        name: 'barcode', 
                        type: 'text', 
                        label: 'Barcode' 
                    },
                    { 
                        name: 'price', 
                        type: 'number', 
                        label: 'Price' 
                    },
                    { 
                        name: 'stock', 
                        type: 'number', 
                        label: 'Stock' 
                    },
                    {
                        name: 'status',
                        type: 'dropdown',
                        label: 'Status',
                        options: ['available', 'not available']
                    }
                ]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmitProduct = async (formData: ProductFormData) => {
        try {
            // Encontrar la categoría completa basada en la descripción
            const selectedCategory = categories.find(cat => cat.description === formData.category);
            
            if (!selectedCategory) {
                throw new Error('Selected category not found');
            }

            const productData: Product = {
                ...formData,
                category: selectedCategory,
                status: formData.status === 'available'
            };
            
            await create(productData);
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    };

    return (
        <FormComponent
            initialData={initialProduct}
            onSubmit={handleSubmitProduct}
            fields={clientFields}
            title="Add Product"
            redirectPath="/product-list"
        />
    );
};

export default ProductForm;