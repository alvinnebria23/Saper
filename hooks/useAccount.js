import React , { useState, useEffect } from "react";
import { clearLocalStorage, retrieveLocalStorage } from "../helpers/storageHelper.js";
import UserContext from "../context/UserContextProvider.js";
import { useContext } from "react";
import useCommon from "./useCommon.js";
export default useAccount = (navigation) => {
    const [isEditing, setIsEditing] = useState(false);
    const { userData, setuserData } = useContext(UserContext);
    const { formatName } = useCommon();

    const accountInfoFields = [
      { label: 'Email', value: userData.email, iconName: 'email' },
      { label: 'Fullname', value: formatName(userData.name), iconName: 'folder-account-outline' },
      { label: 'Mobile number', value: userData.contactNumber, iconName: 'cellphone' },
      { label: 'Password', value: "***************", iconName: 'lock-outline' },
    ];
    
    const apiInfoFields = [
      { label: 'App Id', value: userData.appId, iconName: 'application-edit-outline' },
      { label: 'Secret Key', value: userData.secretKey, iconName: 'key-outline' },
    ];
  
    const subscriptionInfoFields = [
      { label: 'Type', value: 'PREMIUM', iconName: 'none'},
      { label: 'Expiration', value: '12/20/2023', iconName: 'none'},
      { label: 'Monthly', value: 'P399', iconName: 'none' },
    ];

    const onPress = (action) => {
      if(action === 'logout'){
        clearLocalStorage();
        navigation.navigate('Login');
      }
      if(action === 'edit'){
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