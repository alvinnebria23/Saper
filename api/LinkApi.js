import { retrieveLocalStorage } from "../helpers/storageHelper";
import { AxiosRequestWithHeaders } from "../helpers/axiosRequest";
const generateAndSaveLink = async (originalUrl, subIds) => {    
    const { appId, secretKey } = await retrieveLocalStorage('userData');
    const response = await AxiosRequestWithHeaders('api/v1/link/generateAndSaveLink', {
        appId,
        secretKey,
        originalUrl,
        subIds,
    });
    return response;
}

const retrieveGeneratedLinks = async () => {
    const { id } = await retrieveLocalStorage('userData');
    const response = await AxiosRequestWithHeaders('api/v1/link/retrieveGeneratedLinks', { userId: id });
    return response;
}

const updateLink = async (data, where) => {
    const response = await AxiosRequestWithHeaders('api/v1/link/updateLink', {
        data: data,
        where: { where: where }       
    });
    return response;
}

const removeLinks = async (where) => {
    const response = await AxiosRequestWithHeaders('api/v1/link/removeLinks', {
        where: { where: where }       
    });
    return response;
}


export { generateAndSaveLink, retrieveGeneratedLinks, updateLink, removeLinks };