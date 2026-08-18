import {Animated, SafeAreaView, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import { LOGO_STYLES_VIEW } from '../constants/view-component-styles.js';
import { useForm, Controller } from 'react-hook-form';
import { ImageLogo } from '../components/image';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from '../constants/styles.js';
import RoundedButton from '../components/button/rounded-button.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Center, Column, Divider, FormControl, Heading, Icon, Row } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { clearLocalStorage, retrieveLocalStorage, setLocalStorage } from '../helpers/storageHelper.js';
import { UserContext } from "../context";
import { changeUserInformation, resetPassword } from '../api/UserApi.js';
import { ToasterHelper } from 'react-native-customizable-toast';
import { validatePassword } from '../validations/ValidateInput.js';
import { REQUIRED_PASSWORD_MESSAGE } from '../constants/register-screen-constants.js';
import DetailCard from '../components/card/detail-card.js';

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 6;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const VerificationScreen = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserContext);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [isValidInput, setIsValidInput] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { control } = useForm();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const onPressback = async () => {
    await clearLocalStorage();
    setUserData({});
    navigation.navigate("Login");
  }

  const onPressContinue = async () => {
    const passwordRequestObject = await retrieveLocalStorage('passwordRequestObject');
    const { verificationCode, id } = await retrieveLocalStorage('userData');
    if(passwordRequestObject?.oneTimePassword){
      if(passwordRequestObject.oneTimePassword.toString() === value){
        setShowResetPasswordModal(true);
      }else{
        setNumberOfAttempts(numberOfAttempts + 1);
        if(numberOfAttempts === 2){
          await clearLocalStorage();
          setUserData({});
          ToasterHelper.show({
            text: `You failed to input the correct ${passwordRequestObject?.oneTimePassword ? `OTP(One-Time Password)` : `6-Digit Code`} for 3 attempts`,
            type: `error`,
            timeout: 10000,
          });
          navigation.navigate("Login");
        }
      }
      return;
    }
    setIsLoading(true);
    if(verificationCode.toString() === value){
      const userData = await retrieveLocalStorage('userData');
      const user = await changeUserInformation({ isValidEmail: true }, { id }, "updateEmailStatus");
      if(user.fail){
        ToasterHelper.show({
          text: 'Network error. Please try again later.',
          type: `error`,
          timeout: 10000,
        });
        setIsLoading(false);
        return;
      }
      const cloneUserData = {...userData};
      cloneUserData.isValidEmail = true;
      await clearLocalStorage();
      await setLocalStorage('userData', cloneUserData);
      setUserData(await retrieveLocalStorage('userData'));
      navigation.navigate('Home');
    }else {
      setNumberOfAttempts(numberOfAttempts + 1);
      if(numberOfAttempts === 2){
        await clearLocalStorage();
        setUserData({});
        ToasterHelper.show({
          text: `The code you entered doesn't match \nwith the code we had sent to your email.\nEntered code: ${value}`,
          type: 'error',
          timeout: 10000,
        });
        navigation.navigate("Login");
      }
      
    }
    setIsLoading(false);
  }
  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  const onPressResetPassword = async ({ newPassword, confirmPassword }) => {
    setIsValidInput(false);
    if(!(newPassword && confirmPassword)){
      setErrorMessage('Please input empty fields.')
      return;
    }
    if(newPassword.includes(' ') || confirmPassword.includes(' ')){
      setErrorMessage('Password must not contain spaces.')
      return;
    }
    if(newPassword !== confirmPassword){
      setErrorMessage('New password and confirm password must be equal.');
      return;
    }
    if(!validatePassword(newPassword)){
      setErrorMessage(REQUIRED_PASSWORD_MESSAGE.errorMessage);
      return;
    }
    if(newPassword === confirmPassword){
      setIsValidInput(true);
      setIsLoading(true);
      const response = await resetPassword(newPassword);
      let text = "";
      if(response?.isOutdated){
        text = response.message;
      }else{
        text = response?.success ? `Password successfully updated. Please login your account with your new password.` : `Failed to update password. Please try again.`;
      }
      ToasterHelper.show({
        text: text,
        type: response?.success ? `success` : `error`,
        timeout: 10000,
      });
      if(response){
        await clearLocalStorage();
        navigation.navigate('Login');
      }
      setIsLoading(false);
    }
  } 

  const onPressCancel = async () => {
    await clearLocalStorage();
    setUserData({});
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.root} pointerEvents={isLoading ? 'none' : 'auto'}>
      <View>
        <TouchableOpacity onPress={onPressback}>
          <Row style={{ alignItems: 'center' }}>
            <Icon size={7} color={'#FF4E00'} as={<MaterialCommunityIcons  name={'arrow-left'} />} />
            <Text style={{ color: "#FF4E00"}} fontSize={19}> Back </Text>
          </Row>
        </TouchableOpacity>
      </View>
      <View style={{ ...LOGO_STYLES_VIEW, marginTop: "5%"}}>
            <ImageLogo source={require('../assets/saper-logo.png')}/>
      </View>
      {showResetPasswordModal ?
        <View style={{ paddingLeft: '10%', paddingRight: '10%' }}>
          <Heading color={'gray.400'}>Reset Password</Heading>
          <Divider mb={'5%'}/>
          <Text style={{ color: 'gray'}}>Please input your new password.</Text>
            <FormControl mt="5" isInvalid={!isValidInput}>
            <Controller
              name='newPassword'
              control={control}
              render={({ field : { onChange, value }}) => (
                  <DetailCard 
                    onChange={onChange} 
                    fontSize='xs' 
                    isEditing={true} 
                    withIcon={false} 
                    key={'newPassword'} 
                    label={'New Password'} 
                    value={value} 
                    name={'newPassword'}
                    iconName={'lock-plus'} 
                    style={{ marginBottom: '10%' }}
                    passwordType={true}
                  />
              )}
            />
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field : { onChange, value }}) => (
                <DetailCard 
                  onChange={onChange} 
                  fontSize='xs' 
                  isEditing={true} 
                  withIcon={false} 
                  key={'confirmPassword'} 
                  label={'Confirm New Password'} 
                  value={value} 
                  name={'confirmPassword'}
                  iconName={'lock-open'} 
                  passwordType={true}
                />
              )}
            />
            <FormControl.ErrorMessage>
                {errorMessage || ''}
            </FormControl.ErrorMessage>
          </FormControl>  
          <Divider mt={'25%'}/>
          <Column>
            <RoundedButton
              onPress={() => onPressResetPassword(control._formValues)}
              text={'Reset Password'}
              style={{ width: '100%', marginTop: '5%'}}
              isLoading={isLoading}
            />
            <RoundedButton
              onPress={onPressCancel}
              text={'Cancel'}
              style={{ width: '100%', marginTop: '5%'}}
              buttonColor={'gray.300'}
              textColor={'gray'}
            />
          </Column>
       </View> :
       <View>
          <Text style={styles.title}>Email Verification</Text>
          <Text style={styles.subTitle}>
            Please enter the {`${Object.keys(userData).length ?  `6-digit verification code` : `OTP (One-Time Password)`}`}{'\n'}
            we sent to your email address
          </Text>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
            <View style={{ paddingLeft: '20%', paddingRight: '20%'}}>
              <RoundedButton 
                text={"Continue"} 
                style={{ width: '100%', marginTop: '30%', color: 'gray' }}
                onPress={onPressContinue}
                isLoading={isLoading}
                isDisabled={numberOfAttempts === 3 ? true : false}
              />
              {numberOfAttempts > 0 && 
              <Center style={{ marginTop: '10%'}}>
                <Text style={{ color: 'red', fontSize: 12 }}>{`Please input the correct ${Object.keys(userData).length ?  `6-digit verification code` : `OTP`}:`}</Text>
                <Text style={{ color: 'red', fontSize: 12 }}>{`${3 - numberOfAttempts} attempt(s) remaining`}</Text>                
              </Center>}
            </View>  
        </View>}
    </SafeAreaView>
  );
};

export default VerificationScreen;