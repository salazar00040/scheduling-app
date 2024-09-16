import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tracktik-challenge.staffr.com',  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

