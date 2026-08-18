import axios from "axios";
import { HOST } from '@env';
import { retrieveLocalStorage } from "../helpers/storageHelper";
import { errorHandler } from "../helpers/errorHandler";
import { versionCode } from "../package.json";

const API_BASE_URL = (HOST || '').replace(/\/$/, '');

const AxiosRequestWithHeaders = async (apiUrl, body) => {
  try {
    const { token } = await retrieveLocalStorage('userData');
    const response = await axios.post(`${API_BASE_URL}/${apiUrl}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-saper-version': versionCode
        },
    });
    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
}

const AxiosRequestWithoutHeaders = async (apiUrl, body) => {
  try {
      const response =  await axios.post(`${API_BASE_URL}/${apiUrl}`, body);
      return response?.data
  } catch (error) {
    return errorHandler(error);
  }
}

export { AxiosRequestWithHeaders, AxiosRequestWithoutHeaders };