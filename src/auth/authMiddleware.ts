import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getSession, isValidToken, removeSession } from './utils'


const publicUrl=['/Auth/Login','/Auth/ForgetPassword']
// בדיקת הרשאות לפני קריאת שרת
export const authRequestMiddleware = (request: InternalAxiosRequestConfig) => {
    if (request.url==='/Auth/ForgetPassword'||request.url==='/Auth/Login') {
        return request;
    }
    const authUser = getSession()
    debugger
    if (!authUser || !isValidToken(authUser.token)) {
        debugger
        removeSession();
        Promise.reject('Unauthorized');
    }
    return request;
};

// -אחרי שחזרה תגובה בדיקת הרשאות אחרי קריאת שרת
export const authResponseMiddleware = (response: AxiosResponse) => {
    if (response.status === 401) {
        removeSession();
        Promise.reject('Unauthorized');
    }
    return response;
};