import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gptMovies: {
        movieNames: null,
        movieResults: null,
    },
};

const gptSlice = createSlice({
    name: "gpt",
    initialState,
    reducers: {
        addGptMovies: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.gptMovies = { movieNames, movieResults };
        },
    },
});

export const { addGptMovies } = gptSlice.actions;
export const gptReducer = gptSlice.reducer;
