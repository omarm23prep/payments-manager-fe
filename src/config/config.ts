export const config = {
  PAYMENTS_MANAGER_API: process.env.NODE_ENV === 'development' ?
    process.env.REACT_APP_PAYMENTS_MANAGER_API_DEV
    : process.env.REACT_APP_PAYMENTS_MANAGER_API_PROD,
}
