import { combineReducers } from "@reduxjs/toolkit";
import { movieReducer } from "../slices/movieSlice";
import { personReducer } from "../slices/personSlice";
import { tvReducer } from "../slices/tvSlice";
import { wishlistReducer } from "../slices/wishlistSlice";

const rootReducer = combineReducers({
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
