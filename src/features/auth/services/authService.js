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

export const verifyToken = async (token) => {
    try {
        const response = await api.get('/auth/verify', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Error al verificar el token" };
    }
};
