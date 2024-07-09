import { PATHS } from "../routes/paths";
import { AuthUserType } from "../types/user.types";
import axios from "../utils/axios";



export const setSession = (authUser: AuthUserType) => {
    localStorage.setItem('user', JSON.stringify(authUser))
    console.log("set session")
    debugger
    axios.defaults.headers.common.Authorization = `Bearer ${authUser.token}`
}

export const getSession = (): AuthUserType | null => {
    const user: AuthUserType = JSON.parse(localStorage.getItem('user') || 'null')
    debugger
    return user
}


export const removeSession = () => {
    localStorage.removeItem('user')
    axios.defaults.headers.common.Authorization = undefined;
    // window.location.href = PATHS.login;
}

export function jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export const isValidToken = (token: string) => {
    if (!token) {
        return false;
    }

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};
