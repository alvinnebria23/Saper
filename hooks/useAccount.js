import React , { useState, useContext } from "react";
import { clearLocalStorage } from "../helpers/storageHelper.js";
import { UserContext } from "../context";
import useCommon from "./useCommon.js";
export default useAccount = (navigation, setValue) => {
    const [isEditing, setIsEditing] = useState(false);
    const { userData, setuserData } = useContext(UserContext);
    const { formatName } = useCommon();

    const accountInfoFields = [
      { name: 'email', label: 'Email', value: userData.email, iconName: 'email' },
      { name: 'fullName', label: 'Fullname', value: formatName(userData.name), iconName: 'folder-account-outline' },
      { name: 'contactNumber', label: 'Mobile number', value: userData.contactNumber, iconName: 'cellphone' },
      { name: 'password', label: 'Password', value: "***************", iconName: 'lock-outline' },
    ];
    
    const apiInfoFields = [
      { name: 'appId', label: 'App Id', value: userData.appId, iconName: 'application-edit-outline' },
      { name: 'secretKey', label: 'Secret Key', value: userData.secretKey, iconName: 'key-outline' },
    ];
  
    const subscriptionInfoFields = [
      { label: 'Type', value: 'PREMIUM', iconName: 'none'},
      { label: 'Expiration', value: '12/20/2023', iconName: 'none'},
      { label: 'Monthly', value: 'P399', iconName: 'none' },
    ];

    const onPress = async (action, formValues) => {
      if(action === 'logout'){
        await clearLocalStorage();
        navigation.navigate('Login');
      }
      if(action === 'edit'){
        if(!isEditing){
          accountInfoFields.map(({ name, value }) => {
            setValue(name, value)
          })
        }
        console.log(formValues);
        setIsEditing(!isEditing);
      }
    };

    return {
      userData,
      setuserData,
      accountInfoFields,
      apiInfoFields,
      subscriptionInfoFields,
      onPress,
      isEditing,
    };
}