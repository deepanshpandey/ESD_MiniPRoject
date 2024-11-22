import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081', // Backend URL
});

export default api;
