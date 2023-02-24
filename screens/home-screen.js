import React from 'react';
import {  Box, Text, Icon, HStack, Center, Pressable, NativeBaseProvider } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { BottomTabNavigator } from '../components/tab';
import DashboardScreen from './dashboard-screen';
import useBottomNavigator from '../hooks/useBottomNavigator';

const HomeScreen = ({ navigation }) => {
  const { selected, onPressTab, setSelected} = useBottomNavigator();
  return (
    <View flex={1} style={{ backgroundColor: 'white'}}>
        <View flex={1} style={{ opacity: selected == 0 ? 1 : 0 }}>
            <DashboardScreen />
        </View>
      <Box style={{ position: 'absolute', bottom: 0 }}  flex={1} bg="white"  width="100%"  alignSelf="center">
        <BottomTabNavigator selected={selected} onPressTab={onPressTab} setSelected={setSelected} />
      </Box>
    </View>
  );
};

export default HomeScreen;