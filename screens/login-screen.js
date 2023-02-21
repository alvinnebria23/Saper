import React from 'react';
import { Button, Text, Row, Column, Image, IconButton, Icon, FormControl  } from 'native-base';
import { RoundedButton } from '../components/button';
import { View } from 'react-native';
import { LOGO_STYLES_VIEW, BOTTOM_VIEW, CENTER_SCREEN_VIEW, FORM_STYLES_VIEW  } from '../constants/view-component-styles.js';
import { LeftIconInput } from '../components/input';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { ImageLogo } from '../components/image';
import useLogin from '../hooks/useLogin';
import useCommon from '../hooks/useCommon';

const LoginScreen = ({ navigation }) => {
    const { onSubmit, onPressShowPassword, showPassword, accountFound } = useLogin();
    const { onPressNavigate } = useCommon();
    const { control, handleSubmit } = useForm();

  return (
    <View style={CENTER_SCREEN_VIEW}>
        <View style={LOGO_STYLES_VIEW}>
            <ImageLogo />
        </View>
        <View style={FORM_STYLES_VIEW}>
            <FormControl isInvalid={!accountFound}>
                <Column space={2} alignItems="center">
                    <Controller
                        name='username'
                        control={control}
                        render={({ field : { onChange, value }}) => (
                            <LeftIconInput 
                                placeholder={'Username'}
                                onChange={onChange}
                                value={value}
                                inputLeftElement={<Icon size={4} ml={4} color={'#FF4E00'} as={<Ionicons  name={'person'} />} />}
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
                        Invalid username or password
                    </FormControl.ErrorMessage>
                </Column>
            </FormControl>
            <RoundedButton text={'Log in'} onPress={handleSubmit(onSubmit)} />
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