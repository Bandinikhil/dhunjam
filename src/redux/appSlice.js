import adminDashboardSlice from "./adminDashboardSlice";

const { configureStore } = require("@reduxjs/toolkit");
const { default: authSlice } = require("./authSlice");

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminDashboard: adminDashboardSlice,
  },
});

export default store;
