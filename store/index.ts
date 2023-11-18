import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "fullSlice",
  initialState: {
    pokemon: {},
    modalOpen: false,
  },
  reducers: {
    setPokemon(state, action) {
      console.log("action", action);
      state.pokemon = action.payload;
    },
    setModalOpen(state, action) {
      state.modalOpen = action.payload;
    }
  },
});

export const actions = slice.actions;

const store = configureStore({
  reducer: slice.reducer,
});
export default store;

