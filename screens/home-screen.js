import React from 'react';
import { Box } from 'native-base';
import { View } from 'react-native';
import { BottomTabNavigator } from '../components/tab';
import DashboardScreen from './dashboard-screen';
import useBottomNavigator from '../hooks/useBottomNavigator';
import ClickReportScreen from './click-report-screen';
const HomeScreen = ({ navigation }) => {
  const { selected, onPressTab, setSelected} = useBottomNavigator();
  return (
    <View flex={1} style={{ backgroundColor: 'white'}}>
        <View flex={1} style={{ opacity: selected == 0 ? 1 : 0 }}>
            <DashboardScreen />
        </View>
        <View flex={1} style={{ opacity: selected == 1 ? 1 : 0 }}>
            <ClickReportScreen />
        </View>
      <Box style={{ position: 'absolute', bottom: 0 }} width="100%" alignSelf="center">
        <BottomTabNavigator selected={selected} onPressTab={onPressTab} setSelected={setSelected} />
      </Box>
    </View>
  );
};

export default HomeScreen;