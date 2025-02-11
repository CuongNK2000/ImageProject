import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {PanResponder, View, StyleSheet, AppState} from 'react-native';

const TIME_LOGOUT = __DEV__ ? 3 * 60 * 10000 : 3 * 60 * 1000;

interface RootViewProps {
  children: React.ReactElement | React.ReactElement[];
  getCurrentRoute: () => string;
}

const RootView = observer((props: RootViewProps) => {
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => false,
      // onStartShouldSetPanResponderCapture: onPanResponderCapture,
      // onMoveShouldSetPanResponderCapture: onPanResponderCapture,
    }),
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {props.children}
    </View>
  );
});

export default RootView;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
});
