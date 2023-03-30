import { alphabetRegex, emailRegex, numericRegex, passwordValidationRegex, removeInvalidNameRegex, removeNonNumericRegex } from "../constants/regex";
import { STEP1, STEP2 } from "../constants/register-screen-constants";

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
            errorInputFields.push({ fieldName: 'email', errorMessage: 'Please input valid email.'});
        }
        if(!isAlphabetsOnly(fullName.trim())){
            errorInputFields.push({ fieldName: 'fullName', errorMessage: 'Full name must consist of first and last name only.'});
        }
        if(!isNumericOnly(contactNumber)){
            errorInputFields.push({ fieldName: 'contactNumber', errorMessage: 'Mobile number must consist of numbers only.'});
        }
        if(password.includes(' ')){
            errorInputFields.push({ fieldName: 'password', errorMessage: 'Password does not accept spaces.'});
        }
        if(confirmPassword.includes(' ')){
            errorInputFields.push({ fieldName: 'confirmPassword', errorMessage: 'Confirm password does not accept spaces.'});
        }
        if(!validatePassword(password)){
            errorInputFields.push({ 
                fieldName: 'password', 
                errorMessage: `Password must be:
                - minimum of 7 characters
                - maximum of 15 characters
                - must be alphanumeric`,
            });
        }
        if(password !== confirmPassword){
            errorInputFields.push({ fieldName: 'confirmPassword', errorMessage: 'Password and Confirm password does not match.'});
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
            errorInputFields.push({ fieldName: 'appId', errorMessage: 'App ID does not accept spaces.'});
        }
        if(secretKey.includes(' ')){
            errorInputFields.push({ fieldName: 'secretKey', errorMessage: 'Secret key does not accept spaces.'});
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
export { isValidEmail, isAlphabetsOnly, isNumericOnly, validateInputObject };