import React from 'react';
import {Animated, TextStyle, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useI18n from '../../i18n/context';
import useAppTheme from '../../themes/context';
import {color, dimensionsWidth, scale, spacing, typography} from '../../themes';
import {Text} from '..';

export const AnimatedTittle = ({animatedValue, tittle}) => {
  const insets = useSafeAreaInsets();
  const {appLanguage} = useI18n();
  const {theme} = useAppTheme();

  const [absX, setAbsX] = React.useState(0);

  const font = appLanguage === 'kh' && {fontFamily: 'Hanuman-Regular'};

  const fontSize = animatedValue.interpolate({
    inputRange: [0, 35],
    outputRange: [scale(28), scale(20)],
    extrapolate: 'clamp',
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 35],
    outputRange: [scale(42) + insets.top, insets.top],
    extrapolate: 'clamp',
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 35],
    outputRange: [scale(spacing[5]), absX],
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    color: theme.colors.textColor,
    fontSize,
    transform: [
      {
        translateY,
      },
      {
        translateX,
      },
    ],
  };

  const getAbsX = e => {
    absX === 0 && setAbsX(e.nativeEvent.layout.x);
  };

  return (
    <View style={CONTAINER}>
      <Text onLayout={getAbsX} style={TITTLE_TRANSPARENT}>
        {tittle}
      </Text>
      <Animated.Text style={[font, TITTLE, animatedStyle]}>
        {tittle}
      </Animated.Text>
    </View>
  );
};
const CONTAINER: ViewStyle = {
  width: dimensionsWidth,
  // backgroundColor: "blue",
  position: 'absolute',
  top: scale(spacing[3]),
  alignSelf: 'center',
  zIndex: 10,
};

const TITTLE_TRANSPARENT: TextStyle = {
  alignSelf: 'center',
  color: color.transparent,
  fontSize: scale(20),
  fontWeight: 'bold',
  // backgroundColor: "blue",
};

const TITTLE: TextStyle = {
  fontSize: scale(28),
  position: 'absolute',
  // top: verticalScale(96),
  // left: scale(spacing[5]),
  fontWeight: 'bold',
  // marginBottom: verticalScale(spacing[1]),
  zIndex: 1000,
  fontFamily: typography.primary,
};
