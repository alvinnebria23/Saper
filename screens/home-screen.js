import React, { useContext } from 'react';
import { Button } from 'native-base';
import { View } from 'react-native';
import { BottomTabNavigator } from '../components/tab';
import DashboardScreen from './dashboard-screen';
import useBottomNavigator from '../hooks/useBottomNavigator';
import { AlertDialogComponent } from '../components/dialog/index.js';
import { CustomModalSpinner } from '../components/spinner/index.js';
import useHome from '../hooks/useHome.js';
import { useRef } from 'react';
import AccountScreen from './account-screen';
import ConversionReportScreen from './conversion-report-screen';
import GenerateLinkScreen from "./generate-link-screen";
import { UserContext } from '../context';
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
    isToggled,
    setIsToggled,
    displayType,
    setDisplayType,
    setIsLoading,
  } = useHome();
  const { userData } = useContext(UserContext);
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
            isToggled={isToggled}
            setIsToggled={setIsToggled}
            userType={userData.type}
          />
        );
      case 1:
        return (
        <ConversionReportScreen 
          conversionData={conversionData}
          conversionFilterDate={conversionFilterDate}
          setConversionFilterDate={setConversionFilterDate}
          isToggled={isToggled}
          setIsToggled={setIsToggled}
          isLoading={isLoading}
          displayType={displayType}
          setDisplayType={setDisplayType}
          userType={userData.type}
        />
        );
      case 2:
        return (<GenerateLinkScreen setIsLoading={setIsLoading} />);
      case 3:
        return (<AccountScreen navigation={navigation} setIsLoading={setIsLoading} />);
      default:
        return;
    }
  } 
  const cancelRef = useRef(null);
  return (
    <View flex={1} style={{ backgroundColor: 'white'}} pointerEvents={isLoading ? 'none' : 'auto'}>
      {isLoading && <CustomModalSpinner message={selected === 2 ? 'Please Wait...' : selected === 3 ? 'Updating Account...' : 'Fetching Data...'} />}
      <AlertDialogComponent 
        cancelRef={cancelRef}
        isOpen={status?.isOpen}
        onCloseDialog={onCloseDialog}
        header={status?.header}
        body={status?.body}
        footer={(
          <Button colorScheme='orange' onPress={onCloseDialog}>
             {status?.isOutdated ? 'Go to Google Play Store' : 'OK'}
          </Button>
        )}
      />
      <View flex={1}>
          {renderSelectedScreen()}
      </View>
      <View bg={'white'} style={{ position: 'absolute', bottom: 0 }} width="100%" alignSelf="center">
        <BottomTabNavigator selected={selected} onPressTab={onPressTab} setSelected={setSelected} />
      </View>
    </View>
  );
};

export default HomeScreen;