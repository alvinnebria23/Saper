import axios from "axios";
import { HOST } from '@env'
import { retrieveLocalStorage } from "../helpers/storageHelper";

const checkApi = async (appId, secretKey) => {
    try {
        const response = await axios.post(`${HOST}/api/v1/shopee/checkApi`, {
            appId, 
            secretKey
        });
        return response.data
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getDashboardReport = async (filter) => {
    try {
        const { appId, secretKey } = await retrieveLocalStorage('userData');
        const response = await axios.post(`${HOST}/api/v1/shopee/dashboard`, {
            appId: appId,
            secretKey: secretKey,
            parameters: filter,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: true, message: "Please do filtering dates every 30 seconds only."};
    }
}

const getSubIdTree = async (filter) => {
    try {
        const { appId, secretKey } = await retrieveLocalStorage('userData');
        const response = await axios.post(`${HOST}/api/v1/shopee/subIdTree`, {
            appId: appId,
            secretKey: secretKey,
            parameters: filter,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: true, message: "Please do filtering dates every 30 seconds only."};
    }
}

const getClickTimeTree = async (filter) => {
    try {
        const { appId, secretKey } = await retrieveLocalStorage('userData');
        const response = await axios.post(`${HOST}/api/v1/shopee/clickTimeTree`, {
            appId: appId,
            secretKey: secretKey,
            parameters: filter,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: true, message: "Please do filtering dates every 30 seconds only."};
    }
}

const getInitialData = async (filter) => {
    try {
        const { appId, secretKey } = await retrieveLocalStorage('userData');
        console.log(appId);
        const response = await axios.post(`${HOST}/api/v1/shopee/initial`, {
            appId: appId,
            secretKey: secretKey,
            parameters: filter,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: true, message: "Please do filtering dates every 30 seconds only."};
    }
}
export { checkApi, getDashboardReport, getSubIdTree, getClickTimeTree, getInitialData };