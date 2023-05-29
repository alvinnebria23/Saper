import axios from "axios";
import { HOST } from '@env'
import { retrieveLocalStorage } from "../helpers/storageHelper";
const registerUser = async (user) => {
    try {
        const response =  await axios.post(`${HOST}/api/v1/user/registerUser`, {
            user
        });
        return response.data
    } catch (error) {
        if(error.code === "ERR_NETWORK"){
            return { fail: true, message: "Please check your internet connection."};
        }else{
            return { fail: true, message: "Please try again later."}; 
        }
    }
}

const loginUser = async (user) => {
    try {
        console.log(HOST);
        const response =  await axios.post(`${HOST}/api/v1/user/loginUser`, {
            user
        });
        return response.data
    } catch (error) {
        if(error.code === "ERR_NETWORK"){
            return { fail: true, message: "Please check your internet connection."};
        }else{
            return { fail: true, message: "Please try again later."}; 
        }
    }
}

const checkEmail = async(email) => {
    try {
        const response =  await axios.post(`${HOST}/api/v1/user/checkEmail`, {
            email: email
        });
        return response.data
    } catch (error) {
        if(error.code === "ERR_NETWORK"){
            return { fail: true, message: "Please check your internet connection."};
        }else{
            return { fail: true, message: "Please try again later."}; 
        }
    }
}

const changeUserInformation = async (data, where) => {
    try {
        const { token } = await retrieveLocalStorage('userData');
        const response =  await axios.post(`${HOST}/api/v1/user/changeUserInformation`, {
            data: data,
            where: where
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data
    } catch (error) {
        if(error.code === "ERR_NETWORK"){
            return { fail: true, message: "Please check your internet connection."};
        }else{
            return { fail: true, message: "Please try again later."}; 
        }
    }
}

export { registerUser, loginUser, checkEmail, changeUserInformation };