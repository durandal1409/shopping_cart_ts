import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

interface CartItem {
    id: number,
    quantity: number
}

const initialState: CartItem[] = [];


const cartContentSlice = createSlice({
    name: "cartContent",
    initialState,
    reducers: {
        increaseCartQuantity(state, action: PayloadAction<number>) {
            if (state.find(item => item.id === action.payload) == null) {
                state.push({id: action.payload, quantity: 1})
            } else {
                return state.map(item => {
                    if (item.id === action.payload) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        },
        decreaseCartQuantity(state, action: PayloadAction<number>) {
            if (state.find(item => item.id === action.payload)?.quantity === 1) {
                state.filter(item => item.id !== action.payload)
            } else {
                return state.map(item => {
                    if (item.id === action.payload) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            return state.filter(item => item.id !== action.payload)
        }
    }
})

export const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = cartContentSlice.actions;
export const cartContentReducer = cartContentSlice.reducer;