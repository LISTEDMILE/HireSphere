import { configureStore, createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    Login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
    },
    Logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

const store = configureStore({
  reducer: {
    userInfo: userInfo.reducer,
  },
});

export const userActions = userInfo.actions;
export default store;
