// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tracktik-challenge.staffr.com',  // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

