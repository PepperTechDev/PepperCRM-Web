import api from '../../../services/apiClient';

// Permite recuperar el token de la API
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Permite registrar un nuevo usuario
export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Permite recuperar el usuario actual
// Este método se utiliza para obtener los datos del usuario autenticado
export const getCurrentUser = async (token) => {
    try {
        const response = await api.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};