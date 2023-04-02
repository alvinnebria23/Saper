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
const getConversionReport = async (filter) => {
    try {
        const { appId, secretKey } = await retrieveLocalStorage('userData');
        const response = await axios.post(`${HOST}/api/v1/shopee/conversionReport`, {
            appId: appId,
            secretKey: secretKey,
            parameters: filter,
        });
        if(response.data.errors){
            const errorCode = response.data.errors[0].extensions.code;
            if(errorCode === 11001){
                return { error: true, message: "Please do filtering dates every 30 seconds only."};
            }
            return { error: true, message: "Invalid request. Please check your App Id and Secret Key."};
        }
        return response.data.data.conversionReport.nodes
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { checkApi, getConversionReport };