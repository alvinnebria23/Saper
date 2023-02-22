import React from 'react';
import { Text } from 'native-base';
import { View } from 'react-native';
import { CENTER_SCREEN_VIEW } from '../constants/view-component-styles.js';

const HomeScreen = ({ navigation }) => {
   
   

  return (
    <View style={CENTER_SCREEN_VIEW}>
       <Text>HOME SCREEN</Text>
    </View>
  );
};

export default HomeScreen;