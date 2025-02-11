import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import * as screenNames from './screenNames';
import {PrimaryParamList} from './param-navigation';
import {LoginScreen, SplashScreen} from '../screens';

const Stack = Platform.select({
  ios: createStackNavigator<PrimaryParamList>(),
  android: createNativeStackNavigator<PrimaryParamList>(),
});

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
      initialRouteName={screenNames.splashScreen}>
      <Stack.Screen name={screenNames.splashScreen} component={SplashScreen} />
      <Stack.Screen name={screenNames.loginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
};
