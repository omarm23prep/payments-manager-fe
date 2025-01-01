/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_PAYMENTS_MANAGER_API_DEV: string
    readonly REACT_APP_PAYMENTS_MANAGER_API_PROD: string
  }
}
