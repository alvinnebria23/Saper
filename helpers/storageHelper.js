import AsyncStorage from '@react-native-async-storage/async-storage';

const setLocalStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};
const retrieveLocalStorage = async (key) => {
    try {
        const jsonValue  = JSON.parse(await AsyncStorage.getItem(key));
        return await jsonValue || {};
    } catch (error) {
        console.log(error);
    }
};
const clearLocalStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log(error)
    }
};
export { setLocalStorage, retrieveLocalStorage, clearLocalStorage };
