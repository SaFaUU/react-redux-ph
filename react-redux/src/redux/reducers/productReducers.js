import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
    cart: [],
}

const productReducer = (state = initialState, action) => {
    const selectedProduct = state.cart.find(product => product._id === action.payload._id)
    console.log(selectedProduct)
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            if (selectedProduct) {
                selectedProduct.quantity += 1;
                const newCart = state.cart.filter(product => product._id !== selectedProduct._id)
                return {
                    ...state,
                    cart: [...newCart, selectedProduct]
                };
            }
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }],
            };
        case actionTypes.REMOVE_FROM_CART:
            if (selectedProduct.quantity > 1) {
                selectedProduct.quantity -= 1;
                const newCart = state.cart.filter(product => product._id !== selectedProduct._id)
                return {
                    ...state,
                    cart: [...newCart, selectedProduct]
                };
            }
            return {
                ...state,
                cart: state.cart.filter(product => product._id !== action.payload._id),
            };
        default:
            return state;
    }
}

export default productReducer;