/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  RootNavigation,
  setRootNavigation,
} from './navigators/navigation-ultilities';
import {NavigationContainerRef, ThemeProvider} from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {RootNavigator} from './navigators/root-navigator';
import RootView from './rootView';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const navigationRef = useRef<NavigationContainerRef>();
  setRootNavigation(navigationRef);

  const getCurrentRoute = React.useCallback(() => {
    const currentRoute = navigationRef.current.getCurrentRoute();
    return currentRoute.name;
  }, []);

  return (
    // <RootView getCurrentRoute={getCurrentRoute}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RootView getCurrentRoute={getCurrentRoute}>
        <RootNavigator ref={navigationRef} />
      </RootView>
    </SafeAreaProvider>
    // {/* </RootView> */}
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
