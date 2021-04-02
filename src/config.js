export const BASE_URL = process.env.REACT_APP_BASE_URL || window.location.origin;

export const DYNAMIC_UPDATE_INTERVAL = process.env.REACT_APP_UPDATE_INTERVAL ? parseInt(process.env.REACT_APP_UPDATE_INTERVAL) : 1000;