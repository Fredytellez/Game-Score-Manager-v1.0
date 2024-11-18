import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./features/loginSlice";
import { registerSlice } from "./features/registerSlice";
import { userApi } from "./services/user.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./features/authSlice";
import { imageProfileSlice } from "./features/imageProfileSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    auth: authSlice.reducer,
    user: imageProfileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware]),
});

setupListeners(store.dispatch);
