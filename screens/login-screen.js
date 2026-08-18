import React, { useContext } from 'react';
import { Text, Row, Column, IconButton, Icon, FormControl, ScrollView, Modal, Checkbox, Center, Spinner  } from 'native-base';
import { LinkButton, RoundedButton } from '../components/button';
import { View } from 'react-native';
import { LOGO_STYLES_VIEW, BOTTOM_VIEW, CENTER_SCREEN_VIEW, FORM_STYLES_VIEW  } from '../constants/view-component-styles.js';
import { LeftIconInput } from '../components/input';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { ImageLogo } from '../components/image';
import { UserContext } from '../context';
import { onPressNavigate } from '../util/CommonUtil.js';
import { isValidEmail } from '../validations/ValidateInput.js';
import useLogin from '../hooks/useLogin';
import { Toaster } from 'react-native-customizable-toast';
const LoginScreen = ({ navigation }) => {
    const { setUserData } = useContext(UserContext);    
    const { control, handleSubmit, setValue } = useForm();
    const { 
        onSubmit,
        onPressShowPassword, 
        showPassword, 
        isLoading, 
        status,
        modalVisible,
        setModalVisible,
        onPressSend,
        emailErrorMessage,
        setRememberMe,
        setStatus,
        setEmailErrorMessage,
        showSpinner,
        modalObject,
        setModalObject
    } = useLogin(setUserData, navigation, setValue);

  return (
    <ScrollView style={CENTER_SCREEN_VIEW}>
        <Toaster />
        {showSpinner ? 
        <View style={{ marginTop: '100%' }}>
            <Spinner size={'lg'} color={'red.500'} />
        </View> : 
        <>
        <View style={LOGO_STYLES_VIEW}>
            {!modalVisible && <ImageLogo />}
        </View>
           <View style={FORM_STYLES_VIEW} pointerEvents={isLoading ? 'none' : 'auto'}>
            <FormControl isInvalid={!status?.isFound}>
                <FormControl.ErrorMessage>
                    <Text fontSize={'12'} color={status?.isFound ? '#f2f2f2' : 'red.500'}> {status?.message} </Text>
                </FormControl.ErrorMessage>
                <Column space={2} alignItems="center" mt={'2%'}>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field : { onChange, value }}) => (
                            <LeftIconInput 
                                placeholder={'Email'}
                                onChange={onChange}
                                value={value}
                                variant={'filled'}
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
                                variant={'filled'}
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
                </Column>
            </FormControl>
            <View>
                <Checkbox 
                    colorScheme={'orange'} 
                    mt={'5%'} 
                    size={'sm'} 
                    onChange={(value) => setRememberMe(value)}
                    ml={'3%'}
                >
                    <Text style={{ color: 'gray' }}>Remember Me</Text>
                </Checkbox>
            </View>
            <RoundedButton 
                text={'Log in'} 
                onPress={handleSubmit(onSubmit.bind(this, navigation))} 
                isLoading={isLoading}
            />
            <Center>
                <LinkButton 
                    fontSize={'xs'} 
                    text={'Forgot password ?'} 
                    style={{ marginTop: '10%' }}
                    onPress={() => {
                        setModalObject({ 
                            displayType: "forgotPassword", 
                            text: "Enter registered email address and we'll send an OTP(One-Time Password) to reset your password.",
                            buttonText: "Send",
                        })
                        setModalVisible(true);
                        setStatus({ isFound: false, message: '' });
                    }}
                />
            </Center>
            </View>
            <View style={BOTTOM_VIEW} pointerEvents={isLoading ? 'none' : 'auto'}>
                <Row alignItems={'center'}>
                    <Text color={'gray.500'}>Don't have account yet ?</Text>
                    <LinkButton 
                        fontSize={'sm'} 
                        text={'Register'} 
                        onPress={onPressNavigate.bind(this, navigation,'Register')}
                        style={{ marginLeft: '3%' }}
                    />
                </Row>
            </View> 
        </>} 
        <Modal 
            isOpen={modalVisible} 
            onClose={() => {
                setModalVisible(false);
                setEmailErrorMessage('');
                setValue('resetPassword');
            }} 
            avoidKeyboard 
            bottom="4" 
            size="lg"
        >
            <Modal.Content>
            {modalObject.displayType === "forgotPassword" && 
            <>
                <Modal.CloseButton disabled={isLoading}/>
                <Modal.Header>Forgot Password?</Modal.Header>
            </>}
            <Modal.Body marginBottom={modalObject.displayType === "forgotPassword" ? "0" : '10%'}>
                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                    <ImageLogo />
                </View>
                <Text>{modalObject.text}</Text>
                {modalObject.displayType === "forgotPassword" && 
                <FormControl mt="3" isInvalid={isValidEmail}>
                <Controller
                    name='resetPassword'
                    control={control}
                    render={({ field : { onChange, value }}) => (
                        <LeftIconInput 
                            placeholder={'Email'}
                            onChange={onChange}
                            value={value}
                            variant={'filled'}
                            marginBottom={'10%'}
                            inputLeftElement={<Icon size={4} ml={4} color={'#FF4E00'} as={<MaterialCommunityIcons  name={'email'} />} />}
                        />
                    )}
                />
                <FormControl.ErrorMessage>
                    {emailErrorMessage || ''}
                </FormControl.ErrorMessage>
                </FormControl>}
            </Modal.Body>
            <Modal.Footer>
                <RoundedButton
                    onPress={() => onPressSend(control._formValues.resetPassword)}
                    text={modalObject.buttonText}
                    style={{ width: '100%' }}
                    isLoading={isLoading}
                />
            </Modal.Footer>
            </Modal.Content>
        </Modal>
    </ScrollView>
  );
};

export default LoginScreen;