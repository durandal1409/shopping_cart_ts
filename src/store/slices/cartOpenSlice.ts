import { createSlice } from "@reduxjs/toolkit";

const cartOpenSlice = createSlice({
    name: "cartOpen",
    initialState: false,
    reducers: {
        cartOpen() {
            return true
        },
        cartClose() {
            return false
        }
    }
})

export const { cartClose, cartOpen } = cartOpenSlice.actions;
export const cartOpenReducer = cartOpenSlice.reducer;