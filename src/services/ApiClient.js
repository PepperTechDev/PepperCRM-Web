import axios from 'axios';
import { getToken, removeToken} from "../features/auth/services/authService";


const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token
function getAuthToken() {
  try {
    return getToken();
  } catch (error) {
    console.error('No authentication token was received:', error);
    return null;
  }
}

// Interceptor de solicitud
ApiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      try {
        removeToken();
      } catch (e) {
        console.warn('Failed to remove token:', e);
      }

      // Retardo opcional para permitir el render de mensajes o loaders
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }

    return Promise.reject(error);
  }
);

export default ApiClient;
