import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  password: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      console.log(`setEmail::action: ${JSON.stringify(action)}`);
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      console.log(`setPassword::action: ${JSON.stringify(action)}`);
      state.password = action.payload;
    },
    setToken: (state, action) => {
      console.log(`setToken::action: ${JSON.stringify(action)}`);
      state.token = action.payload;
    },
    /* logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    }, */
    clearEmail: (state) => {
      state.email = null;
    },
    clearPassword: (state) => {
      state.password = null;
    },
  },
});

export const { setEmail, setPassword, clearEmail, clearPassword, setToken } =
  loginSlice.actions;
