import React from 'react';
import { Text, Column, Icon, KeyboardAvoidingView } from 'native-base';
import { View } from 'react-native';
import { LOGO_STYLES_VIEW  } from '../constants/view-component-styles.js';
import { LeftIconInput } from '../components/input';
import { ImageLogo } from '../components/image';
import { useForm, Controller } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { INIT_ACCOUNT_INFORMATION_INPUTS, INIT_API_INPUTS, PROGRESS_STEPS_STYLE, PROGRESS_BUTTON_TEXT_STYLE, CARD_CONTAINER, CARDVIEW_STYLE } from '../constants/register-screen-constants';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CardView } from '../components/card';

const RegisterScreen = ({ navigate }) => {
  const { control, handleSubmit } = useForm();

  return (
      <View style={{ flex: 1, marginTop: '40%' }}>
          <View style={LOGO_STYLES_VIEW}>
              <ImageLogo />
          </View>
          {render(control)}
      </View>
  );
};

const render = (control) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ProgressSteps {...PROGRESS_STEPS_STYLE}>
        <ProgressStep scrollViewProps={{ paddingBottom: 40 }} label="Account Information"  nextBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE}>
          <Column space={2} alignItems="center" paddingRight={'20%'} paddingLeft={'20%'} paddingBottom={'20%'}>
            {INIT_ACCOUNT_INFORMATION_INPUTS.map(item => (
                <Controller
                    key={item['name']}
                    name={item['name']}
                    control={control}
                    render={({ field : { onChange, value }}) => (
                        <LeftIconInput 
                            placeholder={item['placeHolder']}
                            onChange={onChange}
                            value={value}
                            inputLeftElement={<Icon size={4} ml={4} color={'#FF4E00'} as={<MaterialCommunityIcons  name={item['iconName']} />} />}
                        />
                    )}
                />
            ))}
          </Column>
        </ProgressStep>
        <ProgressStep label="Verify API" nextBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE} previousBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE}>
          <Column space={2} alignItems="center" paddingRight={'20%'} paddingLeft={'20%'} paddingBottom={'20%'}>
              {INIT_API_INPUTS.map(item => (
                  <Controller
                      key={item['name']}
                      name={item['name']}
                      control={control}
                      render={({ field : { onChange, value }}) => (
                          <LeftIconInput 
                              placeholder={item['placeHolder']}
                              onChange={onChange}
                              value={value}
                              inputLeftElement={<Icon size={4} ml={4} color={'#FF4E00'} as={<MaterialCommunityIcons  name={item['iconName']} />} />}
                          />
                      )}
                  />
              ))}
            </Column>
        </ProgressStep>
        <ProgressStep label="Completed" nextBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE} previousBtnTextStyle={PROGRESS_BUTTON_TEXT_STYLE}>
          <View style={CARD_CONTAINER}>
            <CardView style={CARDVIEW_STYLE}>
              <Text>You have successfully registered your App ID and Secret Key, Please verify your email after submit.</Text>
            </CardView>      
          </View>
        </ProgressStep>
    </ProgressSteps>
  </KeyboardAvoidingView>
  );
}

export default RegisterScreen;