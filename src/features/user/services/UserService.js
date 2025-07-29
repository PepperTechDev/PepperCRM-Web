import api from "../../../services/ApiClient";

export const getUser = async (id) => {
    const response = await api.get(`/Users/id/${id}`);
    return response.data;
};

export const getUserAll = async () => {
    const response = await api.get("/Users/All");
    return response.data;
}

export const createUser = async (User) => {
    const response = await api.post("/Users/Create", User);
    return response.data;
}

export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/Users/Update/${id}`, userData);
        return response.data;
    } catch (error) {

        const msg = error.response?.data?.message || "Unknown error";
        throw new Error(msg);
    }
};
