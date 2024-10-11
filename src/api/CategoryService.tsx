import axios, { AxiosResponse } from 'axios';
import { Category } from '../models/Category';

const API_URL = 'http://localhost:8080/api/categories';

/**
 * Fetches all categories from the API.
 * @returns A promise that resolves to an array of categories.
 */
export const findAll = async (): Promise<Category[]> => {
    try {
        const response: AxiosResponse<Category[]> = await axios.get<Category[]>(API_URL);
        return response.data; // Return only the data from the response
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // Propagate the error
    }
};

/**
 * Fetches a category by its ID.
 * @param id - The ID of the category to fetch.
 * @returns A promise that resolves to the category.
 */
export const findById = async (id: string): Promise<Category> => {
    try {
        const response: AxiosResponse<Category> = await axios.get<Category>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Saves a new category to the API.
 * @param category - The category to save.
 * @returns A promise that resolves to the saved category.
 */

// export const create = async (category : Category) => {
//     return axios.post<Category>(API_URL, category);
// };
export const create = async (category: Category): Promise<Category> => {
    try {
        const response: AxiosResponse<Category> = await axios.post<Category>(API_URL, category);
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error saving category:', error);
        throw error;
    }
};

/**
 * Updates an existing category.
 * @param category - The category to update.
 * @returns A promise that resolves to the updated category.
 */
export const updateCategory = async (category: Category): Promise<Category> => {
    try {
        const response: AxiosResponse<Category> = await axios.put<Category>(`${API_URL}/${category.id}`, category);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

/**
 * Deletes a category by its ID.
 * @param code - The ID of the category to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting category with ID ${id}:`, error);
        throw error;
    }
};