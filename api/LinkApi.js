import axios from "axios";
import { HOST } from '@env'
import { retrieveLocalStorage } from "../helpers/storageHelper";
const generateAndSaveLink = async (originalUrl, subIds) => {
    try {
        const { appId, secretKey, token } = await retrieveLocalStorage('userData');
        const response =  await axios.post(`${HOST}/api/v1/link/generateAndSaveLink`, {
            appId,
            secretKey,
            originalUrl,
            subIds,
        },{
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const retrieveGeneratedLinks = async () => {
    try {
        const { id, token} = await retrieveLocalStorage('userData');
        const response =  await axios.post(`${HOST}/api/v1/link/retrieveGeneratedLinks`, { userId: id }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response?.data?.shopeeLinks;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateLink = async (data, where) => {
    try {
        const { userId, token  } = await retrieveLocalStorage('userData');
        where.userId = userId;
        const response =  await axios.post(`${HOST}/api/v1/link/updateLink`, {
            data: data,
            where: { where: where }       
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const removeLinks = async (where) => {
    try {
        const { userId, token } = await retrieveLocalStorage('userData');
        where.userId = userId;
        const response =  await axios.post(`${HOST}/api/v1/link/removeLinks`, {
            where: { where: where }       
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export { generateAndSaveLink, retrieveGeneratedLinks, updateLink, removeLinks };