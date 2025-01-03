import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Credentials, IUser } from "./user";
import axios from "axios";
import { config } from "../config/config"
import { RootState } from "../store"

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: Credentials) => {
    try {
      const response = await axios.post(`${config.PAYMENTS_MANAGER_API}/auth/login`, {
        ...credentials,
      }, {
        withCredentials: true,
      });

      return response.data;
    } catch (error: unknown) {
      console.error("ERROR WHEN LOGGING USER", error);
    }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      const response = await axios.post(`${config.PAYMENTS_MANAGER_API}/auth/logout`, {}, {
        withCredentials: true
      });

      return response.data;
    } catch (error: unknown) {
      console.error(error);
    }
  }
)

export interface IAuthState {
  loggedUser?: IUser,
  isUserLoggedIn: boolean,
}

const initialState: IAuthState = {
  loggedUser: undefined,
  isUserLoggedIn: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state) => {
      return state;
    },
    [login.fulfilled.type]: (state, action) => {
      const { fullname, username, email, role, age } = action.payload?.user;

      return {
        ...state,
        isUserLoggedIn: username ? true : false,
        loggedUser: {
          fullname,
          username,
          email,
          role,
          age,
        },
      }
    },
    [login.rejected.type]: (state) => {
      return state;
    },
    [logout.pending.type]: (state) => {
      return state;
    },
    [logout.fulfilled.type]: (state) => {

      return {
        ...state,
        isUserLoggedIn: false,
        loggedUser: undefined,
      }
    },
    [logout.rejected.type]: (state) => {
      return state;
    }
  }
});

export const selectAuthState = (state: RootState) => {
  return state.AuthReducer;
}

export const { } = auth.actions;
export default auth.reducer;
