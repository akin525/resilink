import { configureStore } from "@reduxjs/toolkit";
import actionReducer from "../features/unauth-features/ActionSlice";
import userReducer from "../features/unauth-features/UserSlice";
import accountReducer from "../features/auth-features/AccountSlice";
import listingReducer from "../features/auth-features/ListingSlice";
import paymentReducer from "../features/unauth-features/PaymentSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    action: actionReducer,
    user: userReducer,
    account: accountReducer,
    listing: listingReducer,
    payment: paymentReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>