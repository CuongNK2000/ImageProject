import * as React from 'react';
import {Text as ReactNativeText, StyleSheet, TextStyle} from 'react-native';
import {presets} from './text.presets';
import {TextProps} from './text.props';
import {typography} from '../../themes';
import useI18n from '../../i18n/context';
import useAppTheme from '../../themes/context';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = 'default',
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;
  const {theme} = useAppTheme();
  const {appLanguage} = useI18n();

  // figure out which content to use
  const content = text || children;

  const style = presets[preset] || presets.default;

  // const font = appLanguage === "kh" && { fontFamily: typography.khr }

  const font: TextStyle = React.useMemo(() => {
    const fontWeight = StyleSheet.flatten(styleOverride)?.fontWeight;
    if (appLanguage === 'vn') {
      return {
        fontFamily: fontWeight === '600' ? typography.vn600 : typography.vn,
      };
    } else {
      return {
        fontFamily:
          fontWeight === '600' ? typography.primary600 : typography.primary,
      };
    }
  }, [appLanguage, styleOverride]);

  const styles = [style, {color: theme.colors.textColor}, font, styleOverride];

  return (
    <ReactNativeText {...rest} style={styles} allowFontScaling={false}>
      {content}
    </ReactNativeText>
  );
}
