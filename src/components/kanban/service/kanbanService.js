import api from "../../../services/ApiClient";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/columns`;

export const reorderColumns = async (orderedColumnIds) => {
    return await api.put(`${API_BASE}/reorder`, {orderedColumnIds});
};

export const updateColumnTitle = async (columnId, newTitle) => {
    return await api.put(`${API_BASE}/${columnId}`, {title: newTitle});
};

export const deleteColumn = async (columnId) => {
    return await api.delete(`${API_BASE}/${columnId}`);
};

export const addColumn = async (newColumn) => {
    return await api.post(`${API_BASE}`, newColumn);
};

export const getBoartAll = async () => {
    return await api.get("/Boards/All");
};

// ...existing code...

export const sendEmail = async ({recipient, msgBody, subject, attachment}) => {
    return await api.post("/Emails/send", {
        recipient,
        msgBody,
        subject,
        attachment,
    });
};


