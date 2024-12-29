import { combineReducers } from '@reduxjs/toolkit';
import AuthSlice from './auth';
import UserSlice from './user';

const rootReducer = combineReducers({
  AuthReducer: AuthSlice,
  UserReducer: UserSlice,
});

export default rootReducer;
