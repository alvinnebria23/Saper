import React, { useRef } from 'react';
import { Column, Icon, IconButton, Button, Heading, Text, Row, ScrollView, Modal, TextArea, Checkbox } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import { LOGO_STYLES_VIEW  } from '../constants/view-component-styles.js';
import { LeftIconInput } from '../components/input';
import { ImageLogo } from '../components/image';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  INIT_ACCOUNT_INFORMATION_INPUTS, 
  INIT_API_INPUTS, 
  PROGRESS_STEPS_STYLE, 
  PROGRESS_BUTTON_TEXT_STYLE, 
  CARD_CONTAINER, 
  CARDVIEW_STYLE, 
  STEP1, 
  STEP2, 
  STEP3,
  TERM_AND_CONDITiONS_OBJECT,
} from '../constants/register-screen-constants';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { DetailCard } from '../components/card';
import { removeInvalidNameRegex, removeNonNumericRegex } from '../constants/regex.js';
import { AlertDialogComponent } from '../components/dialog/index.js';
import { CustomModalSpinner } from '../components/spinner/index.js';
import useRegister from '../hooks/useRegister.js';
const RegisterScreen = ({ navigation }) => {
  const { control, setValue } = useForm();
  const { 
    onPressNext, 
    onPressClearButton, 
    errorInputFields, 
    status, onCloseDialog, 
    isConfirm, 
    spinnerObject, 
    onPressBack,
    modalVisible,
    onPressTermsAndConditions,
    onChangeSelect,
    isAccepted,
    isLegalAge,
  } = useRegister({ setValue, navigation});
  const cancelRef = useRef(null);

  const applyBoldStyle = text => {
    let numberOfItemsAdded = 0;
    const result = text.sentence.split(/\{\d+\}/);
    text.boldText.forEach((boldText, i) => result.splice(++numberOfItemsAdded + i, 0, <Text key={boldText} style={{fontWeight: 'bold', fontSize: 16 }}>{boldText}</Text>));
    return <Text>{result}</Text>;
  };

  return (
      <ScrollView style={{ flex: 1, marginTop: '13%' }}>
          <View>
            <TouchableOpacity onPress={onPressBack}>
              <Row style={{ alignItems: 'center' }}>
                <Icon size={5} ml={4} color={'#FF4E00'} as={<MaterialCommunityIcons  name={'arrow-left'} />} />
                <Text color={"#FF4E00"} fontSize={16}> Back </Text>
              </Row>

            </TouchableOpacity>
          </View>
          <View style={LOGO_STYLES_VIEW}>
              <ImageLogo />
          </View>
          {spinnerObject.isLoading && <CustomModalSpinner message={spinnerObject.message}/>}
          {render({control, onPressNext, onPressClearButton, errorInputFields, status, isConfirm, spinnerObject })}
          <>
            <AlertDialogComponent 
              cancelRef={cancelRef}
              isOpen={status?.isOpen}
              onCloseDialog={onCloseDialog}
              header={status?.header}
              body={status?.body}
              footer={(
                <Button colorScheme='orange' onPress={onCloseDialog}>
                    OK
                </Button>
              )}
            />
            <Modal 
              closeOnOverlayClick={false} 
              isOpen={modalVisible} 
              onClose={onPressTermsAndConditions.bind(this, 'cancel')}
              avoidKeyboard 
              size={'xl'}
            >
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>TERMS AND CONDITIONS | PRIVACY POLICY</Modal.Header>
                <Modal.Body>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {applyBoldStyle(TERM_AND_CONDITiONS_OBJECT)}
                  </ScrollView>
                </Modal.Body>
                <Modal.Footer>
                    <Column>
                      <Checkbox 
                        marginLeft={5}
                        marginBottom={5}
                        onChange={onChangeSelect.bind(this, 'terms')}
                        colorScheme={'orange'}
                      >
                        {`I read, comprehend and accept the terms\nand condition and privacy policy of\nSAPERS mobile app.`}
                      </Checkbox>
                      <Checkbox 
                        marginLeft={5}
                        marginBottom={5}
                        onChange={onChangeSelect.bind(this, 'age')}
                        colorScheme={'orange'}
                      >
                        {`I am 18 years old above.`}
                      </Checkbox>
                    </Column>
                    <Button 
                      colorScheme={'orange'} 
                      flex="1" 
                      onPress={onPressTermsAndConditions.bind(this, 'accept')}
                      marginRight={1}
                      isDisabled={!(isAccepted && isLegalAge)}
                    >
                      NEXT
                    </Button>
                    <Button 
                      colorScheme={'gray'} 
                      flex="1" 
                      onPress={onPressTermsAndConditions.bind(this, 'cancel')}
                      marginLeft={1}
                      variant={'subtle'}
                    >
                      CANCEL
                    </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </>
      </ScrollView>
  );
};
const renderAccountInformation = (formValues) => {
  const accountInfoFields = [
    { label: 'Email', value: formValues.email, iconName: 'email' },
    { label: 'Fullname', value: formValues.fullName, iconName: 'folder-account-outline' },
    { label: 'Mobile number', value: formValues.contactNumber, iconName: 'cellphone' },
    { label: 'Password', value: formValues.password, iconName: 'lock-outline' },
  ];
  
  const apiInfoFields = [
    { label: 'App Id', value: formValues.appId, iconName: 'application-edit-outline' },
    { label: 'Secret Key', value: formValues.secretKey, iconName: 'key-outline' },
  ];
  return (
    <>
      <Heading size="md" mb={2}>Account Information</Heading>
      <View style={{ left: 0, marginBottom: 20 }}>
        {accountInfoFields.map(({ label, value, iconName }) => (
          <DetailCard key={label} label={label} value={value} iconName={iconName} />
        ))}
      </View>
      <Heading size="md" mb={2} mt={2}>API</Heading>
      <View flex={1} style={{ left: 0 }}>
        {apiInfoFields.map(({ label, value, iconName }) => (
          <DetailCard key={label} label={label} value={value} iconName={iconName} />
        ))}
      </View>
    </>
  );
};
const render = ({control, onPressNext, onPressClearButton, errorInputFields, status, isConfirm, spinnerObject }) => {
  return (
      <ProgressSteps {...PROGRESS_STEPS_STYLE}>
        <ProgressStep 
          errors={errorInputFields.length > 0}
          scrollViewProps={{ paddingBottom: 40 }} 
          label="Account Information"  
          nextBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE}
          onNext={onPressNext.bind(this, STEP1, control._formValues)}
          nextBtnDisabled={spinnerObject?.isLoading}
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
          errors={errorInputFields.length > 0 || status?.isOpen}
          label="Affiliate API" 
          nextBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE} 
          previousBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE}
          onNext={onPressNext.bind(this, STEP2, control._formValues)}
          nextBtnDisabled={spinnerObject?.isLoading}
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
          onSubmit={onPressNext.bind(this, STEP3, control._formValues)}
          previousBtnDisabled={status?.header?.toLowerCase().includes('success')}     
          nextBtnDisabled={spinnerObject?.isLoading}   
        >
          <View style={CARD_CONTAINER}>
            <View style={CARDVIEW_STYLE}>
              {isConfirm && renderAccountInformation(control._formValues)}
            </View>      
          </View>
        </ProgressStep>
    </ProgressSteps>
  );
}

export default RegisterScreen;