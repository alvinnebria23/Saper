import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getAllUsers, getAnalysis, updateUserToken } from '../api/AdminApi.js';
import { useWindowDimensions } from 'react-native';
import { Button, Column, FlatList, IconButton, Input, Row, ScrollView, Text } from 'native-base';
import { clearLocalStorage } from '../helpers/storageHelper.js';
import { CARD_VIEW } from '../constants/view-component-styles.js';
import { Controller, useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { CustomModalSpinner } from '../components/spinner';
import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { ToasterHelper, Toaster  } from "react-native-customizable-toast";
import { Dimensions } from 'react-native';
const AdminScreen =  ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [cloneUsers, setCloneUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [initialRender, setInitialRender] = useState(true);
  const [analysisData, setAnalysisData] = useState([0,0,0]);
  const [isLoading, setIsLoading] = useState(false);
  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ])
  const { control, setValue } = useForm();
  const [routes] = useState([
    { key: 'first', title: 'Management' },
    { key: 'second', title: 'Analysis' },
  ]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      const listOfUsers = await getAllUsers();
      setUsers(listOfUsers);
      setCloneUsers(listOfUsers);
      setIsLoading(false);
    };
    if(initialRender){
      fetchAllUsers();
      setInitialRender(false);
    }
  },[])

  useEffect(() => {
    const fetchAnalysisData = async () => {
      setIsLoading(true);
      const response = await getAnalysis(selectedMonth);
      setAnalysisData(response.analysis);
      setIsLoading(false);
    };
    if(!initialRender){
      fetchAnalysisData();
      setInitialRender(false);
    }
  },[selectedMonth])

  const keyExtractor = (item) => item.id.toString();
  const onPressSearchBarButton = (value) => {
    if(users?.length === 0){
      setUsers([...cloneUsers]);
      setValue('search', "");
      return;
    }
    if(value === ""){
      setUsers([...cloneUsers]);
      return;
    }
    const tempArray = [...cloneUsers].filter((user) => user["shopeeApi.appId"] === value);
    setUsers([...tempArray]);
  }
  const renderItem = ({ item }) => {
    return (
      <View 
        style={{ ...CARD_VIEW }} 
        key={item.id}
      >
        <Row m={2}>
          <Column flex={1}>
            <Row>
              <Text fontWeight={'semibold'} fontSize={18}>{`APP ID: `}</Text>
              <Text fontWeight={'semibold'} fontSize={18} style={{ color: 'green' }}>{item["shopeeApi.appId"]}</Text>
            </Row>
            <Text style={{ marginTop: '5%', fontSize: 13 }}>{`Name: ${item?.name}`}</Text>
            <Text style={{ fontSize: 13 }}>{`Email: ${item?.email}`}</Text>
          </Column>
          <Column flex={0} alignItems={'center'} margin={0}>
            <Column space={'4'}>
              <Button size={'sm'} 
                colorScheme={item["shopeeApi.type"] === "free" ? 'gray' : 'orange'} 
                disabled={item["shopeeApi.type"] === "free"}
                onPress={onPress.bind(this, "free", item["shopeeApi.appId"], item["shopeeApi.type"], item.id)}
              >
                FREE
              </Button>
              <Button size={'sm'} 
                colorScheme={item["shopeeApi.type"] === "regular" ? 'gray' : 'orange'} 
                disabled={item["shopeeApi.type"] === "regular"}
                onPress={onPress.bind(this, "regular", item["shopeeApi.appId"], item["shopeeApi.type"], item.id)}
              >
                REGULAR
              </Button>
              <Button size={'sm'} 
                colorScheme={item["shopeeApi.type"] === "premium" ? 'gray' : 'orange'} 
                disabled={item["shopeeApi.type"] === "premium"}
                onPress={onPress.bind(this, "premium", item["shopeeApi.appId"], item["shopeeApi.type"], item.id)}
              >
                PREMIUM
              </Button>
            </Column>
          </Column>
        </Row>
      </View>
    )
  };
  const ManagementRoute = () => (
    <View style={{ flex: 1, paddingBottom: '5%' }}>
      <Row style= {{ marginRight: '5%', marginLeft: '5%', marginBottom: '5%' }}>
        <Controller
          key={'search'}
          name={'search'}
          control={control}
          render={({ field : { onChange, value }}) => {
            return (
              <Input 
                variant="outline" 
                placeholder="Search App ID" 
                mt={'5%'}
                width={'100%'}
                value={value}
                onChangeText={onChange}
                InputRightElement={  
                <IconButton 
                  colorScheme={'gray'} 
                  key={'edit'} 
                  size={'md'} 
                  variant={'ghost'} 
                  onPress={onPressSearchBarButton.bind(this, control?._formValues?.search)}
                  _icon={{
                    as: Ionicons,
                    name: users?.length  === 0 ? 'refresh' : 'search-outline'
                  }} />}
              />)
          }}
        />
      </Row>
      {!isLoading &&
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        pr={'2%'}
        pl={'2%'}
      />}
  </View>
  )
  const AnalysisRoute = () => (
    <ScrollView bg={"white"}>
    <Column>
    <Picker
      selectedValue={selectedMonth}
      onValueChange={(itemValue) =>
        setSelectedMonth(itemValue)
      }>
        {months?.map((month, index) => (
          <Picker.Item label={month} value={index + 1} key={index} />
        ))}
    </Picker>
      <BarChart 
        data={{ 
          labels: ["FREE", "REGULAR", "PREMIUM"],
          datasets: [
              {
                  data: analysisData || [0,0,0],
                  colors: [
                    () => `#BE95FF`,
                    () => `#7BA9FF`,
                    () => `#35530A`,
                  ]
              } 
          ],
        }}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height * .5}
        chartConfig={{ 
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "white",
          fillShadowGradientOpacity: 1,
          color: () => '#FF4E00',
          barRadius : 1,  
          decimalPlaces: 0,
          showBarTops: false,
          barPercentage: 1,
        }}
        withHorizontalLabels={false}
        withCustomBarColorFromData={true}
        fromZero={true}
        flatColor={true}
        withInnerLines={true}
        showBarTops={true}
        showValuesOnTopOfBars={true}
      />
    </Column>
    </ScrollView>
  )
  const onIndexChange = async (newIndex) => {
    if(newIndex === 1){
      setIsLoading(true);
      const response = await getAnalysis(selectedMonth);
      setAnalysisData(response.analysis);
      setIsLoading(false);
    } 
  }
  const renderScene = SceneMap({
    first: ManagementRoute,
    second: AnalysisRoute,
  });
  const onPress = async (value, appId, current, userId) =>{
    if(value === "logout"){
      await clearLocalStorage();
      navigation.navigate('Login');
    }else {
      setSelectedUser({ appId: appId, updateTo: value, current:current, userId: userId });
      setIsOpen(true);
    }
  }
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#FF4E00' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route }) => (
        <Text style={{ color: '#FF4E00', margin: 8 }}>
          {route.title}
        </Text>
      )}
    />
  );
  const onCloseDialog = async (action) => {
    setIsOpen(false);
    if(action === "confirm"){
      setIsLoading(true);
      const response = await updateUserToken(selectedUser.appId, selectedUser.updateTo, selectedUser.userId);
      if(response.success){
        const tempUsers = [...cloneUsers];
        const updatedUsers = tempUsers.map(obj => {
          if(obj["shopeeApi.appId"] === selectedUser.appId){
            return {...obj, "shopeeApi.type": selectedUser.updateTo};
          }
          return obj;
        });
        setCloneUsers(updatedUsers);
        setUsers(updatedUsers);
      }
      ToasterHelper.show({
        text: `App ID: ${selectedUser.appId} \nSuccess: ${response.success}`,
        type: response?.success ? 'success' : 'error',
        timeout: 5000,
      });
      setIsLoading(false);
    }
  }
  const cancelRef = useRef(null);
  return (
    <View width="100%" height={'100%'} style={{ paddingTop: '5%' }} pointerEvents={isLoading ? 'none' : 'auto'}>
      {isLoading && <CustomModalSpinner />}
      <AlertDialogComponent 
        cancelRef={cancelRef}
        isOpen={isOpen}
        onCloseDialog={onCloseDialog.bind(this, "cancel")}
        header={'Review Update'}
        body={`App ID: ${selectedUser?.appId} \nCurrent: ${selectedUser?.current?.toUpperCase()} \nUpdate to: ${selectedUser?.updateTo?.toUpperCase()}`}
        footer={(
          <Row space={'5'}>
            <Button size="sm" colorScheme='gray' onPress={onCloseDialog.bind(this, "cancel")}>
              CANCEL
            </Button>
            <Button size="sm" colorScheme='orange' onPress={onCloseDialog.bind(this, "confirm")}>
              CONFIRM
            </Button>
          </Row>
        )}
      />
      <Button colorScheme={"orange"} onPress={onPress.bind(this, "logout")}> LOGOUT </Button>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <Toaster />
    </View>
  );
};

export default AdminScreen;