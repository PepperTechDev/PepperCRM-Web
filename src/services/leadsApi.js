import axios from "axios";

export const getLeads = async () =>
  await axios.get(`http://localhost:3000/api/v1/leads`);

export const getLead = async (id) =>
  await axios.get(`http://localhost:3000/api/v1/leads/${id}`);

export const createLead = async (lead) =>
  await axios.post(`http://localhost:3000/api/v1/leads`, lead);

export const updateLead = async (id, lead) =>
  await axios.put(`http://localhost:3000/api/v1/leads/${id}`, lead);

export const deleteLead = async (id) =>
  await axios.delete(`http://localhost:3000/api/v1/leads/${id}`);
