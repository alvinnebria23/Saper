import React , { useEffect, useState } from "react";
import { STEP1, STEP2 } from "../constants/register-screen-constants.js";
import { validateInputObject } from '../validations/ValidateInput.js';
import { checkApi } from '../controllers/ShopeeController.js';
export default useRegister = ({ setValue, navigation }) => {
    const [errorInputFields, setErrorInputFields] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
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
                if(!response){
                    setIsOpen(true);
                }else{
                    setIsConfirm(true);
                }
            }
            setErrorInputFields(errorFields);
        }
    };
    const onPressPrevious = (stepNumber) => {
        console.log(stepNumber);
    };
    const onPressClearButton = (fieldName) => {
        setValue(fieldName, '');
    }
    const onCloseDialog = () => {
        setIsOpen(false);
    }
    return {
        onPressNext,
        errorInputFields,
        onPressClearButton,
        onPressPrevious,
        isOpen,
        onCloseDialog,
        isConfirm
    };
};