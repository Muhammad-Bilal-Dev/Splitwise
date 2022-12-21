import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../components/Users/userSlice";
import currentUserReducer from "../components/Users/currentUserSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    currentUser: currentUserReducer
  },
})

export default store;
