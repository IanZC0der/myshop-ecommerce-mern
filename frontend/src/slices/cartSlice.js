import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../utils/cartUtils"

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal"}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload
            const itemExists = state.cartItems.find(i => i._id === item._id)
            if (itemExists) {
                state.cartItems = state.cartItems.map(i => i._id === itemExists._id ? item : i)
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state)
        },
        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter(i => i._id !== action.payload)
            return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            return updateCart(state)
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            return updateCart(state)
        },
        clearCartItems: (state) => {
            state.cartItems = []
            return updateCart(state)
        },
        resetCart: (state) => {state = initialState}

    }
})

export default cartSlice.reducer

export const { addToCart, removeFromCart,
    saveShippingAddress, savePaymentMethod,
    clearCartItems, resetCart
} = cartSlice.actions