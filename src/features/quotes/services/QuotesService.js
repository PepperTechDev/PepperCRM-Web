import api from "../../../services/ApiClient";

export const getQuotes = async () => {
    const response = await api.get("/Quotes");
    return response.data;
};

export const createQuotes = async (Quote) => {
    const response = await api.post("/Quotes", Quote);
    return response.data;
};

export const updateQuotes = async (id, Quote) => {
    const response = await api.put(`/Quotes/${id}`, Quote);
    return response.data;
};

export const deleteQuotes = async (id) => {
    const response = await api.delete(`Quotes/${id}`);
    return response.data;
};