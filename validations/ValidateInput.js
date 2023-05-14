import { alphabetRegex, emailRegex, numericRegex, passwordValidationRegex, removeInvalidNameRegex, removeNonNumericRegex } from "../constants/regex";
import { APP_ID_ERROR_MESSAGE, CONFIRM_PASSWORD_NOT_MATCH_ERROR_MESSAGE, CONTACT_NUMBER_ERROR_MESSAGE, EMAIL_ERROR_MESSAGE, FULLNAME_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE, REQUIRED_PASSWORD_MESSAGE, SECRET_KEY_ERROR_MESSAGE, STEP1, STEP2 } from "../constants/register-screen-constants";

const isValidEmail = (email) => {
    return emailRegex.test(email);
}
const isAlphabetsOnly = (value) => {
    return alphabetRegex.test(value);
}
const isNumericOnly = (value) => {
    return numericRegex.test(value);
}
const validatePassword = (value) => {
    return passwordValidationRegex.test(value);
}
const validateInputObject = (stepNumber, formValues) => {
    let errorInputFields = [];
    // Validate the inputs in step 1
    if(stepNumber === STEP1){
        let { email, fullName, contactNumber, password, confirmPassword } = formValues;
        email = email?.trim();
        fullName = fullName?.replace(removeInvalidNameRegex, '');
        contactNumber = contactNumber?.replace(removeNonNumericRegex, '');
        const emptyInputFields = validateEmptyString({ email, fullName, contactNumber, password, confirmPassword });
        if(emptyInputFields.length !== 0){
            return emptyInputFields;
        }
        if(!isValidEmail(email.trim())){
            errorInputFields.push(EMAIL_ERROR_MESSAGE);
        }
        if(!isAlphabetsOnly(fullName.trim())){
            errorInputFields.push(FULLNAME_ERROR_MESSAGE);
        }
        if(!isNumericOnly(contactNumber)){
            errorInputFields.push(CONTACT_NUMBER_ERROR_MESSAGE);
        }
        if(password.includes(' ')){
            errorInputFields.push(PASSWORD_ERROR_MESSAGE);
        }
        if(confirmPassword.includes(' ')){
            errorInputFields.push(PASSWORD_ERROR_MESSAGE);
        }
        if(!validatePassword(password)){
            errorInputFields.push(REQUIRED_PASSWORD_MESSAGE);
        }
        if(password !== confirmPassword){
            errorInputFields.push(CONFIRM_PASSWORD_NOT_MATCH_ERROR_MESSAGE);
        }
    }else if(stepNumber === STEP2){
        let { appId, secretKey } = formValues;
        appId = appId?.trim();
        secretKey = secretKey?.trim();
        const emptyInputFields = validateEmptyString({ appId, secretKey });
        if(emptyInputFields.length !== 0){
            return emptyInputFields;
        }
        if(appId.includes(' ')){
            errorInputFields.push(APP_ID_ERROR_MESSAGE);
        }
        if(secretKey.includes(' ')){
            errorInputFields.push(SECRET_KEY_ERROR_MESSAGE);
        }
    }
    return errorInputFields;
}
const validateEmptyString = (object) => {
    const emptyInputFields = [];
    for(const item in object){
        if(!object[item]){
            emptyInputFields.push({fieldName: item, errorMessage: 'Please input empty field.'});
        }
    }
    return emptyInputFields;
}
export { isValidEmail, isAlphabetsOnly, isNumericOnly, validateInputObject, validatePassword };