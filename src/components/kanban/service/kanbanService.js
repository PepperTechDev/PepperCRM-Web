
import axios from "axios";
const API_BASE = `${import.meta.env.VITE_API_URL}/api/columns`;

export const reorderColumns = async (orderedColumnIds) => {
  return axios.put(`${API_BASE}/reorder`, { orderedColumnIds });
};

export const updateColumnTitle = async (columnId, newTitle) => {
  return axios.put(`${API_BASE}/${columnId}`, { title: newTitle });
};

export const deleteColumn = async (columnId) => {
  return axios.delete(`${API_BASE}/${columnId}`);
};

export const addColumn = async (newColumn) => {
  return axios.post(`${API_BASE}`, newColumn);
};