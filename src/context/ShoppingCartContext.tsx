import { createContext, ReactNode, useState, useReducer, useContext, useEffect } from "react";

import { cartContentReducer, cartOpenReducer} from "../reducers/reducers"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type InitialStateType = {
    cartContent: CartItem[],
    isOpen: boolean
};

type CartItem = {
    id: number,
    quantity: number
}
const initialState:InitialStateType = {cartContent: [], isOpen: false};

type Action = {
    type: string,
    id: number
}

const ShoppingCartContext = createContext<{
    state: InitialStateType
    actions: object
}>({});

const mainReducer = ({ cartContent, isOpen}, action) => ({
    cartContent: cartContentReducer(cartContent, action),
    isOpen: cartOpenReducer(isOpen, action)
})

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const storageKey = "shopping-cart";
    const [state, dispatch] = useReducer(mainReducer, initialState, (initialState) => JSON.parse(localStorage.getItem(storageKey)) || initialState);
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state));
    }, [state]);

    const increaseCartQuantity = (id: number) => {
        dispatch({type: "increase-cart-quantity", id})
    }
    const decreaseCartQuantity = (id: number) => {
        dispatch({type: "decrease-cart-quantity", id})
    }
    const removeFromCart = (id: number) => {
        dispatch({type: "remove-from-cart", id})
    }
    const openCart = () => {
        dispatch({type: "open-cart"})
    }
    const closeCart = () => {
        dispatch({type: "close-cart"})
    }

    return (
        <ShoppingCartContext.Provider value={{
            state,
            actions: {
                increaseCartQuantity, 
                decreaseCartQuantity, 
                removeFromCart,
                openCart,
                closeCart
            }
        }}>
            { children }
        </ShoppingCartContext.Provider>
    )
}