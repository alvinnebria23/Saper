import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen, HomeScreen } from './screens';
import { UserContext } from './context';
import theme from './theme';
import { useEffect, useState } from 'react';
import { retrieveLocalStorage } from './helpers/storageHelper';

const Stack = createStackNavigator();

export default App = () =>  { 
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getInit = async () => {
        const response = await retrieveLocalStorage('userData');
        setUserData(response);
    }
    getInit();
},[])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <NativeBaseProvider theme={theme && theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen key="LoginScreen" name='Login' component={LoginScreen} />
              <Stack.Screen key="RegisterScreen" name='Register' component={RegisterScreen} />
              <Stack.Screen key="HomeScreen" name='Home' component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </UserContext.Provider>
  );
}