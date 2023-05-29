import axios from "axios";
import { HOST } from '@env'
import { retrieveLocalStorage } from "../helpers/storageHelper";

const checkApi = async (appId, secretKey, isUpdate, id) => {
    try {
        const response = await axios.post(`${HOST}/api/v1/shopee/checkApi`, {
            id,
            isUpdate,
            appId, 
            secretKey
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

const getDashboardReport = async (filter) => {
    try {
        const { appId, secretKey, token } = await retrieveLocalStorage('userData');
        const response = await axios.post(`${HOST}/api/v1/shopee/dashboard`, {
            appId: appId,
            secretKey: secretKey,
            parameters: filter,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        if(error.code === "ERR_NETWORK"){
            return { fail: true, message: "Please check your internet connection."};
        }else{
            return { fail: true, message: "Please try again later."}; 
        }
    }
}

const getSubIdTree = async (filter) => {
    try {
        const { appId, secretKey, token } = await retrieveLocalStorage('userData');
        const response = await axios.post(`${HOST}/api/v1/shopee/subIdTree`, {
            appId: appId,
            secretKey: secretKey,
            parameters: filter,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        if(error.code === "ERR_NETWORK"){
            return { fail: true, message: "Please check your internet connection."};
        }else{
            return { fail: true, message: "Please try again later."}; 
        }
    }
}

const getClickTimeTree = async (filter) => {
    try {
        const { appId, secretKey, token } = await retrieveLocalStorage('userData');
        const response = await axios.post(`${HOST}/api/v1/shopee/clickTimeTree`, {
            appId: appId,
            secretKey: secretKey,
            parameters: filter,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        if(error.code === "ERR_NETWORK"){
            return { fail: true, message: "Please check your internet connection."};
        }else{
            return { fail: true, message: "Please try again later."}; 
        }
    }
}

const getInitialData = async (filter) => {
    try {
        const { appId, secretKey, token } = await retrieveLocalStorage('userData');
        console.log(appId);
        const response = await axios.post(`${HOST}/api/v1/shopee/initial`, {
            appId: appId,
            secretKey: secretKey,
            parameters: filter,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        if(error.code === "ERR_NETWORK"){
            return { fail: true, message: "Please check your internet connection."};
        }else{
            return { fail: true, message: "Please try again later."}; 
        }
    }
}
export { checkApi, getDashboardReport, getSubIdTree, getClickTimeTree, getInitialData };