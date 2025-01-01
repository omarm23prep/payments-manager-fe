import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { config } from "../config/config";
import axios from 'axios';
import { RootState } from "../store";

export interface IUser {
  id?: string,
  fullname: string,
  username: string
  password?: string,
  email: string,
  role: string,
  age?: number,
  isAuthenticated?: boolean,
}

type UserModel = IUser & { _id: string };

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
      const response = await axios.post(`${config.PAYMENTS_MANAGER_API}/users`, {
        ...user,
      });
      console.log("USER CREATED", response);
      return response;
    } catch (error: unknown) {
      console.error("ERROR WHEN CREATING USER", error);
      return error;
    }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async (user: IUser) => {
    try {
      const response = await axios.patch(`${config.PAYMENTS_MANAGER_API}/users/${user.id}`, {
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      });

      console.log("updated user", response);
    } catch (error: unknown) {
      console.error(error);
    }
  }
);

export const removeUser = createAsyncThunk(
  "user/delete",
  async (userId: string) => {
    try {
      const response = await axios.delete(`${config.PAYMENTS_MANAGER_API}/users/${userId}`);

      console.log("removed user", response);
    } catch (error: unknown) {
      console.error(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/listAll",
  async () => {
    try {
      const response = await axios.get(`${config.PAYMENTS_MANAGER_API}/users`);
      const usersData = response.data.data;

      return usersData.map((user: UserModel ) => {
        return {
          id: user._id,
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
    [updateUser.pending.type]: (state) => {
      return { ...state }
    },
    [updateUser.fulfilled.type]: (state) => {
      return { ...state }// change state to be updated immediately
    },
    [updateUser.rejected.type]: (state) => {
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
