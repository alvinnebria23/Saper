export const INIT_ACCOUNT_INFORMATION_INPUTS = [
    {
        name: 'email',
        placeHolder: 'E-mail',
        iconName: 'email-outline',
    },
    {
        name: 'fullName',
        placeHolder: 'Full name',
        iconName: 'folder-account-outline',
    },
    {
        name: 'contactNumber',
        placeHolder: 'Mobile number',
        iconName: 'cellphone',
    },
    {
        name: 'password',
        placeHolder: 'Password',
        iconName: 'lock-outline',
    },
    {
        name: 'confirmPassword',
        placeHolder: 'Confirm password',
        iconName: 'lock-open-outline',
    },
];

export const INIT_API_INPUTS = [
    {
        name: 'appId',
        placeHolder: 'App ID',
        iconName: 'application-edit-outline',
    },
    {
        name: 'secretKey',
        placeHolder: 'Secret key',
        iconName: 'key-outline',
    }
];

export const PROGRESS_STEPS_STYLE = {
    topOffset: 0,
    marginBottom: 25,
    activeStepIconBorderColor: '#FF4E00',
    activeLabelColor: '#FF4E00',
    activeStepNumColor: '#FF4E00',
    activeStepIconColor: 'white',
    completedStepIconColor: '#FF4E00',
    completedProgressBarColor: '#FF4E00',
    completedCheckColor: 'white',
};

export const PROGRESS_BUTTON_TEXT_STYLE = {
    color: '#FF4E00',
    fontWeight: 'thin'
};

export const CARD_CONTAINER = {
    flex: 1,
    margin: 16,
    alignItems: 'center', 
  }
export const CARDVIEW_STYLE = {
    height: '100%',
    width: '100%',
  };

export const REGISTRATION_SUCESS = {
    header: 'Success',
    body: 'You have successfully registered. Please click the link we have sent to your email within 7 days to verify and complete the registration.',
    isOpen: true,
};
export const REGISTRATION_FAILED = {
    header: 'Error',
    body:'Email is already taken.',
    isOpen: true,
};
export const EMAIL_ERROR_MESSAGE = { fieldName: 'email', errorMessage: 'Please input valid email.'};
export const FULLNAME_ERROR_MESSAGE = { fieldName: 'fullName', errorMessage: 'Full name must consist of first and last name only.'};
export const CONTACT_NUMBER_ERROR_MESSAGE = { fieldName: 'contactNumber', errorMessage: 'Mobile number must consist of numbers only.'};
export const PASSWORD_ERROR_MESSAGE = { fieldName: 'password', errorMessage: 'Password does not accept spaces.'};
export const CONFIRM_PASSWORD_ERROR_MESSAGE = { fieldName: 'confirmPassword', errorMessage: 'Confirm password does not accept spaces.'};
export const REQUIRED_PASSWORD_MESSAGE = { 
    fieldName: 'password', 
    errorMessage: `Password must be:
    - minimum of 7 characters
    - maximum of 15 characters
    - must be alphanumeric`,
};
export const CONFIRM_PASSWORD_NOT_MATCH_ERROR_MESSAGE = { fieldName: 'confirmPassword', errorMessage: 'Password and Confirm password does not match.'};
export const APP_ID_ERROR_MESSAGE = { fieldName: 'appId', errorMessage: 'App ID does not accept spaces.'};
export const SECRET_KEY_ERROR_MESSAGE = { fieldName: 'secretKey', errorMessage: 'Secret key does not accept spaces.'};
export const EMAIL_ALREADY_TAKEN_MESSAGE = { fieldName: 'email', errorMessage: 'Email is already taken.'};
export const STEP1 = 1;
export const STEP2 = 2;
export const STEP3 = 3;