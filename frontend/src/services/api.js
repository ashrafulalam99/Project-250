import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000', // your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
