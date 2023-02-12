import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "productsSlice",
    initialState: {
        value: []
    },
    reducers: {
        addProducts: (state, action) => {
            // console.log("add payload ", action.payload);
            state.value = action.payload;
        },
        removeProduct: (state, action) => {
            // console.log("remove payload", action.payload);
            state.value.forEach((value, index) => {
                if (value.id === action.payload.id) {
                    return state.value.splice(index, 1);
                }
            });
        }
    }
});

export const { addProducts, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;