import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
  data: {},
  allUsers: [],
  updatedUser: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserDetails(state, action) {
      state.data = action.payload.data;
    },
    saveToken(state, action) {
      state.token = action.payload.token;
    },
    saveUserEmail(state, action) {
      state.email = action.payload.email;
    },
    saveAllUsers(state, action) {
      state.allUsers = action.payload.allUsers;
    },
    saveUpdatedUser(state, action) {
      state.updatedUser = action.payload.updatedUser;
    },
    logOut(state, payload) {
      state.token = null;
      state.email = null;
      state.data = {};
      state.updatedUser = {};
      state.allUsers = [];
    },
  },
});

export const {
  saveUserDetails,
  saveAllUsers,
  saveToken,
  saveUserEmail,
  saveUpdatedUser,
  logOut,
} = userSlice.actions;
