const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentUser: null,
};

export const imageProfileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
        console.log(`setCurrentUser ${JSON.stringify(action)}`)
        state.currentUser = action.payload
    }
  },
});

export const {setCurrentUser} = imageProfileSlice.actions
