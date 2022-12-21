import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUserAuthId: ''
};

// Create Actions and Reducer
const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUserAuthId: (state, action) => {
      console.log("Set current user auth id")
      state.currentUserAuthId = action.payload
    },
    setEmptyCurrentUserAuthId: (state) => {
      console.log("Empty current user auth id")
      state.currentUserAuthId = ''
    }
  }
});

export default currentUserSlice.reducer;
export const { setCurrentUserAuthId, setEmptyCurrentUserAuthId } = currentUserSlice.actions;
