import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase-config";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const usersCollectionRef = collection(db, "users");
  
// Generate pending, fulfilled and rejected Action Type
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  console.log("Function Starting")
  return getDocs(usersCollectionRef)
  .then(data => {
    console.log("Successfully data get")
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  })
})

// Create Actions and Reducer
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmpty: (state) => {
      console.log("Empty user")
      state.loading = false
      state.users = []
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      console.log("pending")
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log("fulfilled")
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log("rejected")
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
  }
})

export default userSlice.reducer
export const { setEmpty } = userSlice.actions
