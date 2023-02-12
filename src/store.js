import { configureStore } from "@reduxjs/toolkit";
import ProductFilterReducer from "./features/productFilterSlice";
import cartSlice from "./features/cartSlice";
import productsSlice from "./features/productsSlice";
import userSlice from "./features/userSlice";

export default configureStore({
    reducer: {
        productFilter: ProductFilterReducer,
        cartReducer: cartSlice,
        productsSlice: productsSlice,
        userSlice: userSlice
    },
})