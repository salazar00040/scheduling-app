import api from './api';
import { Site } from '../types/types';

export const fetchSiteDetails = async (id: string): Promise<Site> => {
  const response = await api.get<Site>(`/sites/${'mnehahWGuv'}`);
  return response.data; 
};


export const fetchSites = async (page: number = 1, limit: number = 5): Promise<Site[]> => {
  try {
    const response = await api.get<Site[]>(`/sites?_page=${page}&_limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sites:', error);
    throw error; 
  }
};
