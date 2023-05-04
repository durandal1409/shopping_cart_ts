export const cartContentReducer = (state, action) => {
    switch(action.type) {
        case "increase-cart-quantity": {
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
        } case "decrease-cart-quantity": {
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
        } case "remove-from-cart": {
            return state.filter(item => item.id !== action.id)
        } default: {
            return state;
        }
    }
}

export const cartOpenReducer = (state, action) => {
    switch(action.type) {
        case ("open-cart"): {
            return true
        } case ("close-cart"): {
            return false
        } default: {
            return state;
        }
    }
}