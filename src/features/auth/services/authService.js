import { jwtDecode } from "jwt-decode";
import api from "../../../services/ApiClient";

// Permite recuperar el token de la API
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    console.log(credentials.email.toLowerCase());
    console.log(credentials.password.toLowerCase());
    const data = response.data;
    if (!data.token) {
      throw new Error("No se recibió un token de autenticación.");
    }

    // Guarda el token en localStorage
    setToken(data.token);
    setUserID(data.token);
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

// Guarda el token en localStorage
export const setToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const setUserID = (token) => {
  const decoded = jwtDecode(token);
  localStorage.setItem("userId", decoded.id);
};

// Recupera el token de localStorage
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Elimina el token y cierra la sesión
export const removeToken = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  window.location.href = "/login"; // Redirige al login
};
