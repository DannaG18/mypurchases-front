import React, { useState, useEffect } from "react";
import ListComponent from "../ListComponent";
import { findAll, updateClient, deleteClient } from "../../api/ClientService";
import { Client } from "../../models/Client";

const ClientList: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const clientFields: { name: keyof Client; type: string; label: string; manualId?: boolean} [] = [
    { name: 'id', type: 'number', label: 'Id (Auto-generado)', manualId: false },
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'lastName', type: 'text', label: 'Last Name' },
    { name: 'telephone', type: 'text', label: 'Telephone' },
    { name: 'address', type: 'text', label: 'Address' },
    { name: 'email', type: 'email', label: 'Email' }
  ];

  const fetchClients = async () => {
    try {
      await findAll();
      setError(null);
    } catch (err) {
      setError("Error al cargar los clientes. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ListComponent<Client>
        entityName="Client"
        fetchAll={findAll}
        deleteEntity={deleteClient}
        updateEntity={updateClient}
        entityFields={clientFields}
      />
    </div>
  );
};

export default ClientList;