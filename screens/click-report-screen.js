import React from 'react';
import { View } from 'react-native';
import { ImageLogo } from '../components/image';
import { Heading } from 'native-base';
const ClickReportScreen =  ({ navigation }) => {

  return (
    <View flex={1} style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <ImageLogo />
          <Heading size={'2xl'} color={'gray.200'}>
            COMING SOON
          </Heading>
    </View>
  );
};

export default ClickReportScreen;