import { AxiosRequestWithHeaders } from "../helpers/axiosRequest";
import { retrieveLocalStorage } from "../helpers/storageHelper";

const getAllUsers = async () => {
    const { type } = await retrieveLocalStorage('userData');
    const response = await AxiosRequestWithHeaders('api/v1/admin/getAllUsers',{ type });
    return response;
}

const updateUserToken = async (appId, type, userId) => {
    const response = await AxiosRequestWithHeaders('api/v1/admin/updateUserToken', { type, appId, userId });
    return response;
}

const getAnalysis = async (targetMonth) => {
    const response = await AxiosRequestWithHeaders('api/v1/admin/getAnalysis', { targetMonth });
    return response;
}


export { getAllUsers, updateUserToken, getAnalysis };