// src/slices/personSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null,
};

const personSlice = createSlice({
    name: "person",
    initialState,
    reducers: {
        loadPerson: (state, action) => {
            state.info = action.payload;
        },
        removePerson: (state) => {
            state.info = null;
        },
    },
});

export const { loadPerson, removePerson } = personSlice.actions;
export const personReducer = personSlice.reducer;
