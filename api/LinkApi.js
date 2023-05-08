import axios from "axios";
import { HOST } from '@env'
import { retrieveLocalStorage } from "../helpers/storageHelper";
const generateAndSaveLink = async (originalUrl, subIds) => {
    try {
        const { appId, secretKey } = await retrieveLocalStorage('userData');
        const response =  await axios.post(`${HOST}/api/v1/link/generateAndSaveLink`, {
            appId,
            secretKey,
            originalUrl,
            subIds,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const retrieveGeneratedLinks = async () => {
    try {
        const { id } = await retrieveLocalStorage('userData');
        const response =  await axios.post(`${HOST}/api/v1/link/retrieveGeneratedLinks`, { userId: id });
        return response?.data?.shopeeLinks;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateLink = async (data, where) => {
    try {
        const { userId } = await retrieveLocalStorage('userData');
        where.userId = userId;
        const response =  await axios.post(`${HOST}/api/v1/link/updateLink`, {
            data: data,
            where: { where: where }       
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const removeLinks = async (where) => {
    try {
        const { userId } = await retrieveLocalStorage('userData');
        where.userId = userId;
        const response =  await axios.post(`${HOST}/api/v1/link/removeLinks`, {
            where: { where: where }       
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export { generateAndSaveLink, retrieveGeneratedLinks, updateLink, removeLinks };