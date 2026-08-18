import axios from "axios";
import { HOST } from '@env';
import { retrieveLocalStorage } from "../helpers/storageHelper";
import { errorHandler } from "../helpers/errorHandler";
import { AxiosRequestWithHeaders, AxiosRequestWithoutHeaders } from "../helpers/axiosRequest";
import { versionCode } from "../package.json";

const API_BASE_URL = (HOST || '').replace(/\/$/, '');

const registerUser = async (user) => {
    const response = await AxiosRequestWithoutHeaders('api/v1/user/registerUser',{ user });    
    return response;
}

const loginUser = async (user) => {   
    const response = await AxiosRequestWithoutHeaders('api/v1/user/loginUser',{ user });    
    return response;
}

const checkEmail = async(email) => {
    const response = await AxiosRequestWithoutHeaders('api/v1/user/checkEmail', { email: email });    
    return response;
}

const changeUserInformation = async (data, where, action) => {
    const response = await AxiosRequestWithHeaders('api/v1/user/changeUserInformation', { data: data, where: where, action: action });
    return response;
}

const sendResetPasswordReqeust = async (email) => {
    const response = await AxiosRequestWithoutHeaders('api/v1/user/forgotPassword', { email });    
    return response;
}

const resetPassword = async (newPassword) => {
    try {
        const { token, userId } = await retrieveLocalStorage('passwordRequestObject');
        const response =  await axios.post(`${API_BASE_URL}/api/v1/user/resetPassword`, {
            data: { password: newPassword, isValidEmail: true },
            where: { id: userId },
            action: 'resetPassword'
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'x-saper-version': versionCode
            },
        });
        return response.data
    } catch (error) {
        return errorHandler(error);
    }
}

export { 
    registerUser, 
    loginUser, 
    checkEmail, 
    changeUserInformation, 
    sendResetPasswordReqeust, 
    resetPassword,
};