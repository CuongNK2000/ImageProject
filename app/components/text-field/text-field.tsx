import React from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from 'react-native';
import {Text} from '../text/text';
import {useController, Control} from 'react-hook-form';
import {color, scale, spacing, typography} from '../../themes';
import {IconTypes} from '../../assets';
import useI18n from '../../i18n/context';
import {handleDateInput} from '../../utils/time';
import {Icon} from '..';
import i18n from '../../i18n';

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingHorizontal: scale(spacing[4]),

  borderRadius: 8,
  borderWidth: 1,

  height: scale(60),

  justifyContent: 'space-between',

  backgroundColor: 'white',
};

const NO_FOCUSED: TextStyle = {
  height: '100%',
  flex: 1,
  fontSize: scale(16),
  fontFamily: typography.primary,
};

// the base styling for the TextInput
const INPUT: TextStyle = {
  flex: 1,
  fontFamily: typography.primary,
  fontSize: scale(18),
  fontWeight: 'normal',
  paddingVertical: 0,
  paddingHorizontal: 0,
  color: 'black',
  backgroundColor: color.transparent,
  paddingRight: scale(20),
};

const LABEL: TextStyle = {
  marginTop: scale(8),
};

const UNDERLINE: ViewStyle = {
  height: 2,
};

const ERROR_TEXT: TextStyle = {
  fontSize: scale(12),
  marginTop: 2,
};

const GROUP_INPUT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  flexDirection: 'row',
};

const NO_FOCUS_GROUPINPUT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  flexDirection: 'row',
};

const GROUP_TEXTFIELD: ViewStyle = {
  flex: 1,
};

const UNIT: TextStyle = {
  color: color.palette.redE11900,
  fontSize: scale(14),
  fontWeight: 'bold',
};

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: {[name: string]: ViewStyle} = {
  default: {},
  description: {},
  any: {},
  date: {},
  number: {},
  phoneNumber: {},
  street: {},
};

export interface TextFieldProps extends TextInputProps {
  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string;

  /**
   * The label text if no labelTx is provided.
   */
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS;

  forwardedRef?: any;

  error?: boolean;

  errorText?: string;

  control: Control;

  name: string;

  onFocused?: () => void;
  outFocused?: () => void;

  onDisableError?: () => void;

  inputContainerStyle?: ViewStyle;

  isPassword?: boolean;
  maxLength?: number;
  defaultValue?: string;
  currency?: string;
  editable?: boolean;
  iconRight?: IconTypes;
  onPressIconRight?: () => void;
  upperCase?: boolean;
  showFieldLabel?: boolean;
  multiline?: boolean;
  iconRightStyle?: StyleProp<ImageStyle>;
  subIconRight?: IconTypes;
  subIconRightStyle?: StyleProp<ImageStyle>;
  changeText?: () => void;
  customContentRight?: React.ReactNode;
  fixPlaceholder?: boolean;
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholder,
    label,
    labelStyle,
    preset = 'default',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    inputContainerStyle,
    forwardedRef,
    error,
    errorText = '',
    control,
    name,
    onFocused,
    outFocused,
    isPassword,
    onDisableError,
    maxLength = 32,
    defaultValue = '',
    currency,
    editable = true,
    iconRight,
    onPressIconRight,
    upperCase,
    showFieldLabel,
    iconRightStyle,
    subIconRight,
    subIconRightStyle,
    changeText,
    customContentRight,
    fixPlaceholder,
    ...rest
  } = props;

  const {appLanguage} = useI18n();

  const {field} = useController({
    control,
    defaultValue:
      __DEV__ && props.name === 'password' ? 'Mbc@12345' : defaultValue,
    name,
  });

  const [focused, setFocused] = React.useState(false);
  const [blur, setBlur] = React.useState(false);
  const [validatePassword, setValidatePassword] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(isPassword);

  const onfocus = () => {
    setFocused(true);
    setBlur(false);
    if (onFocused) {
      onFocused();
    }
  };

  const onBlur = () => {
    if (field.value === '') {
      setFocused(false);
    }
    isPassword && field.value !== '' && field.value.length < 6
      ? setValidatePassword(true)
      : setValidatePassword(false);

    onDisableError && onDisableError();
    outFocused && outFocused();

    setBlur(true);
  };

  const onChangeText = text => {
    upperCase && (text = text.toUpperCase());
    // if (isPassword) {
    //   text = text.trim().replace(/[^a-zA-Z0-9!@#$%^&*().]/g, "")
    // } else if (preset === "description") {
    //   text = text.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s\s+/g, " ")
    // } else if (preset === "any") {
    //   text = text.replace(/\s\s+/g, " ")
    // } else if (preset === "date") {
    //   text = handleDateInput(text)
    // } else if (preset === "dateNonCheckYear") {
    //   text = handleDateInput(text, true)
    // } else if (preset === "number") {
    //   text = text.trim().replace(/[^0-9]/g, "")
    // } else {
    //   text = text.trim().replace(/[^a-zA-Z0-9]/g, "")
    // }
    if (text[0] === ' ') {
      text = text.trim();
    }

    if (isPassword) {
      text = text.trim().replace(/[^a-zA-Z0-9!@#$%^&*().]/g, '');
    } else {
      switch (preset) {
        case 'description':
          text = text.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s\s+/g, ' ');
          break;
        case 'any':
          text = text.replace(/\s\s+/g, ' ');
          break;
        case 'date':
          text = handleDateInput(text);
          break;
        case 'dateNonCheckYear':
          text = handleDateInput(text, true);
          break;
        case 'number':
          text = text.trim().replace(/[^0-9]/g, '');
          break;
        case 'phoneNumber':
          text = text.trim().replace(/[^0-9]/g, '');
          if (text.slice(0, 3) === '855') {
            text = `0`;
          }
          break;
        case 'street':
          text = text.replace(/[^a-zA-Z0-9 ,-]/g, '').replace(/\s\s+/g, ' ');
          break;
        case 'default':
          text = text.trim().replace(/[^a-zA-Z0-9]/g, '');
          break;
        default:
          text = text.trim().replace(/[^a-zA-Z0-9]/g, '');
          break;
      }
    }

    text = text.substring(0, isPassword ? 20 : maxLength);

    field.onChange(text);
    setValidatePassword(false);
    onDisableError && onDisableError();
    changeText && changeText();
  };

  const onSeePassword = () => {
    setSecureTextEntry(secureTextEntry => !secureTextEntry);
  };

  const onDeleteText = React.useCallback(() => {
    field.onChange('');
  }, []);

  const containerStyles = [PRESETS[preset], styleOverride];

  const inputContainerStyles = [
    CONTAINER,
    {
      borderColor:
        error || validatePassword ? color.palette.angry : 'transparent',
    },
    !editable && {backgroundColor: color.palette.grayEDEDED},
    props?.multiline && {
      paddingVertical:
        focused ||
        (!!defaultValue && !!field.value) ||
        showFieldLabel ||
        !!field.value
          ? 0
          : scale(Platform.OS === 'ios' ? 14 : 7),
      minHeight: scale(57),
      height: null,
    },
    inputContainerStyle,
  ];

  const labelTextStyles = [
    LABEL,
    {
      color:
        error || validatePassword || blur || (!focused && defaultValue)
          ? color.palette.gray3
          : color.primary,
    },
    labelStyle,
  ];

  const inputStyles =
    focused || !!defaultValue || !!field.value || showFieldLabel
      ? [
          INPUT,
          {color: color.palette.gray700},
          inputStyleOverride,
          !field.value && appLanguage === 'kh' && {fontFamily: typography.vn},
        ]
      : [
          NO_FOCUSED,
          {color: color.palette.gray3},
          !field.value && appLanguage === 'kh' && {fontFamily: typography.vn},
        ];

  const underLineStyle = [
    UNDERLINE,
    {backgroundColor: error || blur ? color.transparent : color.primary},
  ];

  const errorTextStyles = [ERROR_TEXT, {color: color.palette.angry}];

  return (
    <View style={containerStyles}>
      <View style={inputContainerStyles}>
        <View style={focused ? GROUP_INPUT : NO_FOCUS_GROUPINPUT}>
          <View style={GROUP_TEXTFIELD}>
            {(focused || !!defaultValue || !!field.value || showFieldLabel) && (
              <Text preset="fieldLabel" text={label} style={labelTextStyles} />
            )}
            <TextInput
              value={field.value}
              onChangeText={onChangeText}
              placeholder={focused || fixPlaceholder ? placeholder : label}
              placeholderTextColor={
                focused ? color.palette.gray4 : color.palette.gray3
              }
              underlineColorAndroid={color.transparent}
              {...rest}
              style={inputStyles}
              ref={forwardedRef}
              onFocus={onfocus}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              // maxLength={isPassword ? 20 : maxLength}
              editable={editable}
              allowFontScaling={false}
              multiline={props?.multiline}
            />
            {!!field.value &&
              !blur &&
              !iconRight &&
              !currency &&
              !subIconRight &&
              !customContentRight &&
              !isPassword &&
              focused && (
                <TouchableOpacity style={styles.button} onPress={onDeleteText}>
                  <Icon icon={'ic_closeSearch'} style={styles.icon} />
                </TouchableOpacity>
              )}
          </View>
          {isPassword && field.value.length > 0 && (
            <TouchableOpacity onPress={onSeePassword}>
              <Icon icon={secureTextEntry ? 'eye_slash' : 'eye'} />
            </TouchableOpacity>
          )}
          {!!currency && (
            <Text
              style={[UNIT, currency === 'USD' && styles.unitGreen]}
              text={currency}
            />
          )}
          {iconRight && (
            <TouchableOpacity
              hitSlop={{left: 4, bottom: 4, right: 4, top: 4}}
              onPress={onPressIconRight}>
              <Icon style={iconRightStyle} icon={iconRight} />
            </TouchableOpacity>
          )}
          {!!subIconRight && (
            <Icon style={subIconRightStyle} icon={subIconRight} />
          )}
          {!!customContentRight && customContentRight}
        </View>
        {focused && <View style={underLineStyle}></View>}
      </View>
      {(error || validatePassword) && (
        <Text style={errorTextStyles}>
          {errorText || (validatePassword ? i18n.login.atLeastCharacters : '')}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    bottom: 10,
    position: 'absolute',
    right: 0,
  },
  icon: {
    height: scale(15),
    resizeMode: 'contain',
    tintColor: color.palette.gray757575,
    width: scale(15),
  },
  unitGreen: {
    color: color.palette.green00AB56,
  },
});
