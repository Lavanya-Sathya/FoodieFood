import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      const { id } = action.payload?.card?.info;
      const existingItemIndex = state.items.findIndex(
        (item) => item.card.info.id === id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].counter++;
      } else {
        state.items.push({ card: action.payload.card, counter: 1 });
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload?.card?.info;
      const existingItemIndex = state.items.findIndex(
        (item) => item?.card?.info?.id === id
      );
      if (state.items[existingItemIndex].counter > 1) {
        state.items[existingItemIndex].counter--;
      } else {
        state.items = state.items.filter((item) => item?.card?.info?.id !== id);
      }
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});
export const { addItems, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
