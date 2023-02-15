
import React, { useState } from 'react';
import loginScreenValidation from '../validations/login-screen-validation';

export default useLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [accountFound, setAccountFound] = useState(true);
    const { validateInput } = loginScreenValidation();
    const onSubmit = (data) => {
        if(!validateInput(data['username'], data['password'])){
            setAccountFound(false);
            return;
        }
        setAccountFound(true);
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
