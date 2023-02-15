import React from 'react';
import { Button, Text, Row, Column, Image, IconButton, Icon, FormControl  } from 'native-base';
import { RoundedButton } from '../components/button';
import { View } from 'react-native';
import { CENTER_VIEW, BOTTOM_VIEW  } from '../constants/view-component-styles.js';
import { LeftIconInput } from '../components/input';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import useLogin from '../hooks/useLogin';
import useCommon from '../hooks/useCommon';

const LoginScreen = ({ navigation }) => {
    const { onSubmit, onPressShowPassword, showPassword, accountFound } = useLogin();
    const { onPressNavigate } = useCommon();
    const { control, handleSubmit } = useForm();

  return (
    <View style={CENTER_VIEW}>
        <FormControl isInvalid={!accountFound}>
            <Column space={2} alignItems="center">
                <Image 
                    source={require('../assets/sapers-logo-edited.png')}
                    size={'xl'}
                    alt={'Sapers Logo'}
                />
                <Controller
                    name='username'
                    control={control}
                    render={({ field : { onChange, value }}) => (
                        <LeftIconInput 
                            placeholder={'Username'}
                            onChange={onChange}
                            value={value}
                            inputLeftElement={<Icon size={5} ml={4} color={'#FF4E00'} as={<Ionicons  name={'person'} />} />}
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
                            inputLeftElement={<Icon size={5} ml={4} color={'#FF4E00'} as={<Ionicons  name={'lock-closed'} />} />}
                            inputRightElement={showPassword ?   
                                <IconButton 
                                    mr={1}
                                    colorScheme="gray" 
                                    variant={'ghost'} 
                                    _icon={{
                                        as: Ionicons,
                                        name: "eye-off",
                                    }} 
                                    onPress={onPressShowPassword}
                                /> :   
                                <IconButton 
                                    mr={1}
                                    colorScheme="gray" 
                                    variant={'ghost'} 
                                    _icon={{
                                        as: Ionicons,
                                        name: "eye"
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
        <View style={BOTTOM_VIEW}>
            <Row alignItems={'center'}>
                <Text color={'gray.500'}>Don't have account yet ?</Text>
                <Button onPress={onPressNavigate.bind(this, navigation,'Register')} variant={'link'} colorScheme={'red'}> Register </Button>
            </Row>
        </View>
    </View>
  );
};

export default LoginScreen;