import api from "../../../services/ApiClient";

export const getVendors = async () => {
    const response = await api.get("/Vendors");
    return response.data;
};

export const createVendors = async (Vendor) => {
    const response = await api.post("/Vendors", Vendor);
    return response.data;
};

export const updateVendors = async (id, Vendor) => {
    const response = await api.put(`/Vendors/${id}`, Vendor);
    return response.data;
};

export const deleteVendors = async (id) => {
    const response = await api.delete(`Vendors/${id}`);
    return response.data;
};