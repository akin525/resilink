// src/redux/userSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/apiRoutes";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/helpers";
import { auth_api } from "../../services/fileAuth_services/axiosInstance";
import { unauth_api } from "../../services/unauth_services/axiosInstance";

export const addListing: any = createAsyncThunk(
    "agent/listing/add",
    async (payload) => {
        try {
            const response = await auth_api.post(`${BASE_URL}/v1/agent/listing/add`, payload);
            return response.data;
        } catch (error: any) {
            throw error.response?.data?.error || 'Listing add failed';
        }
    }
);

export const fetchListings: any = createAsyncThunk(
    "agent/listing/fetch",
    async () => {
        try {
            const response = await unauth_api.get(`${BASE_URL}/v1/agent/listing/all`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data?.error || 'Listing fetch failed';
        }
    }
);

export const fetchListingDetails: any = createAsyncThunk(
    "agent/listing/id/fetch",
    async (listingId) => {
        try {
            const response = await unauth_api.get(`${BASE_URL}/v1/agent/listing/${listingId}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data?.error || 'Listing fetch failed';
        }
    }
);

const ListingSlice = createSlice({
    name: "listing",
    initialState: {
        listings: [],
        listings_loading: false,
        listings_error: null,
        listing_details: {
            "location": {
                "address": "",
                "city": "",
                "state": "",
                "country": ""
            },
            "_id": "",
            "title": "",
            "type": "",
            "mode": "",
            "status": "",
            "price": 0,
            "commission": 0,
            "totalPrice": 0,
            "rooms": 3,
            "description": "",
            "images": [
                "",
                ""
            ],
            "video": "",
            "postedBy": {
                "_id": "",
                "firstName": "",
                "lastName": "",
                "email": "",
                "profilePic": ""
            },
            "createdAt": "",
            "updatedAt": "",
            "__v": 0
        },
        listing_details_loading: {},
        listing_details_error: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListings.pending, (state) => {
                state.listings_loading = true;
            })
            .addCase(fetchListings.fulfilled, (state, action) => {
                state.listings_loading = false;
                state.listings = action.payload.data;
            })
            .addCase(fetchListings.rejected, (state, action) => {
                state.listings_loading = false;
                state.listings_error = action.payload ? action.payload.error : "Network error";
                toast.error(action.payload ? action.payload.error : "Network error", toastOptions);
            })

            .addCase(fetchListingDetails.pending, (state) => {
                state.listing_details_loading = true;
            })
            .addCase(fetchListingDetails.fulfilled, (state, action) => {
                state.listing_details_loading = false;
                state.listing_details = action.payload.data;
            })
            .addCase(fetchListingDetails.rejected, (state, action) => {
                state.listing_details_loading = false;
                state.listing_details_error = action.payload ? action.payload.error : "Network error";
                toast.error(action.payload ? action.payload.error : "Network error", toastOptions);
            })
    },
});

export default ListingSlice.reducer;
