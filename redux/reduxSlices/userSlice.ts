import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userState {
  users: User[];
  admins: User[];
}

type User = {
  username?: string;
  track?: string;
};

const initialState: userState = {
  users: [],
  admins: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const { username, track } = action.payload;
      state.users = [...state.users, { username, track }];
    },
    addAdmin: (state, action: PayloadAction<User>) => {
      const { username, track } = action.payload;
      state.admins = [...state.admins, { username, track }];
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
