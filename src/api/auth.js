import axios from 'axios';

const API_URL = 'http://localhost:8091';

// Permite recuperar el token de la API
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Permite registrar un nuevo usuario
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Permite recuperar el usuario actual
// Este método se utiliza para obtener los datos del usuario autenticado
export const getCurrentUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};