import axios, { AxiosResponse } from 'axios';
import { Product } from "../models/Product";


const API_URL = 'http://localhost:8080/api/product';

export const findAll = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse<Product[]> = await axios.get<Product[]>(API_URL);
        console.log('Fetched products:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching product', error);
        throw error;
    }
}

export const findById = async (id: string): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await axios.get<Product>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}', error`);
        throw error;
    }   
}

export const create = async (product: Product): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await axios.post<Product>(API_URL, product);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error creating product', error);
        throw error;
    }
}

export const updateProduct = async (product: Product): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await axios.put<Product>(`${API_URL}/${product.id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

export const deleteProduct = async (id: number): Promise<void> => {
    try{
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting category with ID ${id}:`, error);
        throw error;
    }
}