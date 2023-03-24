import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { UserContext } from '../context';
const SpinnerScreen = ({ navigation }) => {
    const { userData } = useContext(UserContext);

    useEffect(() => {
        setTimeout(() => {
            if(Object.keys(userData).length !== 0){
                navigation.navigate('Home');
            }else{
                navigation.navigate('Login');
            }
        }, 2000); 
      }, []);
      
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF4E00" />
    </View>
  );
};

export default SpinnerScreen;