import { configureStore } from "@reduxjs/toolkit";
import { increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartContentReducer } from "./slices/cartContentSlice";
import { cartOpen, cartClose, cartOpenReducer } from "./slices/cartOpenSlice";

const store = configureStore({
    reducer: {
        cartContent: cartContentReducer,
        cartOpen: cartOpenReducer
    }
})

export { store, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartClose, cartOpen };
export type RootState = ReturnType<typeof store.getState>