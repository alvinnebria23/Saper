import React from 'react';
import { Button, Text, Row, Column, Image, IconButton, Icon, FormControl  } from 'native-base';
import { View } from 'react-native';
import { CENTER_VIEW, BOTTOM_VIEW  } from '../constants/view-component-styles.js';
import useLogin from '../hooks/useLogin';
import useCommon from '../hooks/useCommon';

const RegisterScreen = ({ navigate }) => {
    const { onChangeText, onPress, onPressShowPassword, showPassword, accountFound } = useLogin();
    const { onPressNavigate } = useCommon();

  return (
    <View style={CENTER_VIEW}>
       <Text>Register Screen</Text>
    </View>
  );
};

export default RegisterScreen;