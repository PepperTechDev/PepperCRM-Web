import api from "../services/ApiClient";

// Recupera el perfil del usuario
export const getUserProfile = async () => {
  //const response = await api.get("/auth/profile");
  //return response.data;
  return {
    id: 1,
    name: "Test User",
    email: "test.user@example.com",
    role: "admin",
  };
};

// Actualiza el perfil del usuario
export const updateUserProfile = async (userData) => {
 //  const response = await api.put("/auth/profile", userData);
  // return response.data;
  return {
    ...userData,
    updatedAt: new Date().toISOString(),
  };
};