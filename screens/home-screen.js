import React from 'react';
import {  Box, Text, Icon, HStack, Center, Pressable, NativeBaseProvider } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { BottomTabNavigator } from '../components/tab';

const HomeScreen = ({ navigation }) => {
  const [selected, setSelected] = React.useState(1);
  return (
    <Box style={{ position: 'absolute', bottom: 0 }}  flex={1} bg="white" safeAreaTop width="100%" height={'100%'} alignSelf="center">
      <View flex={1}>

      </View>
      <BottomTabNavigator/>
    </Box>
  );
};

export default HomeScreen;