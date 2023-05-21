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

export const BOLD_TEXT = [
   `Terms and Conditions` ,
    `1.Use of the App`,
    `2.App Functionality`,
    `3.User Responsibilities`,
    `4.Intellectual Property`,
    `5.Limitation of Liability`,
    `6.Modifications and Termination`,
    `Privacy Policy`,
    `1. Information We Collect`,
    `2. How We Use Your Information`,
    `3. How We Share Your Information`,
    `4. Data Security`,
    `5. Your Choices`,
    `5.3. Children's Privacy`,
];
export const TERMS_AND_CONDITIONS = `{0}
These terms and conditions govern the use of the Sapers mobile app, provided by SPXC Tech Development. By downloading, installing, or using the App, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you should refrain from using the App.

{1}
1.1 Eligibility: You must be at least 18 years old or have the necessary legal authority to enter into these Terms on behalf of an organization to use the App.
1.2 License: Subject to compliance with these Terms, Provider grants you a limited, non-exclusive, non-transferable license to download, install, and use the App solely for lawful and personal purposes.
1.3 User Account: To access certain features of the App, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

{2}
2.1 Description: The App provides affiliate monitoring services, allowing users to track and analyze affiliate marketing campaigns and related metrics.
2.2 Accuracy of Information: While Provider strives to provide accurate and up-to-date information, the App's content and functionality may contain errors, inaccuracies, or outdated data. App only relies to the application programming interface source of an affiliate platform. You acknowledge that the use of any information or data obtained through the App is at your own risk.

{3}
3.1 Compliance: You agree to use the App in compliance with all applicable laws, regulations, and these Terms.
3.2 Data Accuracy: You are responsible for the accuracy, completeness, and legality of any data or information you provide through the App.
3.3 Prohibited Activities: You must not use the App to engage in any activity that is unlawful, harmful, fraudulent, or infringes upon the rights of others. This includes but is not limited to unauthorized access, data scraping, spamming, or distributing malware.

{4}
4.1 Ownership: The App and all intellectual property rights, including copyrights, trademarks, and trade secrets, are owned by Provider or its licensors.
4.2 Restrictions: You shall not copy, modify, distribute, sell, lease, sublicense, or create derivative works based on the App or any part thereof, except as expressly permitted by these Terms.

{5}
5.1 Disclaimer: The App is provided on an "as is" and "as available" basis. Provider does not warrant the accuracy, reliability, or availability of the App or its content. Sapers is only a third party and doesn’t claim to be an official partner of any affiliate companies. Your use of the App is at your own risk.
5.2 Indemnification: You agree to indemnify, defend, and hold Provider harmless from any claims, losses, liabilities, damages, or expenses arising from your use of the App or any breach of these Terms.

{6}
6.1 Modifications: Provider reserves the right to modify, update, or discontinue the App or its features at any time without prior notice.
6.2 Termination: Provider may terminate or suspend your access to the App, in whole or in part, for any reason or no reason, without liability.
6.3 Payments : No refund or cancellation fee for those who subscribes the app.

{7}
This Privacy Policy explains how Sapers ("we," "us," or "our") collects, uses, and protects the personal information of users ("you" or "your") who use the Sapers mobile application ("App") for affiliate monitoring. By using our App, you consent to the practices described in this Privacy Policy.

{8}
1.1. Personal Information:
We may collect the following types of personal information when you use our App:
a) Contact Information: Your email address, and phone number,fullname, APPID and Secret Key which you may provide during account registration or through communication with us.
b) Affiliate Tracking Data: Information related to your affiliate marketing activities, such as click-throughs, conversions, and earnings. This information may include affiliate links, referral URLs, and associated data.
1.2 Non-Personal Information
We may collect non-personal information automatically as you interact with our App. This information includes:
a) Affiliate links : Links generated by the users for tracking and history purposes. Details about the links, sub-id and name assign for each generated link.

{9}
2.1. Personal Information:
We use the personal information we collect to:
a) Create a sapers account to access the necessary conversion reports.
b) API : Retrieve and call the source data for accurate reports.
c) Communicate with you regarding your account, updates, and changes to our services.
d) Respond to your inquiries and support requests.
e) Send you promotional or marketing materials, only if you have opted-in to receive such communications.
2.2. Non-Personal Information:
Non-personal information is used to:
a) Save the affiliate links generated by the users for them to easily retreive and recall the links they created.
b) Analyze and enhance the functionality of the App.

{10}
3.1. Third-Party Service Providers:
We may share your personal information with trusted third-party service providers who assist us in operating and maintaining the App. These service providers are bound by confidentiality agreements and only process your information as instructed by us.
3.2. Legal Compliance and Protection:
We may disclose your personal information to comply with applicable laws, regulations, or legal processes. Additionally, we may disclose your information to protect our rights, property, or safety, or that of our users or others.
3.3. Aggregated and Anonymized Data:
We may aggregate and anonymize your personal and non-personal information for statistical and analytical purposes. This aggregated and anonymized data does not personally identify you and may be shared with third parties.

{11}
We take reasonable measures to protect your personal information from unauthorized access, loss, misuse, or alteration. However, please note that no data transmission over the internet or electronic storage method is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.

{12}
5.1. Account Information:
You can review, update, or delete your account information by contacting us through the provided contact details.
5.2. Marketing Communications:
You can choose to opt-out of receiving promotional emails or push notifications from us by following the instructions provided in the communication or contacting us directly.

{13}
Our App is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18 years old.
`;

export const TERM_AND_CONDITiONS_OBJECT = {
    sentence: TERMS_AND_CONDITIONS,
    boldText: BOLD_TEXT
}