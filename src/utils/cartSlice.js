import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      const { id } =
        action.payload?.item?.card?.info || action.payload?.card?.info;
      const existingItemIndex = state.items.findIndex(
        (item) => item.card.info.id === id
      );
      // if item already exists then increase the counter
      // else add the new item to cart
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].counter++;
      } else {
        state.items.push({
          card: action.payload.item?.card,
          counter: 1,
          restaurantId: action.payload?.restaurantId,
        });
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload?.card?.info;
      // check the existence of cartItem
      const existingItemIndex = state.items.findIndex(
        (item) => item?.card?.info?.id === id
      );
      // If item count > 1, decrease count by 1
      // else delete the item(cartItem=1)
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
