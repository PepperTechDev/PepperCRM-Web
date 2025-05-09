import api from "../../../services/ApiClient";
import { getToken } from "../../../features/auth/services/authService";
import ApiClient from "../../../services/ApiClient";
let mockLeads = [
  {
    id: 1,
    name: "Jhoan Esteban",
    lastname: "Londoño Escobar",
    email: "devlondono@gmail.com",
    phone: "3192061970",
    service: "Service 1",
    State: true,
  },
  {
    id: 2,
    name: "Jorge Andrés",
    lastname: "Rojas Sepúlveda",
    email: "jorge_rojas82212@elpoli.edu.co",
    phone: "3235312623",
    service: "Service 1",
    State: true,
  },{
    id: 3,
    name: "Sebas Andrés",
    lastname: "Londoño Escobar",
    email: "f@gmail.com",
    phone: "324567890",
    service: "Service 3",
    State: true,
  },
];

// Simula una llamada GET

export const getLeads = async () => {
  // Simulación de una llamada a la API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLeads);
    }, 500);
  });
};

// Simula una llamada DELETE
export const deleteLead = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockLeads.findIndex((lead) => lead.id === id);
      if (index !== -1) {
        mockLeads.splice(index, 1);
        resolve();
      } else {
        reject(new Error("Lead not found"));
      }
    }, 300);
  });
};

export const updateLead = async (updatedUser) => {
  // Simulación de actualización
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock updated:", updatedUser);
      resolve({ success: true, data: updatedUser });
    }, 500);
  });
};