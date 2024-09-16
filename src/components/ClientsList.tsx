import React, { useEffect, useState } from 'react';
import { fetchClients } from '../api/clientsApi';
import { Client } from '../types/types'; 

const ClientsList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]); 

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data); 
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
          {client.givenName} 
        </li>
      ))}
    </ul>
  );
};

export default ClientsList;
