// src/reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";

import { movieReducer } from "../slices/movieSlice";
import { personReducer } from "../slices/personSlice";
import { tvReducer } from "../slices/tvSlice";

const rootReducer = combineReducers({
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
});

export default rootReducer;
