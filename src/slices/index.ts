import { combineReducers } from '@reduxjs/toolkit';
import AuthSlice from './auth';
import UserSlice from './user';
import PredioSlice from './predio'

const rootReducer = combineReducers({
  AuthReducer: AuthSlice,
  UserReducer: UserSlice,
  PredioReducer: PredioSlice,
});

export default rootReducer;
