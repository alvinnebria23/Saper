import React, { useState, useContext } from "react";
import { clearLocalStorage, retrieveLocalStorage, setLocalStorage } from "../helpers/storageHelper.js";
import { formatName } from "../util/CommonUtil.js";
import { changeUserInformation } from "../api/UserApi.js";
import { checkApi } from "../api/ShopeeApi.js";
import { UserContext } from "../context";
import { validatePassword } from "../validations/ValidateInput.js";
import { REQUIRED_PASSWORD_MESSAGE } from "../constants/register-screen-constants.js";
import { Box, CheckCircleIcon, CloseIcon, Row, Text, useToast } from "native-base";
export default useAccount = (navigation, setValue, setIsLoading) => {
    const [isEditing, setIsEditing] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalType, setModalType] = useState('password');
    const toast = useToast();
    const accountInfoFields = [
      { name: 'email', label: 'Email', value: userData.email, iconName: 'email' },
      { name: 'fullName', label: 'Fullname', value: formatName(userData.name), iconName: 'folder-account-outline' },
      { name: 'contactNumber', label: 'Mobile number', value: userData.contactNumber, iconName: 'cellphone' },
      { name: 'password', label: 'Password', value:  "*".repeat(userData.password?.length || 10), iconName: 'lock-outline' },
    ];
    
    const apiInfoFields = [
      { name: 'appId', label: 'App Id', value: userData.appId, iconName: 'application-edit-outline' },
      { name: 'secretKey', label: 'Secret Key', value: userData.secretKey, iconName: 'key-outline' },
    ];
    const subscriptionInfoFields = [
      { label: 'Type', value: userData.type?.toUpperCase() || "FREE", iconName: 'none'},
      { label: 'Expiration', value: userData.type?.toUpperCase() === "FREE" ? "N/A" : userData?.expirationDate, iconName: 'none'},
    ];

    const CHANGE_PASSWORD_FIELDS = [
      {
        name: 'oldPassword',
        label: 'Old Password'
      },
      {
        name: 'newPassword',
        label: 'New Password'
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password'
      },
    ];
    const showCustomToast = (type, color, message) => {
      toast.show({
        duration: 10000,
        render: () => {
          return (
            <Box bg={color} px="2" py="1" rounded="sm" mb={5}>
              <Row margin={'2%'}>
                {type === "success" ? <CheckCircleIcon size="5" color="white" /> : <CloseIcon size="5" color="white"  />}
                <Text ml={'3%'} color={'white'}>{message}</Text>
              </Row>
            </Box>
          )
        }
      });
    }
    const onPress = async (action, formValues) => {
      if(action === 'logout'){
        await clearLocalStorage();
        navigation.navigate('Login');
      }
      if(action === 'edit'){
        if(isEditing){
          if(formValues.fullName === userData.name && formValues.contactNumber === userData.contactNumber){
            setIsEditing(false);
            return;
          }
          setIsLoading(true);
          const user = await changeUserInformation(
            { name: formValues.fullName?.replace(/[0-9]/g, ''), contactNumber: formValues.contactNumber?.replace(/[^0-9]/g, '') },
            { id: userData.id },
            "updateDetails"
          );
          if(user.fail){
            setErrorMessage(user.message);
            setIsError(true);
            return;
          }
          user.password = userData.password;
          await clearLocalStorage();
          await setLocalStorage('userData', user);
          setUserData(await retrieveLocalStorage('userData'));
          setIsLoading(false);
          showCustomToast("success", "emerald.500", "Successfully Updated Account Information");
        } else {
          accountInfoFields.map(({ name, value }) => {
            setValue(name, value);
          });
        }
        setIsEditing(!isEditing);
      }
      if(action === 'password'){
        setModalType(action);
        setModalVisible(true);
      }
      if(action === 'updatePassword'){
        setIsError(false);
        setErrorMessage('');
        const { oldPassword, newPassword, confirmPassword } = formValues;
        if(!(oldPassword && newPassword && confirmPassword)){
          setErrorMessage('Please input empty fields.');
          setIsError(true);
          return;
        }
        if(userData.password !== oldPassword){
          setErrorMessage('Old Password is incorrect');
          setIsError(true);
          return;
        }
        if(newPassword !== confirmPassword){
          setErrorMessage('New Password and Confirm Password does not match.');
          setIsError(true);
          return;
        }
        if(!validatePassword(newPassword)){
          setErrorMessage(REQUIRED_PASSWORD_MESSAGE.errorMessage);
          setIsError(true);
          return;
        }
        setModalVisible(false);
        setIsLoading(true);
        const user = await changeUserInformation({ password: newPassword }, { id: userData.id }, action);
        if(user.fail){
          setErrorMessage(user.message);
          setIsError(true);
          return;
        }
        user.password = newPassword;
        await clearLocalStorage();
        await setLocalStorage('userData', user);
        setUserData(await retrieveLocalStorage('userData'));
        CHANGE_PASSWORD_FIELDS.map((item) => setValue(item.name, ""));
        setIsLoading(false);
        showCustomToast("success", "emerald.500", "Successfully Updated New Password");
      } 
      if(action === 'cancel'){
        if(modalType === 'password'){
          CHANGE_PASSWORD_FIELDS.map((item) => {
            setValue(item.name, "");
          });
        }else{
          setValue('secretKey', "");
        }
        setModalVisible(false);
      }
      if(action === 'secretKey'){
        setIsError(false);
        setModalType(action);
        setModalVisible(true);
      }
      if(action === 'updateSecretKey'){
        if(formValues.secretKey === userData.secretKey){
          setErrorMessage('New secret key must be different from the current secret key.');
          setIsError(true);
          return;
        }
        if(!formValues.secretKey){
          setErrorMessage('Please fill in the empty field.');
          setIsError(true);
          return;
        }
        setIsLoading(true);
        setModalVisible(false);
        const response = await checkApi(userData.appId, formValues.secretKey, true, userData.id);
        if(response.fail){
          setErrorMessage(response.message);
          setIsError(true);
          return;
        }
        if(response.success){
          const cloneUserData = {...userData};
          cloneUserData.secretKey = formValues.secretKey;
          const tempUserData = {...cloneUserData};
          await clearLocalStorage();
          await setLocalStorage('userData', tempUserData);
          setUserData(await retrieveLocalStorage('userData'));
          
          setIsLoading(false);
          showCustomToast("success", "emerald.500", `Successfully Updated New Secret Key.\n(Note: Please wait for a minute when fetching data using your new secret key.)`);
        } else {
          setErrorMessage(response.message);
          setIsError(true);
          setIsLoading(false);
          setModalVisible(true);
          return;
        }
        setValue('secretKey', "");
        setModalVisible(false);
      }
    };

    return {
      userData,
      accountInfoFields,
      apiInfoFields,
      subscriptionInfoFields,
      onPress,
      isEditing,
      CHANGE_PASSWORD_FIELDS,
      modalVisible,
      setModalVisible,
      errorMessage,
      isError,
      modalType,
    };
}