import axios, { InternalAxiosRequestConfig } from 'axios';
import { REACT_APP_API_URL } from '../utils/consts.js';

// For requests that do not require authorization
const $host = axios.create({
  baseURL: REACT_APP_API_URL,
});
// For requests from authorized users
const $authHost = axios.create({
  baseURL: REACT_APP_API_URL,
});

// Interceptor that adds a token to requests, pulls from localStorage
const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

// For each request of an authorized user, we substitute a token
$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
