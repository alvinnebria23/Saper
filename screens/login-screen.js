import React, { useContext, useEffect } from 'react';
import { Button, Text, Row, Column, IconButton, Icon, FormControl  } from 'native-base';
import { RoundedButton } from '../components/button';
import { View } from 'react-native';
import { LOGO_STYLES_VIEW, BOTTOM_VIEW, CENTER_SCREEN_VIEW, FORM_STYLES_VIEW  } from '../constants/view-component-styles.js';
import { LeftIconInput } from '../components/input';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { ImageLogo } from '../components/image';
import { UserContext } from '../context';
import useLogin from '../hooks/useLogin';
import useCommon from '../hooks/useCommon';
const LoginScreen = ({ navigation }) => {
    const { userData, setUserData } = useContext(UserContext);
    const { onSubmit, onPressShowPassword, showPassword, isLoading , status} = useLogin(setUserData);
    const { onPressNavigate } = useCommon();
    const { control, handleSubmit } = useForm();

    useEffect(() => {
        if(Object.keys(userData).length !== 0){
            navigation.navigate('Home');
        }
    }, [])

  return (
    <View style={CENTER_SCREEN_VIEW}>
        <View style={LOGO_STYLES_VIEW}>
            <ImageLogo />
        </View>
        <View style={FORM_STYLES_VIEW}>
            <FormControl isInvalid={!status?.isFound}>
                <Column space={2} alignItems="center">
                    <Controller
                        name='email'
                        control={control}
                        render={({ field : { onChange, value }}) => (
                            <LeftIconInput 
                                placeholder={'Email'}
                                onChange={onChange}
                                value={value}
                                inputLeftElement={<Icon size={4} ml={4} color={'#FF4E00'} as={<MaterialCommunityIcons  name={'email'} />} />}
                            />
                        )}
                    />
                    <Controller
                        name={'password'}
                        control={control}
                        render={({ field: { onChange, value }}) => (
                            <LeftIconInput 
                                placeholder={'Password'}
                                onChange={onChange}
                                type={showPassword ? 'text' : 'password'}
                                value={value}
                                inputLeftElement={<Icon size={4} ml={4} color={'#FF4E00'} as={<Ionicons  name={'lock-closed'} />} />}
                                inputRightElement={showPassword ?   
                                    <IconButton 
                                        mr={1}
                                        colorScheme="gray" 
                                        variant={'ghost'} 
                                        _icon={{
                                            as: Ionicons,
                                            name: "eye-off",
                                            size: '4'
                                        }} 
                                        onPress={onPressShowPassword}
                                    /> :   
                                    <IconButton 
                                        mr={1}
                                        colorScheme="gray" 
                                        variant={'ghost'} 
                                        _icon={{
                                            as: Ionicons,
                                            name: "eye",
                                            size: '4'
                                        }} 
                                        onPress={onPressShowPassword}
                                    />
                                }
                            />
                        )}
                    />
                    <FormControl.ErrorMessage>
                        {status?.message}
                    </FormControl.ErrorMessage>
                </Column>
            </FormControl>
            <RoundedButton 
                text={'Log in'} 
                onPress={handleSubmit(onSubmit.bind(this, navigation))} 
                isLoading={isLoading}
            />
        </View>
        <View style={BOTTOM_VIEW}>
            <Row alignItems={'center'}>
                <Text color={'gray.500'}>Don't have account yet ?</Text>
                <Button onPress={onPressNavigate.bind(this, navigation,'Register')} variant={'link'} colorScheme={'orange'}> Register </Button>
            </Row>
        </View>
    </View>
  );
};

export default LoginScreen;