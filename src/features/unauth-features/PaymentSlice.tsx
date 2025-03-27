// src/features/paymentSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/apiRoutes";
import { unauth_api } from "../../services/unauth_services/axiosInstance";

// Thunk for initiating payment
export const initiatePayment: any = createAsyncThunk(
    "payment/initiate",
    async (payload: { firstName: string; lastName: string; email: string; phone: string; amount: number; listingId: string }, { rejectWithValue }) => {
        try {
            const response = await unauth_api.post(`${BASE_URL}/v1/agent/payment/initiate`, payload);
            return response.data;
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.error || error.response?.data?.error[0] || "Payment initiation failed";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Payment Slice
const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        loading: false,
        paymentDetails: null,
        error: null,
    },
    reducers: {
        clearPaymentState: (state) => {
            state.loading = false;
            state.paymentDetails = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initiatePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initiatePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentDetails = action.payload;
            })
            .addCase(initiatePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
