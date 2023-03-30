import axios from "axios";
import { HOST } from '@env'
const checkApi = async (appId, secretKey) => {
    try {
        await axios.post(`${HOST}/api/v1/shopee/checkApi`, {
            appId, 
            secretKey
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { checkApi };