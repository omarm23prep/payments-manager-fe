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

export interface IPredioHis {
  _id: string;
  recaudaan: number;
  municipian: number;
  antiguo: string | null;
  cuenta: number;
  folio: number;
  propietari: string;
  apepat: string | null;
  apemat: string | null;
  nombres: string | null;
  domicilio: string;
  vialidad: string | null;
  calle: string | null;
  numext: string | null;
  numint: string | null;
  letra: string | null;
  col_fuh: string | null;
  desc_cfuh: string | null;
  c_post: string | null;
  estado: string | null;
  desc_econn: string | null;
  mzna: string | null;
  zona: string | null;
  etapa: string | null;
  bim_emi: number;
  fechmov: string | null;
  tipo_mov: string | null;
  tipo_ope: string | null;
  fech_cel: string | null;
  cve_user: string | null;
  fechrevl: string | null;
  temp: boolean;
  folion: number;
  pred_mov: string | null;
  nosirve: string | null;
  registro: string | null;
  medida: string | null;
  hora_mov: string | null;
  emision: number;
  cuentaant: string;
  prop_ant: string | null;
  municipiac: number;
  agencia: number;
  sector: number;
  manzana: string | null;
  lote: number;
  edificio: number;
  condominio: number;
  fech_reg: string | null;
  rfc: string | null;
  sexo: string | null;
  telefono: string | null;
  nacionalid: string | null;
  num_solpag: string | null;
  fec_solpag: string | null;
  municipi_f: string | null;
  tip_movant: number;
  tmov_ant: string | null;
  curp: string | null;
  verificado: boolean;
  id: number;
  tomo: string | null;
  escritura: string | null;
  notario: string | null;
  hash: string | null;
  id_pad: number;
  fecha_l: string | null;
  usu_id: number;
  modifica: string | null;
  et_con_nn: string | null;
  lote_n: string | null;
  eliminado: boolean;
  lote_u: string | null;
  mzna_u: string | null;
  modif_jur: string | null;
  folio_seg: string | null;
  mov_jun16: string | null;
  obs_quin: string | null;
}

export interface IPredioDetails {
  propietario?: string,
  domicilio?: string,
  cuenta?: string,
  manzana?: string,
  municipio?: string,
  colindancias?: string[],
}

interface PredioState {
  predios: IPredio[];
  loading: boolean;
  error: string | null;
}

const initialState: PredioState = {
  predios: [],
  loading: false,
  error: null,
};

export const getPredios = createAsyncThunk("predio/listAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${config.PAYMENTS_MANAGER_API}/predios`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching predios:", error);
    return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
  }
});

export const getDetailsByCuenta = async (cuenta: number) => {
  try {
    const response = await axios.get(`${config.PAYMENTS_MANAGER_API}/predios/details/${cuenta}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching predio by cuenta:", error);
    throw Error("Unknown error");
  }
};


const predioSlice = createSlice({
  name: "predio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPredios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPredios.fulfilled, (state, action) => {
        state.loading = false;
        state.predios = action.payload.data;
      })
      .addCase(getPredios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectPredioState = (state: RootState) => state.PredioReducer;

export default predioSlice.reducer;

