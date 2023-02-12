import { createSlice } from "@reduxjs/toolkit";

export const productFilterSlice = createSlice({
    name: "productFilter",
    initialState: {
        value: []
    },
    reducers: {
        addFilter: (state, action) => {
            // console.log("add payload ", action.payload);
            state.value.push(action.payload);
        },
        removeFilter: (state, action) => {
            // console.log("remove payload", action.payload);
            state.value.forEach((value, index) => {
                if (value.id === action.payload.id) {
                    return state.value.splice(index, 1);
                }
            });
        }
    }
});

export const { addFilter, removeFilter } = productFilterSlice.actions;
export default productFilterSlice.reducer;