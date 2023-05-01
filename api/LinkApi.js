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
export { generateAndSaveLink };