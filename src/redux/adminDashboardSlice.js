import { createSlice } from "@reduxjs/toolkit";
import { getAdminDetails, updatePrice } from "../api/adminApi";

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    adminDetails: null,
    error: null,
  },
  reducers: {
    setAdminDetails: (state, action) => {
      state.adminDetails = action.payload;
      state.error = null;
    },
    updateAdminPrices: (state, action) => {
    
    },
    adminRequestFailure: (state, action) => {
      state.adminDetails = null;
      state.error = action.payload;
    },
  },
});

export const { setAdminDetails, updateAdminPrices, adminRequestFailure } =
  adminDashboardSlice.actions;

export const getAdminDetailsAsync = (id) => async (dispatch) => {
  try {
    const response = await getAdminDetails(id);
    dispatch(setAdminDetails(response.data));
  } catch (error) {
    dispatch(adminRequestFailure(error));
  }
};

export const updatePriceAsync = (id, updatedAdmin) => async (dispatch) => {
  try {
    const response = await updatePrice(id, updatedAdmin);
    dispatch(setAdminDetails(response.data));
  } catch (error) {
    dispatch(adminRequestFailure(error));
  }
};

export default adminDashboardSlice.reducer;
