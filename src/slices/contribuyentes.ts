import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { config } from "../config/config";

export interface IDireccion {
  id: number;
  direccionCompleta: string;
}

export interface IPredio {
  id: number;
  cuentaCatastral: string;
  baseGravable: number;
  fechaCelebracion: string;
  fechaAdeudo: string;
  direccion: IDireccion;
}

export interface IContribuyente {
  id: string;
  activo: boolean;
  estatus: string;
  contribuyente: string;
  predio: IPredio;
}

interface ContribuyentesState {
  contribuyentes: IContribuyente[];
  loading: boolean;
  error: string | null;
}

const initialState: ContribuyentesState = {
  contribuyentes: [],
  loading: false,
  error: null,
};

export const getContribuyentes = createAsyncThunk("contribuyentes/listAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${config.PAYMENTS_MANAGER_API}/contribuyentes`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching predios:", error);
    return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
  }
});


const contribuyentesSlice = createSlice({
  name: "predio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContribuyentes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContribuyentes.fulfilled, (state, action) => {
        state.loading = false;
        state.contribuyentes = action.payload;
      })
      .addCase(getContribuyentes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectContribuyentesState = (state: RootState) => state.ContribuyentesReducer;

export default contribuyentesSlice.reducer;
