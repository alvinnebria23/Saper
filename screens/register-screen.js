import React, { useRef, useState } from 'react';
import { Text, Column, Icon, KeyboardAvoidingView, IconButton, Button, Heading, Center } from 'native-base';
import { View } from 'react-native';
import { LOGO_STYLES_VIEW  } from '../constants/view-component-styles.js';
import { LeftIconInput } from '../components/input';
import { ImageLogo } from '../components/image';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { INIT_ACCOUNT_INFORMATION_INPUTS, INIT_API_INPUTS, PROGRESS_STEPS_STYLE, PROGRESS_BUTTON_TEXT_STYLE, CARD_CONTAINER, CARDVIEW_STYLE, STEP1, STEP2 } from '../constants/register-screen-constants';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CardView } from '../components/card';
import { removeInvalidNameRegex, removeNonNumericRegex } from '../constants/regex.js';
import { AlertDialogComponent } from '../components/dialog/index.js';
import useRegister from '../hooks/useRegister.js';
const RegisterScreen = ({ navigation }) => {
  const { control, handleSubmit, setValue } = useForm();
  const { onPressNext, onPressClearButton, errorInputFields, isOpen, onCloseDialog, isConfirm } = useRegister({ setValue, navigation});
  const cancelRef = useRef(null);
  return (
      <View style={{ flex: 1, marginTop: '40%' }}>
          <View style={LOGO_STYLES_VIEW}>
              <ImageLogo />
          </View>
          {render({control, onPressNext, onPressClearButton, errorInputFields, isOpen, isConfirm })}
          <>
            <AlertDialogComponent 
              cancelRef={cancelRef}
              isOpen={isOpen}
              onCloseDialog={onCloseDialog}
              header={'Error message'}
              body={'App Id and Secret Key does not match or invalid.'}
              footer={(
                <Button colorScheme='orange' onPress={onCloseDialog}>
                    OK
                </Button>
              )}
            />
          </>
      </View>
  );
};
const renderAccountInformation = (formValues) => {
  return (
    <>
      <Heading size="md">Account Information</Heading>
      <View flex={1} style={{ left: 0}}>
      <Heading size="xs">Email</Heading> 
      <Text>{`: ${formValues.email}`}</Text>
        <Text>{`Full name: ${formValues.fullName}`}</Text>
        <Text>{`Mobile number: ${formValues.contactNumber}`}</Text>
        <Text>{`Password: ${formValues.password}`}</Text>
      </View>
      <Heading size="md">API</Heading>
      <Text>{`App Id: ${formValues.appId}`}</Text>
      <Text>{`Secret key: ${formValues.secretKey}`}</Text>
    </>
  )
};
const render = ({control, onPressNext, onPressClearButton, errorInputFields, isOpen, isConfirm }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ProgressSteps {...PROGRESS_STEPS_STYLE}>
        <ProgressStep 
          errors={errorInputFields.length > 0}
          scrollViewProps={{ paddingBottom: 40 }} 
          label="Account Information"  
          nextBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE}
          onNext={onPressNext.bind(this, STEP1, control._formValues)}
        >
          <Column space={2} paddingRight={'20%'} paddingLeft={'20%'} paddingBottom={'20%'}>
            {INIT_ACCOUNT_INFORMATION_INPUTS.map((item) => {
              let error = false;
              let message ='';

              if(errorInputFields.length !== 0){
                for({ fieldName, errorMessage } of errorInputFields){
                  if(fieldName === item['name']){
                    error = true;
                    message = errorMessage;
                    break;
                  }
                }
              }
              return (
                <Controller
                    key={item['name']}
                    name={item['name']}
                    control={control}
                    render={({ field : { onChange, value }}) => {
                      const keyboardType = item['name'].toLowerCase().includes('number') ? 'numeric' : 'default';
                      const type = item['name'].toLowerCase().includes('password') ? 'password' : 'text';
                      if(item['name'].toLowerCase().includes('number')){
                        value = value?.replace(removeNonNumericRegex, '');
                      }
                      if(item['name'].toLowerCase().includes('fullname')){
                        value = value?.replace(removeInvalidNameRegex, '');
                      }
                      return (
                        <LeftIconInput 
                            placeholder={item['placeHolder']}
                            onChange={onChange}
                            value={value}
                            keyboardType={keyboardType}
                            type={type}
                            inputLeftElement={<Icon size={4} ml={4} color={'#FF4E00'} as={<MaterialCommunityIcons  name={item['iconName']} />} />}
                            error={error}
                            errorMessage={error ? message : ''}
                            inputRightElement={value &&
                              <IconButton 
                                  mr={1}
                                  colorScheme="gray" 
                                  variant={'ghost'} 
                                  _icon={{
                                      as: Ionicons,
                                      name: "close",
                                      size: '4'
                                  }} 
                                  onPress={onPressClearButton.bind(this, item['name'])}
                              />  
                            }
                        />
                      );
                    }}
                />
            )
            })}
          </Column>
        </ProgressStep>
        <ProgressStep 
          errors={errorInputFields.length > 0 || isOpen}
          label="Open API" 
          nextBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE} 
          previousBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE}
          onNext={onPressNext.bind(this, STEP2, control._formValues)}
        >
          <Column space={2} paddingRight={'20%'} paddingLeft={'20%'} paddingBottom={'20%'}>
              {INIT_API_INPUTS.map(item => {
                let error = false;
                let message ='';

                if(errorInputFields.length !== 0){
                  for({ fieldName, errorMessage } of errorInputFields){
                    if(fieldName === item['name']){
                      error = true;
                      message = errorMessage;
                      break;
                    }
                  }
                }
                
                return (
                  <Controller
                      key={item['name']}
                      name={item['name']}
                      control={control}
                      render={({ field : { onChange, value }}) => {
                        value = value?.trim();
                        return (
                          <LeftIconInput 
                              placeholder={item['placeHolder']}
                              onChange={onChange}
                              value={value}
                              inputLeftElement={<Icon size={4} ml={4} color={'#FF4E00'} as={<MaterialCommunityIcons  name={item['iconName']} />} />}
                              error={error}
                              errorMessage={error ? message : ''}
                               inputRightElement={value &&
                              <IconButton 
                                  mr={1}
                                  colorScheme="gray" 
                                  variant={'ghost'} 
                                  _icon={{
                                      as: Ionicons,
                                      name: "close",
                                      size: '4'
                                  }} 
                                  onPress={onPressClearButton.bind(this, item['name'])}
                              />  
                            }
                          />
                        )
                      }}
                  />
                )
              })}
            </Column>
        </ProgressStep>
        <ProgressStep 
          label="Confirm Details" 
          nextBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE} 
          previousBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE}
        >
          <View style={CARD_CONTAINER}>
            <CardView style={CARDVIEW_STYLE}>
              {isConfirm && renderAccountInformation(control._formValues)}
            </CardView>      
          </View>
        </ProgressStep>
    </ProgressSteps>
  </KeyboardAvoidingView>
  );
}

export default RegisterScreen;