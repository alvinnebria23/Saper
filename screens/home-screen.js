import React, { useContext, useState } from 'react';
import { Box, Button } from 'native-base';
import { View } from 'react-native';
import { BottomTabNavigator } from '../components/tab';
import DashboardScreen from './dashboard-screen';
import useBottomNavigator from '../hooks/useBottomNavigator';
import ClickReportScreen from './click-report-screen';
import { AlertDialogComponent } from '../components/dialog/index.js';
import { CustomModalSpinner } from '../components/spinner/index.js';
import useHome from '../hooks/useHome.js';
import { useRef } from 'react';
import AccountScreen from './account-screen';
import ConversionReportScreen from './conversion-report-screen';
const HomeScreen = ({ navigation }) => {
  const { 
    selected, 
    onPressTab, 
    setSelected
  } = useBottomNavigator(navigation);
  const { 
    onCloseDialog, 
    status, 
    dashboardData, 
    dashboardFilterDate, 
    setDashboardFilterDate, 
    isLoading, 
    topFiveSubIds,
    conversionFilterDate,
    setConversionFilterDate,
    conversionData,
    setConversionData,
  } = useHome();
  const renderSelectedScreen = () => {
    switch(selected){
      case 0:
        return (
          <DashboardScreen 
            dashboardData={dashboardData} 
            dashboardFilterDate={dashboardFilterDate} 
            setDashboardFilterDate={setDashboardFilterDate} 
            isLoading={isLoading}
            topFiveSubIds={topFiveSubIds}
          />
        );
      case 1:
        return (
          <ConversionReportScreen 
            conversionData={conversionData}
            conversionFilterDate={conversionFilterDate}
            setConversionFilterDate={setConversionFilterDate}
            setConversionData={setConversionData}
          />
        );
      case 2:
        return (<ClickReportScreen />);
      case 3:
        return (<AccountScreen navigation={navigation} />);
      default:
        return;
    }
  } 
  const cancelRef = useRef(null);
  return (
    <View flex={1} style={{ backgroundColor: 'white'}} pointerEvents={isLoading ? 'none' : 'auto'}>
      {isLoading && <CustomModalSpinner message={'Fetching data, please wait . . .'} />}
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