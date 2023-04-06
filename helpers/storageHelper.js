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
        await AsyncStorage.clear();
    } catch (error) {
        console.log(error)
    }
};
export { setLocalStorage, retrieveLocalStorage, clearLocalStorage };
