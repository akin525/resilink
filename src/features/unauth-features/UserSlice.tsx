// src/redux/userSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { unauth_api } from "../../services/unauth_services/axiosInstance";
import { BASE_URL } from "../../utils/apiRoutes";
import { RegisterUserPayload, RegisterUserResponse, RootState } from "../../types/Interface";

// Define the async thunk for user registration
export const registerUser: any = createAsyncThunk<
  RegisterUserResponse, // Return type
  RegisterUserPayload  // Argument type
>(
  "user/register",
  async (payload: RegisterUserPayload) => {
    try {
      const response = await unauth_api.post(`${BASE_URL}/v1/agent/auth/register`, payload);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.error || 'Registration failed';
    }
  }
);

export const verifyEmail: any = createAsyncThunk<
  RegisterUserResponse, // Return type
  RegisterUserPayload  // Argument type
>(
  "user/verify-email",
  async (payload: RegisterUserPayload) => {
    try {
      const response = await unauth_api.post(`${BASE_URL}/v1/agent/auth/verify-email`, payload);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.error || 'Email verify failed';
    }
  }
);

export const loginUser: any = createAsyncThunk<
  RegisterUserResponse, // Return type
  RegisterUserPayload  // Argument type
>(
  "user/login",
  async (payload: RegisterUserPayload) => {
    try {
      const response = await unauth_api.post(`${BASE_URL}/v1/agent/auth/login`, payload);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.error || 'Login failed';
    }
  }
);

// Define initial state
const initialState: RootState["user"] = {
  loading: false,
  data: null,
  error: null,
  token: null,
  isLoggedIn: false,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterUserResponse>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })


      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action: PayloadAction<RegisterUserResponse>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Verify Email failed';
      })


      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<RegisterUserResponse>) => {
        state.loading = false;
        state.data = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("accessToken", action.payload.token);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'loginUser failed';
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

