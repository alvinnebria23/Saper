import AsyncStorage from '@react-native-async-storage/async-storage';

const setLocalStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        return;
    }
};
const retrieveLocalStorage = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        if(!jsonValue){
            return {};
        }
        return await JSON.parse(jsonValue);
    } catch (error) {
        return;
    }
};
const clearLocalStorage = async () => {
    try {
        return AsyncStorage.clear();
    } catch (error) {
       return;
    }
};
export { setLocalStorage, retrieveLocalStorage, clearLocalStorage };