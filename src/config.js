export const BASE_URL = process.env.REACT_APP_BASE_URL || window.location.origin;

export const DYNAMIC_UPDATE_INTERVAL = process.env.REACT_APP_UPDATE_INTERVAL ? parseInt(process.env.REACT_APP_UPDATE_INTERVAL) : 1000;

export const ACCESS_TOKEN_REFRESH_INTERVAL = 10 * 60000; // 10 minutes
export const ACCESS_TOKEN_EXPIRATION = 15 * 60000;
export const LOGIN_CONTROLLER_LOCALSTORAGE_CREDS = 'creds';
export const TRAINING_STATE_CHECK_INTERVAL = 100;
