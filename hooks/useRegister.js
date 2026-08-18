import React , { useState } from "react";
import { EMAIL_ALREADY_TAKEN_MESSAGE, NETWORK_ERROR, REGISTRATION_FAILED, REGISTRATION_SUCESS, STEP1, STEP2, STEP3 } from "../constants/register-screen-constants.js";
import { validateInputObject } from "../validations/ValidateInput.js";
import { checkApi } from "../api/ShopeeApi.js";
import { registerUser, checkEmail } from "../api/UserApi.js";
export default useRegister = ({ setValue, navigation }) => {
    const [errorInputFields, setErrorInputFields] = useState([]);
    const [isConfirm, setIsConfirm] = useState(false);
    const [status, setStatus] = useState({});
    const [spinnerObject, setSpinnerObject] = useState({ isLoading: false, message: '' });
    const [modalVisible, setModalVisible] = useState(true);
    const [modalType, setModalType] = useState("policy");
    const [isAccepted, setIsAccepted] = useState(false);
    const [isLegalAge, setIsLegalAage] = useState(false);

    const onPressTermsAndConditions = (action) => {
        if(action === 'accept'){
            setModalVisible(false);
        } else {
            if(modalType === "tutorial"){
                setModalVisible(false);
            }else{
                navigation.navigate('Login');
            }
        }
    }
    
    const onPressTutorial = () => {
        setModalVisible(!modalVisible);
        setModalType("tutorial");
    }

    const onChangeSelect = (name, value) => {
        if(name === 'terms'){
            setIsAccepted(value);
        } else {
            setIsLegalAage(value);
        }
    }

    const onPressNext = async (stepNumber, formValues) => {
        if(stepNumber === STEP1){
            const { email, fullName, contactNumber, password, confirmPassword } = formValues;
            const errorFields = validateInputObject(STEP1, { email, fullName, contactNumber, password, confirmPassword });
            if(!errorFields.length){
                setSpinnerObject({ isLoading: true, message: 'Checking Email...' });
                const response = await checkEmail(email);
                if(response?.isTaken){
                    errorFields.push(EMAIL_ALREADY_TAKEN_MESSAGE);
                }
                if(response?.fail){
                    errorFields.push(NETWORK_ERROR);
                    const status = {
                        header: 'Error message',
                        body: "Network Error",
                        isOpen: true,
                    };
                    setStatus(status);
                }
                setSpinnerObject({ isLoading: false, message: '' });
            }
            setErrorInputFields(errorFields);
        }
        if(stepNumber === STEP2){
            const { appId, secretKey } = formValues;
            const errorFields = validateInputObject(STEP2, { appId, secretKey });
            if(errorFields.length === 0){
                setSpinnerObject({ isLoading: true, message: 'Verifying API...' });
                const response = await checkApi(appId, secretKey, false);
                if(!response?.success){
                    const status = {
                        header: 'Error message',
                        body: response?.message,
                        isOpen: true,
                    };
                    setStatus(status);
                }else{
                    setIsConfirm(true);
                }
                setSpinnerObject({ isLoading: false, message: '' });
            }
            setErrorInputFields(errorFields);
        }
        if(stepNumber === STEP3){
            const { email, fullName, contactNumber, password, appId, secretKey } = formValues;
            setSpinnerObject({ isLoading: true, message: 'Saving Account Information . . .' });
            const user = await registerUser({ email, fullName, contactNumber, password, appId, secretKey });
            if(user){
                setStatus(REGISTRATION_SUCESS);
            }else{
                setStatus(REGISTRATION_FAILED);
            }
            setSpinnerObject({ isLoading: false, message: '' });
        }
    };
    const onPressBack = () => {
        navigation.navigate('Login');
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
        onPressBack,
        status,
        onCloseDialog,
        isConfirm,
        spinnerObject,
        modalVisible,
        onPressTermsAndConditions,
        onChangeSelect,
        isAccepted,
        isLegalAge,
        onPressTutorial,
        modalType,
    };
};