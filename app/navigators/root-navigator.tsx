import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainNavigator} from './main-navigator';
import {
  NavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';

export type RootParamList = {
  mainStack: undefined;
};

const Stack = createStackNavigator<RootParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'transparent'},
        headerShown: false,
      }}>
      <Stack.Screen
        name="mainStack"
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  );
});

RootNavigator.displayName = 'RootNavigator';
