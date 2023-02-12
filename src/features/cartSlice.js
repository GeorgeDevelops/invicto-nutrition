import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        value: [],
        subtotal: 0
    },
    reducers: {
        add: (state, action) => {
            // console.log("add payload ", action.payload);
            action.payload.quantity = 1;
            state.value.push(action.payload);
        },
        remove: (state, action) => {
            state.value.forEach((value, index) => {
                if (value._id.toString() === action.payload._id.toString()) {
                    state.value.splice(index, 1);
                }
            });
        },
        update: (state, action) => {
            state.value.forEach((value, index) => {
                if (value._id.toString() === action.payload._id.toString()) {
                    if (!action.payload.quantity || action.payload.quantity === undefined) return value.quantity = 1;
                    value.quantity = action.payload.quantity;
                }
            });
        },
        emptyCart: (state, action) => {
            let length = state.value.length;
            state.value.splice(0, length);
        },
        getSubtotal: (state, action) => {
            let subt = 0;
            state.value.forEach(item => {
                subt = subt + (item.weight.price * item.quantity);
            });
            state.subtotal = subt;
        }
    }
});

export const { add, remove, update, emptyCart, getSubtotal } = cartSlice.actions;
export default cartSlice.reducer;