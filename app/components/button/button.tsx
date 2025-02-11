import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '../text/text';
import {viewPresets, textPresets} from './button.presets';
import {ButtonProps} from './button.props';
import {color} from '../../themes';
import {Icon} from '../../components';
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = 'primary',
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    disable = false,
    icon,
    iconStyle,
    ...rest
  } = props;

  const disableButton = React.useRef(false);

  const viewStyle = viewPresets[preset] || viewPresets.primary;
  const viewStyles = [viewStyle, styleOverride];
  const viewDisableStyles = [
    viewStyles,
    {backgroundColor: color.palette.gray200},
  ];
  const textStyle = textPresets[preset] || textPresets.primary;
  const textStyles = [
    textStyle,
    disable && {color: color.palette.gray300},
    textStyleOverride,
  ];

  const content = children || (
    <Text text={text} style={textStyles} numberOfLines={1} />
  );

  const onPress = React.useCallback(async () => {
    try {
      if (disableButton.current === false) {
        disableButton.current = true;
        props.onPress && (await props.onPress());
        disableButton.current = false;
      }
    } catch (e) {
      alert(e.toString());
    }
  }, [props]);

  return (
    <>
      {disable ? (
        <View style={viewDisableStyles}>{content}</View>
      ) : (
        <TouchableOpacity style={viewStyles} {...rest} onPress={onPress}>
          {icon && <Icon icon={icon} style={iconStyle} />}
          {content}
        </TouchableOpacity>
      )}
    </>
  );
}
