import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: JSON.parse(localStorage.getItem('wishlist')) || [],
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((movie) => movie.id === item.id);
      if (!existingItem) {
        state.push(item);
        localStorage.setItem('wishlist', JSON.stringify(state));
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      const updatedWishlist = state.filter((movie) => movie.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    },
    
    setWishlist: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
