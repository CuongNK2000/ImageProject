import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenProps} from './screen.props';
import {isNonScrolling, offsets, presets} from './screen.presets';
import {AnimatedTittle} from './animatedTittle';
import {dimensionsWidth, spacing, verticalScale} from '../../themes';
import useAppTheme from '../../themes/context';
import {Header} from '..';

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const {theme} = useAppTheme();
  const preset = presets.fixed;
  const style = props.style || {};
  const backgroundStyle = {
    backgroundColor: props.backgroundColor || theme.colors.background,
  };
  const backgroundHeaderStyle = {
    backgroundColor: props.backgroundHeader || theme.colors.backgroundHeader,
  };
  const widthDisplayStyle = {width: dimensionsWidth};
  const Wrapper = props.unsafe ? View : SafeAreaView;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        barStyle={props.statusBar || 'default'}
        backgroundColor="transparent"
        {...props.statusBarProps}
      />
      <Wrapper
        style={[styles.container, backgroundHeaderStyle]}
        edges={['top', 'left', 'right']}
        {...props.safeAreaProps}>
        {props.headerProps && <Header {...props.headerProps} />}
        {props.customHeader}
        <View style={[styles.innerContainer, backgroundStyle]}>
          <View
            style={[
              preset.inner,
              backgroundStyle,
              style,
              !props.fullWidthScreen && widthDisplayStyle,
            ]}>
            {props.children}
          </View>
        </View>
      </Wrapper>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const {theme} = useAppTheme();
  const preset = presets.scroll;
  const style = props.style || {};
  const backgroundStyle = {
    backgroundColor: props.backgroundColor || theme.colors.background,
  };
  const backgroundHeaderStyle = {
    backgroundColor: props.backgroundHeader || theme.colors.backgroundHeader,
  };
  const widthDisplayStyle = {width: dimensionsWidth};
  const Wrapper = props.unsafe ? View : SafeAreaView;
  const offset = React.useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: offset}}}],
    {
      useNativeDriver: false,
    },
  );

  return (
    <KeyboardAvoidingView
      style={preset.outer}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        barStyle={props.statusBar || 'default'}
        backgroundColor="transparent"
        {...props.statusBarProps}
      />
      <Wrapper
        style={[styles.container, backgroundHeaderStyle]}
        edges={['top', 'left', 'right']}
        {...props.safeAreaProps}>
        {props.headerProps && <Header {...props.headerProps} />}
        {props.customHeader}
        {props.animatedTittle && (
          <AnimatedTittle
            animatedValue={offset}
            tittle={props.animatedTittle}
          />
        )}
        <View style={[styles.innerContainer, backgroundStyle]}>
          <ScrollView
            style={[
              styles.scroll,
              backgroundStyle,
              !props.fullWidthScreen && widthDisplayStyle,
            ]}
            contentContainerStyle={[preset.inner, style]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={
              props.keyboardShouldPersistTaps || 'handled'
            }
            refreshControl={props.refreshControl}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            {...props.scrollViewProps}>
            {props.children}
          </ScrollView>
          {props.customBottom}
        </View>
      </Wrapper>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  scroll: {
    alignSelf: 'center',
    flex: 1,
    height: '100%',
    paddingTop: verticalScale(spacing[3]),
    width: '100%',
  },
});
