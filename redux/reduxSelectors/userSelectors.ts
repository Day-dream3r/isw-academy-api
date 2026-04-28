import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../reduxStore/store';

export const userSelector = (state: RootState) => state.user;

export const mobileUserSelector = createSelector(
  [userSelector],

  userState =>
    userState.users.filter(user => user.track?.toLowerCase() === 'mobile'),
);
