import api from "../../../services/ApiClient";

export const getContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};

export const createContact = async (contact) => {
  const response = await api.post("/contacts", contact);
  return response.data;
};

export const updateContact = async (id, contact) => {
  const response = await api.put(`/contacts/${id}`, contact);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};