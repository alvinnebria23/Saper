import axios from "axios";
import { HOST } from '@env'
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

export { checkApi };