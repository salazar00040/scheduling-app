// src/components/ClientsList.tsx
import React, { useEffect, useState } from 'react';
import { fetchClients } from '../api/clientsApi';
import { Client } from '../types/types'; // Import the Client type

const ClientsList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]); // Initialize state with the correct type

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data); // TypeScript now knows that data is of type Client[]
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    };

    getClients();
  }, []);

  return (
    <ul>
      {clients.map((client) => (
        <li key={client.id}>
          {client.name} - {client.address}
        </li>
      ))}
    </ul>
  );
};

export default ClientsList;
