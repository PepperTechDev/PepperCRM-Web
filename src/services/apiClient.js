import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token
function getAuthToken() {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('No fue posible optener el token:', error);
    return null;
  }
}

// Interceptor de solicitud
apiClient.interceptors.request.use(
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
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      try {
        localStorage.removeItem('token');
      } catch (e) {
        console.warn('No se pudo eliminar el token:', e);
      }

      // Retardo opcional para permitir el render de mensajes o loaders
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
