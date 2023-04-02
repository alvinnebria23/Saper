import React, { useState } from 'react';
import { Box, Button } from 'native-base';
import { View } from 'react-native';
import { BottomTabNavigator } from '../components/tab';
import DashboardScreen from './dashboard-screen';
import useBottomNavigator from '../hooks/useBottomNavigator';
import ClickReportScreen from './click-report-screen';
import { AlertDialogComponent } from '../components/dialog/index.js'
import useHome from '../hooks/useHome.js';
import { useRef } from 'react';
const HomeScreen = ({ navigation }) => {
  const { selected, onPressTab, setSelected} = useBottomNavigator(navigation);
  const { onCloseDialog, status, dashboardData, dashboardFilterDate, setDashboardFilterDate } = useHome();
  const renderSelectedScreen = () => {
    switch(selected){
      case 0:
        return (<DashboardScreen dashboardData={dashboardData} dashboardFilterDate={dashboardFilterDate} setDashboardFilterDate={setDashboardFilterDate} />)
      case 1:
        return (<ClickReportScreen />)
      default:
        return;
    }
  } 
  const cancelRef = useRef(null);
  return (
    <View flex={1} style={{ backgroundColor: 'white'}}>
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
        </>
        <View flex={1}>
            {renderSelectedScreen()}
        </View>
      <Box style={{ position: 'absolute', bottom: 0 }} width="100%" alignSelf="center">
        <BottomTabNavigator selected={selected} onPressTab={onPressTab} setSelected={setSelected} />
      </Box>
    </View>
  );
};

export default HomeScreen;