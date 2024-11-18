import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    password: null,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            console.log(`setEmail::action: ${JSON.stringify(action)}`)
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            console.log(`setPassword::action: ${JSON.stringify(action)}`);
            state.password = action.payload;
        },
        clearEmail: (state) => {
            state.email = null;
        },
        clearPassword: (state) => {
            state.password = null;
        }
    }
})

export const {setEmail, setPassword, clearEmail, clearPassword} = loginSlice.actions;