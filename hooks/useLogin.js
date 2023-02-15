
import React, { useState } from 'react';

export default useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [accountFound, setAccountFound] = useState(true);
    const onPress = () => {
        username && password ? setAccountFound(true) : setAccountFound(false);
    }
    
    const onChangeText = (label, text) => {
        label === 'username' ? setUsername(text) : setPassword(text);
    }

    const onPressShowPassword = () => {
        setShowPassword(!showPassword);
    }
    
    return {
        onPress,
        onChangeText,
        onPressShowPassword,
        showPassword,
        accountFound,
    }
}
