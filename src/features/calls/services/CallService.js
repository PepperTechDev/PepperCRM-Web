import api from "../../../services/ApiClient";

export const getCalls = async () => {
    const response = await api.get("/Calls");
    return response.data;
};

export const createCalls = async (contact) => {
    const response = await api.post("/Calls", contact);
    return response.data;
};

export const updateCalls = async (id, contact) => {
    const response = await api.put(`/Calls/${id}`, contact);
    return response.data;
};

export const deleteCalls = async (id) => {
    const response = await api.delete(`/Calls/${id}`);
    return response.data;
};