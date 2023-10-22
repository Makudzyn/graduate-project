import axios, {InternalAxiosRequestConfig} from "axios";
import {REACT_APP_API_URL} from "../utils/consts.js";

// Для запросов которые не требуют авторизации
const $host = axios.create({
    baseURL: REACT_APP_API_URL
})
// Для запросов от авторизированных пользователей
const $authHost = axios.create({
    baseURL: REACT_APP_API_URL
})

// Интерцептор который к запросам добавляет токен, достает из localStorage
const authInterceptor = (config:InternalAxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

// Для каждого запроса авторизированного пользователя подставляем токен
$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}