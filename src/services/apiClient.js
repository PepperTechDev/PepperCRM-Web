import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores para manejar solicitudes y respuestas
// Se utiliza para agregar el token de autorización a las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Recupera el token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejo de error 401 (no autorizado)
      // Aquí puedes manejar el cierre de sesión del usuario
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;