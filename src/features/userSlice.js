import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        value: {}
    },
    reducers: {
        getLoginUser: (state, actions) => {
            state.value = actions.payload;
        }
    }
});

export const { getLoginUser } = userSlice.actions;
export default userSlice.reducer;