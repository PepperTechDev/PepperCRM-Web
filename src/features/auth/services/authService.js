import api from '../../../services/ApiClient';


// Permite recuperar el token de la API
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        const data = response.data;
        if (!data.token) {
            throw new Error("No se recibió un token de autenticación.");
        }
          // Guarda el token en localStorage
        localStorage.setItem("authToken", data.token); // Guarda token
        return data;
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

export const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };
