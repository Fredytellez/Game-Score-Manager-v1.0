import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
}

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            console.log(`setUserName ${JSON.stringify(action)}`)
            state.username = action.payload;    
        },
        setEmail: (state, action) => {
            console.log(`setEmail::action: ${JSON.stringify(action)}`)
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            console.log(`setPassword::action: ${JSON.stringify(action)}`);
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            console.log(`setConfirmPassword::action: ${JSON.stringify(action)}`);
            state.confirmPassword = action.payload;
        },
        clearUserName: (state) => {
            state.username = null;
        },
        clearEmail: (state) => {
            state.email = null;
        },
        clearPassword: (state) => {
            state.password = null;
        },
        clearConfirmPassword: (state) => {
            state.confirmPassword = null;
        }
    }
})

export const {setUserName, setEmail, setPassword, setConfirmPassword, clearUserName, clearEmail, clearPassword} = registerSlice.actions;