import { combineReducers } from "@reduxjs/toolkit";
import { movieReducer } from "../slices/movieSlice";
import { gptReducer } from "../slices/gptSlice";
import { tvReducer } from "../slices/tvSlice";
import { wishlistReducer } from "../slices/wishlistSlice";

const rootReducer = combineReducers({
    movie: movieReducer,
    tv: tvReducer,
    gpt: gptReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
