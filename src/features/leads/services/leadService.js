import api from "../../../services/ApiClient";

export const getLeads = async () => {
  const response = await api.get("/leads");
  return response.data;
};

export const createLead = async (lead) => {
  const response = await api.post("/leads", lead);
  return response.data;
};

export const updateLead = async (id, lead) => {
  const response = await api.put(`/leads/${id}`, lead);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await api.delete(`leads/${id}`);
  return response.data;
};