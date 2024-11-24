import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  userEmail: null,
}

export const usernameSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload
    },
    logout: (state) => {
      state.username = null;
      state.userEmail = null;
    }
  },
});

export const { setUsername, setUserEmail, logout} = usernameSlice.actions;
