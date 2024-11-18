import { createSlice } from "@reduxjs/toolkit";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
  },
  reducers: {
    setToken: (state, action) => {
      console.log(`setToken::action: ${JSON.stringify(action)}`);
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
