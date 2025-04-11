import api from "../../../services/ApiClient";

export const getProducts = async () => {
  const response = await api.get("/Products");
  return response.data;
};

export const createProducts = async (Product) => {
  const response = await api.post("/Products", Product);
  return response.data;
};

export const updateProducts = async (id, Product) => {
  const response = await api.put(`/Products/${id}`, Product);
  return response.data;
};

export const deleteProducts = async (id) => {
  const response = await api.delete(`Products/${id}`);
  return response.data;
};