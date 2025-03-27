// src/redux/userSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth_api } from "../../services/auth_services/axiosInstance";
import { BASE_URL } from "../../utils/apiRoutes";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/helpers";

// Define the async thunk for user registration
export const getUserProfile: any = createAsyncThunk(
  "user/register",
  async () => {
    try {
      const response = await auth_api.get(`${BASE_URL}/v1/agent/account/profile`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.error || 'Profile get failed';
    }
  }
);

const AccountSlice = createSlice({
  name: "account",
  initialState: { data: {}, user: null, uLoading: false, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
        state.uLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.uLoading = false;
        state.data = action.payload.user;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "idle";
        state.uLoading = false;
        state.error = action.payload ? action.payload.error : "Network error";
        toast.error(action.payload ? action.payload.error : "Network error", toastOptions);
      })
  },
});

export default AccountSlice.reducer;
