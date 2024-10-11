import axios, { AxiosResponse } from 'axios';
import { Client } from "../models/Client";

const API_URL = 'http://localhost:8080/api/client';

export const findAll = async (): Promise<Client[]> => {
    try {
        const response: AxiosResponse<Client[]> = await axios.get<Client[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error); 
        throw error;
    }
}

export const findById = async (id: string): Promise<Client> => {
    try {
        const response: AxiosResponse<Client> = await axios.get<Client>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching client with ID ${id}:`, error); 
        throw error;
    }   
}

export const create = async (client: Client): Promise<Client> => {
    try {
        const response: AxiosResponse<Client> = await axios.post<Client>(API_URL, client);
        return response.data;
    } catch (error) {
        console.error('Error creating client:', error);  
        throw error;
    }
}

export const updateClient = async (client: Client): Promise<Client> => {
    try {
        const response: AxiosResponse<Client> = await axios.put<Client>(`${API_URL}/${client.id}`, client);
        return response.data;
    } catch (error) {
        console.error(`Error updating client with ID ${client.id}:`, error);  
        throw error;
    }
}

export const deleteClient = async (id: number): Promise<void> => {
    try{
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting client with ID ${id}:`, error);
        throw error;
    }
}