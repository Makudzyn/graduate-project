import {$authHost, $host} from "./index.js";
import jwtDecode from "jwt-decode";


export const registration = async (email: string, password: string): Promise<object>  => {
    const {data} = await $host.post('api/user/registration', {email, password, role: "USER"});
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
}
export const login = async (email: string, password: string): Promise<object> => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
}
export const check = async (): Promise<object>  => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
}