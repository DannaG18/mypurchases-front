import React from "react";
import { Client } from "../../models/Client";
import FormComponent from "../FormProps";
import { create } from "../../api/ClientService";

const ClientForm: React.FC = () => {
    const initialClient: Client = {
        id: 0,
        name: '',
        lastName: '',
        telephone: '',
        address: '',
        email: ''
    };

    const clientFields: { name: keyof Client; type: string; label: string; manualId?: boolean} [] = [
        { name: 'id', type: 'number', label: 'Id (Auto-generado)', manualId: false }, // No se ingresa manualmente
        { name: 'name', type: 'text', label: 'Name' },
        { name: 'lastName', type: 'text', label: 'Last Name' },
        { name: 'telephone', type: 'text', label: 'Telephone' },
        { name: 'address', type: 'text', label: 'Address' },
        { name: 'email', type: 'email', label: 'Email' }
    ];

    const handleSubmitClient = async (data: Client) => {
        await create(data);
    }

    return (
        <FormComponent
            initialData ={initialClient}
            onSubmit={handleSubmitClient}
            fields={clientFields}
            title="Add Client"
            redirectPath="/client-list"
            />
    )
}

export default ClientForm;