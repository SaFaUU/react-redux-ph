import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import filtersSlice from "../features/filter/filterSlice";
import { productApi } from "../features/api/apiSlice";

const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        cart: cartSlice,
        filter: filtersSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
})

export default store;