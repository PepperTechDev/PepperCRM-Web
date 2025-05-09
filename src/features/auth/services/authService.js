import { jwtDecode } from "jwt-decode";
import api from "../../../services/ApiClient";

// Permite recuperar el token de la API
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    const data = response.data;
    if (!data.token) {
      throw new Error("No se recibió un token de autenticación.");
    }

    // Guarda el token en localStorage
    setToken(data.token);

    return data;
  } catch (error) {
    throw error.response?.data || { error: "Error al iniciar sesión" };
  }
};


export const register = async (credentials) => {
  try {
    const response = await api.post("/auth/register", credentials);
    const data = response.data;

    return data;
  } catch (error) {
    throw error.response?.data || { error: "Error al registrarse" };
  }
};


// Verifica si el token es válido
export const verifyToken = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No hay token disponible.");
  }

  try {
    const response = await api.get("/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error al verificar el token" };
  }
};

// Decodifica el token para obtener información del usuario
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // Devuelve la información del usuario (ID, roles, etc.)
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

// Guarda el token en localStorage
export const setToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Recupera el token de localStorage
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Elimina el token y cierra la sesión
export const removeToken = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirige al login
};
