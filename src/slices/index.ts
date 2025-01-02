import { combineReducers } from '@reduxjs/toolkit';
import AuthSlice from './auth';
import UserSlice from './user';
import PredioSlice from './predio';
import ContribuyentesSlice from './contribuyentes';

const rootReducer = combineReducers({
  AuthReducer: AuthSlice,
  UserReducer: UserSlice,
  PredioReducer: PredioSlice,
  ContribuyentesReducer: ContribuyentesSlice,
});

export default rootReducer;
