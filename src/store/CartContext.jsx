import { createContext, useReducer } from 'react';
const CartContext = createContext({
    items: [],
    addItem: (item) => {

    },
    removeItem: (id) => {

    },
    clearCart:()=>{

    }
});

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const existingCartId = state.items.findIndex((itm) => itm.id === action.item.id);
        const updatedItems = [...state.items];
        const existingItem = state.items[existingCartId];
        if (existingCartId > -1) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartId] = updatedItem;
        } else {
            updatedItems.push({
                ...action.item,
                quantity: 1
            });
        }
        return {
            ...state,
            items: updatedItems
        }
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingCartId = state.items.findIndex((itm) => itm.id === action.id);
        const existingItem = state.items[existingCartId];
        const updatedItems = [...state.items];
        if (existingItem.quantity === 1) {
            updatedItems.splice(existingCartId, 1);
        } else {
            const updatedItm = {
                ...existingItem,
                quantity: existingItem.quantity-1
            }
            updatedItems[existingCartId] = updatedItm;
        }
        return {
            ...state,
            items: updatedItems
        }
    }

    if(action.type === 'CLEAR_CART'){
        return {...state, items:[]};
    }
    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {
        items: []
    });
    
    const addItem = (item) => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item
        })
    }

    const removeItem = (id) => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id
        })
    }

    const clearCart = () => {
        dispatchCartAction({
            type: 'CLEAR_CART'
        })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

export default CartContext;