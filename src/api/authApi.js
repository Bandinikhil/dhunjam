// src/api/authApi.js
import axios from "axios";

const API_BASE_URL = "https://stg.dhunjam.in/account/admin";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
