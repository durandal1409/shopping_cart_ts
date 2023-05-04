import { createContext, ReactNode, useState, useReducer, useContext, useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";
// import useLocalStorage from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type InitialStateType = CartItem[];
type CartItem = {
    id: number,
    quantity: number
}
const initialState:InitialStateType = [];

type Action = {
    type: string,
    id: number
}

const ShoppingCartContext = createContext<{
    state: InitialStateType
    actions: object
    openCart: () => void
    closeCart: () => void
}>({});

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
}

const reducer = (state:InitialStateType, action: Action) => {
    switch(action.type) {
        case "increaseCartQuantity": {
            if (state.find(item => item.id === action.id) == null) {
                return [...state, {id: action.id, quantity: 1}]
            } else {
                return state.map(item => {
                    if (item.id === action.id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        } case "decreaseCartQuantity": {
            if (state.find(item => item.id === action.id)?.quantity === 1) {
                return state.filter(item => item.id !== action.id)
            } else {
                return state.map(item => {
                    if (item.id === action.id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        } case "removeFromCart": {
            return state.filter(item => item.id !== action.id)
        } default: {
            throw new Error("unrecognized action: " + action.type);
        }
    }
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const storageKey = "shopping-cart";
    const [state, dispatch] = useReducer(reducer, initialState, (initialState) => JSON.parse(localStorage.getItem(storageKey)) || initialState);
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state));
    }, [state]);

    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const increaseCartQuantity = (id: number) => {
        dispatch({type: "increaseCartQuantity", id})
    }
    const decreaseCartQuantity = (id: number) => {
        dispatch({type: "decreaseCartQuantity", id})
    }
    const removeFromCart = (id: number) => {
        dispatch({type: "removeFromCart", id})
    }

    return (
        <ShoppingCartContext.Provider value={{
            state,
            actions: {
                increaseCartQuantity, 
                decreaseCartQuantity, 
                removeFromCart,
            },
            openCart,
            closeCart
        }}>
            { children }
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}