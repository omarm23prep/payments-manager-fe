import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { config } from "../config/config";
import axios from 'axios';
import { RootState } from "../store";

export interface IUser {
  fullname: string,
  username: string
  password?: string,
  email: string,
  role: string,
  age?: number,
  isAuthenticated?: boolean,
}

export interface Credentials {
  username: string,
  password: string,
}

const initialState: {
  loggedUser: IUser,
  users: IUser[]
} = {
  loggedUser: {
    fullname: '',
    username: '',
    email: '',
    role: '',
    age: 0,
    isAuthenticated: false
  },
  users: [],
};

export const createUser = createAsyncThunk(
  "user/create",
  async (user: IUser) => {
    try {
      const response = await axios.post(`${config.BILLIARDS_BE_API_ENDPOINT}/users`, {
        ...user,
      });
      console.log("USER CREATED", response);
      return response;
    } catch (error: unknown) {
      console.error("ERROR WHEN CREATING USER", error);
      return error;
    }
});

export const login = createAsyncThunk(
  "user/login",
  async (credentials: Credentials) => {
    try {
      const response = await axios.post(`${config.BILLIARDS_BE_API_ENDPOINT}/login`, {
        ...credentials,
      });

      console.log("data", response.data);
      return response.data;
    } catch (error: unknown) {
      console.error("ERROR WHEN LOGGING USER", error);
    }
});

export const getUsers = createAsyncThunk(
  "user/listAll",
  async () => {
    try {
      const response = await axios.get(`${config.BILLIARDS_BE_API_ENDPOINT}/users`);
      const usersData = response.data.data;
      return usersData.map((user: IUser ) => {
        return {
          fullname: user.fullname,
          username: user.username,
          password: "*********",
          email: user.email,
          role: user.role,
        } as IUser
      });
    } catch (error: unknown) {
      console.error("ERROR", error);
    }
  },
);

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [createUser.pending.type]: (state) => {
      return { ...state }
    },
    [createUser.fulfilled.type]: (state) => {
      return { ...state }
    },
    [createUser.rejected.type]: (state) => {
      return { ...state }
    },
    [login.pending.type]: (state) => {
      return { ...state }
    },
    [login.fulfilled.type]: (state, action) => {
      const { fullname, username, email, role, age } = action.payload;
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('fullname', fullname);
      sessionStorage.setItem('role', role);

      return {
        ...state,
        loggedUser: {
          fullname,
          username,
          email,
          role,
          age,
          isAuthenticated: fullname ? true: false
        }
      }
    },
    [login.rejected.type]: (state) => {
      return { ...state }
    },
    [getUsers.pending.type]: (state) => {
      return { ...state }
    },
    [getUsers.fulfilled.type]: (state, action) => {
      return { ...state, users: action.payload }
    },
    [getUsers.rejected.type]: (state) => {
      return { ...state }
    },
  }
});

export const selectUserState = (state: RootState) => {
  return state.UserReducer;
}

export const { } = user.actions;
export default user.reducer;
