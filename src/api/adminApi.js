// src/api/adminApi.js
import axios from "axios";

const API_BASE_URL = "https://stg.dhunjam.in/account/admin";

export const getAdminDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updatePrice = async (id, updatedAdmin) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedAdmin);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
