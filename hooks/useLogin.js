
import { useEffect, useState } from 'react';
import { retrieveLocalStorage, setLocalStorage } from '../helpers/storageHelper.js'
import { sendResetPasswordReqeust, loginUser } from '../api/UserApi';
import { isValidEmail as validEmail } from '../validations/ValidateInput.js';
export default useLogin = (setUserData, navigation, setValue) => {
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState({ isFound: false, message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [modalObject, setModalObject] = useState({ displayType: "forgotPassword", text: "", buttonText: "Send" });
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const initialLogin = async () => {
            const userData = await retrieveLocalStorage('userData'); 
            if(Object.keys(userData).length !== 0){ 
                setUserData(userData);
                if(userData?.isValidEmail){
                    if(userData?.type){                                      
                        navigation.navigate('Home');
                    }else{                          
                        navigation.navigate("Admin");
                    }    
                }
            }
            setShowSpinner(false);
        };
        initialLogin();
    }, [])

    const onSubmit = async (navigation, data) => {
        if(!(data['email'] && data['password'])){
            setStatus({ isFound: false, message: 'Invalid Email or Password.'})
            return;
        }
        setIsLoading(true);
        const user = {
            email: data['email'].trim(),
            password: data['password'].trim(),
        }
        const response = await loginUser(user);
        setStatus({ isFound: response?.isFound, message: response?.message })
        if(response?.isFound){
            if(!rememberMe){
                setValue('email', '');
                setValue('password', '');
            }
            setUserData(response.user);
            setLocalStorage('userData', response.user);
            if(response?.user?.type){
                setModalVisible(true);
                const welcomeText = "Thank you for being one of the first 100 users that registered to our app. We hope you thoroughly explore and enjoy your 5 day trial period and find our app to be an invaluable addition to your success.";
                if(response.user.isValidEmail){
                    navigation.navigate("Home");
                    setModalObject({
                        text:  welcomeText,
                        displayType: "home",
                        buttonText: "Close",
                    });
                } else {
                    navigation.navigate("Verification");
                    setModalObject({
                        text: welcomeText + " \n\nTo avail your 5 day trial, please verify your email first.",
                        displayType: "verify",
                        buttonText: "Proceed",
                    });
                }
            }else{
                navigation.navigate('Admin');
            }
        }
        setIsLoading(false);
    }

    const onPressShowPassword = () => {
        setShowPassword(!showPassword);
    }
    
    const onPressSend = async (email) => {
        if(modalObject.displayType === "home"){
            setModalVisible(false);
            return;
        }else if(modalObject.displayType === "verify"){
            setModalVisible(false);
            return;
        }
        if(!validEmail(email)){
            setEmailErrorMessage('Please input valid email address.');
            return;
        }
        setIsLoading(true);
        const response = await sendResetPasswordReqeust(email);
        if(!response.isValidEmail){
            setEmailErrorMessage('Email address is not yet verified or registered.');
            setIsLoading(false);
            return;
        }
        await setLocalStorage('passwordRequestObject', response);
        setModalVisible(false);
        setIsLoading(false);
        setStatus({ isFound: false , message: '' });
        setValue('resetPassword', '');
        setEmailErrorMessage('');
        navigation.navigate('Verification');
        return;
    }
    return {
        onSubmit,
        onPressShowPassword,
        showPassword,
        isLoading,
        status,
        modalVisible,
        setModalVisible,
        onPressSend,
        emailErrorMessage,
        setRememberMe,
        setStatus,
        setEmailErrorMessage,
        showSpinner,
        modalObject,
        setModalObject,
    }
}
