/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_BILLIARDS_BE_API_ENDPOINT_DEV: string
    readonly REACT_APP_BILLIARDS_BE_API_ENDPOINT_PROD: string
  }
}
