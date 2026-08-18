import React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import { ImageLogo } from '../components/image';
import {  Column, Heading, Icon, Row, Text } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
const UnauthorizedScreen =  ({ message, hideLogo = true }) => {
  return (
    <View flex={1} style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          {!hideLogo && <ImageLogo />}
          <Heading size={'2xl'} color={'gray.200'}>
            {message}
          </Heading>
          {hideLogo && 
          <Column alignItems={'center'} p={'5%'} mt={'25%'}>
            <Text color={'gray.500'}>Visit our faceboook page and DM us to upgrade plan.</Text>
              <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/sapersapk/")}>
                <Row alignItems={'center'} mt={'2%'}>
                  <Icon size={'2xl'} color={'#1877F2'} as={<FontAwesome  name={'facebook-square'} />} />
                  <Text style={{ color: '#FF4E00' }}>SAPERS</Text>
                </Row>
              </TouchableOpacity>
          </Column>}
    </View>
  );
};

export default UnauthorizedScreen;