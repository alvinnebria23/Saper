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

const loginUser = async (user) => {
    try {
        console.log(HOST);
        const response =  await axios.post(`${HOST}/api/v1/user/loginUser`, {
            user
        });
        return response.data
    } catch (error) {
        console.log(error);
        return false;
    }
}

const checkEmail = async(email) => {
    try {
        const response =  await axios.post(`${HOST}/api/v1/user/checkEmail`, {
            email: email
        });
        return response.data
    } catch (error) {
        console.log(error);
        return false;
    }
}
export { registerUser, loginUser, checkEmail };