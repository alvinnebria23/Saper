import axios from "axios";
import { HOST } from '@env'
const registerUser = async (user) => {
    try {
        const response =  await axios.post(`${HOST}/api/v1/user/registerUser`, {
            user
        });
        return response.data
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { registerUser };