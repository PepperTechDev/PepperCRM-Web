import api from '../../../services/ApiClient';

export const getLeads = async () => {
    try {
        const response = await api.get('/leads');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getLead = async (id) => {
    try {
        const response = await api.get(`/leads/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createLead = async (lead) => {
    try {
        const response = await api.post('/leads', lead);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateLead = async (id, lead) => {
    try {
        const response = await api.put(`/leads/${id}`, lead);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteLead = async (id) => {
    try {
        const response = await api.delete(`/leads/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};