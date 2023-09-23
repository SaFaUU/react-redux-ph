import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import filtersSlice from "../features/filter/filterSlice";
import logger from "redux-logger";
import productsSlice from "../features/products/productsSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        filter: filtersSlice,
        products: productsSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export default store;