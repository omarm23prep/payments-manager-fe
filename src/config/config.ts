export const config = {
  BILLIARDS_BE_API_ENDPOINT: process.env.NODE_ENV === 'development' ?
    process.env.REACT_APP_BILLIARDS_BE_API_ENDPOINT_DEV
    : process.env.REACT_APP_BILLIARDS_BE_API_ENDPOINT_PROD,
}
