import { extendTheme, NativeBaseProvider } from 'native-base';
import LoginScreen from './screens/login-screen';
import theme from './theme';


export default function App() {
  

  return (
    <NativeBaseProvider theme={theme && theme}>
        <LoginScreen />
    </NativeBaseProvider>
  );
}