// src/api/clientApi.ts
import api from './api';
import { Client } from '../types/types'; // Import the Client type


export const fetchClients = async (): Promise<Client[]> => {
    const response = await api.get('/clients');
    return response.data as Client[]; // Assert the correct type of the returned data
  };
// Fetch a single client by ID
export const fetchClientById = (id: string) => {
  return api.get(`/clients/${id}`);
};

// Create a new client
export const createClient = (data: { name: string }) => {
  return api.post('/clients', data);
};

// Delete a client
export const deleteClient = (id: string) => {
  return api.delete(`/clients/${id}`);
};

// Fetch clients with embedded sites
export const fetchClientsWithSites = () => {
  return api.get('/clients?_embed=sites');
};

// Additional functions can be defined following similar patterns
