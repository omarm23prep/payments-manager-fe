import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../config/config";
import { RootState } from "../store";

export interface IPredio {
  _id: string;
  antiguo?: string;
  recaudaac?: number;
  cuenta?: number;
  recaudaan?: number;
  municipiac?: number;
  agencia?: number;
  sector?: number;
  manzana?: number;
  lote?: string;
  ubicacion?: string;
  uso_suelo?: string;
  sup_terr?: number;
  sup_const?: number;
  basecatas?: number;
  valor_terr?: number;
  valor_cons?: number;
  uno?: number;
  folio?: string;
  temp?: boolean;
  municipian?: string;
  impuesto?: number;
  sup_ver?: number;
  nosirve?: string;
  basecatant?: number;
  bimestre?: string;
  basecatar?: number;
  impuestor?: number;
  valor_tras?: number;
  num_tram?: string;
  edificio?: number;
  condominio?: number;
  no_reg?: string;
  val_inmob?: number;
  sup_p_cart?: number;
  zona_valor?: string;
  ubic_mzna?: string;
  forma_p?: string;
  indiviso_p?: number;
  sup_c_cart?: number;
  tipologia?: string;
  subniv?: number;
  edo_cons?: string;
  tmp_cons?: number;
  indiviso_c?: number;
  base_inmov?: number;
  val_suelo?: number;
  fac_merito?: number;
  fac_demeri?: number;
  dem_dep_ec?: number;
  baseinmant?: number;
  verificado?: boolean;
  id?: number;
  clasi_cata?: string;
  hash?: string;
  id_pad?: number;
  fecha_l?: string;
  usu_id?: number;
  modifica?: string;
  eliminado?: boolean;
}

const initialState: IPredio[] = [];

export const getPredios = createAsyncThunk(
  "user/listAll",
  async () => {
    try {
      const response = await axios.get(`${config.PAYMENTS_MANAGER_API}/predios`);
      const prediosData = response.data;

      console.log("predios response", response);

      return prediosData;
    } catch (error: unknown) {
      console.error("ERROR", error);
    }
  },
);

const predio = createSlice({
  name: 'predio',
  initialState,
  reducers: {},
  extraReducers: {
    [getPredios.pending.type]: (state) => {
      return state;
    },
    [getPredios.fulfilled.type]: (state, action) => {
      return [...action.payload.data];
    },
    [getPredios.rejected.type]: (state) => {
      return state;
    },
  }
});

export const selectPredioState = (state: RootState) => {
  return state.PredioReducer;
}

export const { } = predio.actions;
export default predio.reducer;

