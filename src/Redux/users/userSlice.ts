import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'Components/Access/types';
import userOperations from './userOperation';

export interface TUserState {
  loggedIn: boolean;
  user: IUser;
}
const resetState: IUser = {
  id: '',
  access_token: '',
  role: '',
  name: '',
  sickDays: 0,
  vacationDays: 0,
};

const initialState: TUserState = {
  loggedIn: false,
  user: resetState,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ person: IUser }>) => {
      state.loggedIn = true;
      state.user = {
        id: action.payload.person.id,
        role: action.payload.person.role,
        access_token: action.payload.person.access_token,
        name: action.payload.person.name,
        sickDays: action.payload.person.sickDays,
        vacationDays: action.payload.person.vacationDays,
      };
    },
    signOut: state => {
      state.loggedIn = false;
      state.user = resetState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        userOperations.signIn.fulfilled,
        (state, action: PayloadAction<{ user: IUser }>) => {
          state.loggedIn = true;
          state.user = action.payload.user;
          state.user.access_token = action.payload.user.access_token;
        },
      )
      .addCase(userOperations.signOut.fulfilled, state => {
        state.loggedIn = false;
        state.user = resetState;
      });
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
