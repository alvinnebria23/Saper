
import React, { useState } from 'react';
import loginScreenValidation from '../validations/login-screen-validation';
import { setLocalStorage } from '../helpers/storageHelper';
export default useLogin = (setUserData) => {
    const [showPassword, setShowPassword] = useState(false);
    const [accountFound, setAccountFound] = useState(true);
    const { validateInput } = loginScreenValidation();

    const onSubmit = (navigation, data) => {
        if(!validateInput(data['username'], data['password'])){
            setAccountFound(false);
            return;
        }
        const value = {
            username: data['username'],
            password: data['password'],
        }
        setUserData(value);
        setLocalStorage('userData', value);
        setAccountFound(true);
        navigation.navigate('Home');
    }

    const onPressShowPassword = () => {
        setShowPassword(!showPassword);
    }
    
    return {
        onSubmit,
        onPressShowPassword,
        showPassword,
        accountFound,
    }
}
