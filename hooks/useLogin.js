
import React, { useState } from 'react';
import loginScreenValidation from '../validations/login-screen-validation';
import { setLocalStorage } from '../helpers/storageHelper.js'
import { loginUser } from '../api/UserApi';
export default useLogin = (setUserData) => {
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState({ isFound: false, message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { validateInput } = loginScreenValidation();

    const onSubmit = async (navigation, data) => {
        if(!validateInput(data['email'], data['password'])){
            setStatus({ isFound: false, message: 'Invalid Email or Password.'})
            return;
        }
        setIsLoading(true);
        const user = {
            email: data['email'],
            password: data['password'],
        }
        const response = await loginUser(user);
        setStatus(response)
        if(response?.isFound){
            setUserData(response.user);
            setLocalStorage('userData', response.user);
            navigation.navigate('Home')
        }
        setIsLoading(false);
    }

    const onPressShowPassword = () => {
        setShowPassword(!showPassword);
    }
    
    return {
        onSubmit,
        onPressShowPassword,
        showPassword,
        isLoading,
        status
    }
}
