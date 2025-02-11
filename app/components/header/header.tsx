import React from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ImageStyle,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {HeaderProps} from './header.props';
import {Text} from '../text/text';
import {useNavigation} from '@react-navigation/native';
import {color, dimensionsWidth, scale, spacing} from '../../themes';
import {Icon} from '../../components';
import {RootNavigation} from '../../navigators/navigation-ultilities';

// static styles
const ROOT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginVertical: scale(spacing[3]),
  marginHorizontal: scale(20),
};
const TITLE: TextStyle = {
  textAlign: 'center',
  fontSize: scale(20),
  fontWeight: '600',
  color: color.palette.gray700,
};
const TITLE_MIDDLE: ViewStyle = {flex: 1, justifyContent: 'center'};
const ICON_LEFT_CONTAINER: ViewStyle = {
  width: scale(36),
  height: scale(30),
  justifyContent: 'center',
};
const ICON_RIGHT_CONTAINER: ViewStyle = {
  width: scale(36),
  height: scale(30),
  justifyContent: 'center',
  alignItems: 'flex-end',
};

const ICON: ImageStyle = {
  width: scale(24),
  height: scale(24),
  tintColor: color.palette.black,
};

const ICON_WHITE: ImageStyle = {
  ...ICON,
  tintColor: color.palette.white,
};

const TITLE_WHITE: TextStyle = {
  ...TITLE,
  color: color.palette.white,
};

const TEXT_RIGHT: TextStyle = {
  color: color.palette.white,
  fontSize: scale(14),
  marginRight: scale(4),
};

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const navigation = useNavigation();
  const routes = navigation.getState().routes;

  const {
    onLeftPress,
    onRightPress,
    rightIcon = 'ic_home',
    rightText,
    leftIcon,
    title,
    style,
    titleStyle,
    hideLeftIcon,
    headerWhite = true,
    headerBg = true,
  } = props;

  const onPressLeft = React.useCallback(async () => {
    if (onLeftPress) {
      onLeftPress();
    } else {
      RootNavigation.goBack();
    }
  }, [onLeftPress]);

  const onPressRight = React.useCallback(async () => {
    // onRightPress ? onRightPress() : RootNavigation.navigate("tabHome", { screen: "home" })
    if (onRightPress) {
      onRightPress();
    } else {
      if (routes[0].name === 'homeScreen') {
        RootNavigation.navigate('homeScreen');
      } else {
        RootNavigation.reset({index: 0, routes: [{name: 'tabHome'}]});
      }
    }
  }, [onRightPress, routes]);

  const header = title || '';

  return (
    <>
      {/* {headerBg && <ImageBackground source={icons.header_bg} style={styles.headerBg} />} */}
      <View style={[ROOT, style]}>
        {!hideLeftIcon ? (
          <TouchableOpacity onPress={onPressLeft} style={ICON_LEFT_CONTAINER}>
            <Icon
              icon={leftIcon || 'ic_leftArrow'}
              style={headerWhite ? ICON_WHITE : ICON}
            />
          </TouchableOpacity>
        ) : (
          <View style={ICON_LEFT_CONTAINER} />
        )}
        <View style={TITLE_MIDDLE}>
          <Text
            style={[headerWhite ? TITLE_WHITE : TITLE, titleStyle]}
            text={header}
            numberOfLines={1}
          />
        </View>
        {rightIcon || !!rightText ? (
          <TouchableOpacity onPress={onPressRight} style={ICON_RIGHT_CONTAINER}>
            {rightText && <Text style={TEXT_RIGHT} text={rightText} />}
            {rightIcon && (
              <Icon icon={rightIcon} style={headerWhite ? ICON_WHITE : ICON} />
            )}
          </TouchableOpacity>
        ) : (
          <View style={ICON_RIGHT_CONTAINER} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerBg: {
    alignItems: 'center',
    aspectRatio: 375 / 86,
    position: 'absolute',
    width: dimensionsWidth,
  },
});
