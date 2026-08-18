import { retrieveLocalStorage } from "../helpers/storageHelper";
import { AxiosRequestWithHeaders, AxiosRequestWithoutHeaders } from "../helpers/axiosRequest";
const checkApi = async (appId, secretKey, isUpdate, id) => {
    const response = await AxiosRequestWithoutHeaders('api/v1/shopee/checkApi', {
        id,
        isUpdate,
        appId, 
        secretKey
    });
    return response;
}

const getDashboardReport = async (filter) => {
    const { appId, secretKey } = await retrieveLocalStorage('userData');
    const response = await AxiosRequestWithHeaders('api/v1/shopee/dashboard', {
        appId: appId,
        secretKey: secretKey,
        parameters: filter,
    });
    return response;
}

const getSubIdTree = async (filter) => {
    const { appId, secretKey } = await retrieveLocalStorage('userData');
    const response = await AxiosRequestWithHeaders('api/v1/shopee/subIdTree', {
        appId: appId,
        secretKey: secretKey,
        parameters: filter,
    });
    return response;
}

const getClickTimeTree = async (filter) => {
    const { appId, secretKey } = await retrieveLocalStorage('userData');
    const response = await AxiosRequestWithHeaders('api/v1/shopee/clickTimeTree', {
        appId: appId,
        secretKey: secretKey,
        parameters: filter,
    });
    return response;
}

const getInitialData = async (filter) => {
    const { appId, secretKey } = await retrieveLocalStorage('userData');
    const response = await AxiosRequestWithHeaders('api/v1/shopee/initial', {
        appId: appId,
        secretKey: secretKey,
        parameters: filter,
    });
    return response;
}

export { 
    checkApi, 
    getDashboardReport, 
    getSubIdTree, 
    getClickTimeTree, 
    getInitialData 
};