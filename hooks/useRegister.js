import React , { useEffect, useState } from "react";
import { REGISTRATION_FAILED, REGISTRATION_SUCESS, STEP1, STEP2, STEP3 } from "../constants/register-screen-constants.js";
import { validateInputObject } from "../validations/ValidateInput.js";
import { checkApi } from "../api/ShopeeApi.js";
import { registerUser } from "../api/UserApi.js";
export default useRegister = ({ setValue, navigation }) => {
    const [errorInputFields, setErrorInputFields] = useState([]);
    const [isConfirm, setIsConfirm] = useState(false);
    const [status, setStatus] = useState({});
    const onPressNext = async (stepNumber, formValues) => {
        if(stepNumber === STEP1){
            const { email, fullName, contactNumber, password, confirmPassword } = formValues;
            const errorFields = validateInputObject(STEP1, { email, fullName, contactNumber, password, confirmPassword });
            setErrorInputFields(errorFields);
        }
        if(stepNumber === STEP2){
            const { appId, secretKey } = formValues;
            const errorFields = validateInputObject(STEP2, { appId, secretKey });
            if(errorFields.length === 0){
                const response = await checkApi(appId, secretKey);
                if(!response.success){
                    const status = {
                        header: 'Error message',
                        body: response.message,
                        isOpen: true,
                    };
                    setStatus(status);
                }else{
                    setIsConfirm(true);
                }
            }
            setErrorInputFields(errorFields);
        }
        if(stepNumber === STEP3){
            const { email, fullName, contactNumber, password, appId, secretKey } = formValues;
            const user = await registerUser({ email, fullName, contactNumber, password, appId, secretKey });
            if(user.isValidEmail){
                setStatus(REGISTRATION_FAILED);
            }else{
                setStatus(REGISTRATION_SUCESS);
            }
            
        }
    };
    const onPressPrevious = (stepNumber) => {
        
    };
    const onPressClearButton = (fieldName) => {
        setValue(fieldName, '');
    }
    const onCloseDialog = () => {
        if(status?.header?.toLowerCase().includes('success')){
            navigation.navigate('Login');
        }
        setStatus(prevState => ({
            ...prevState,
            isOpen: false
        }));
    }
    return {
        onPressNext,
        errorInputFields,
        onPressClearButton,
        onPressPrevious,
        status,
        onCloseDialog,
        isConfirm
    };
};