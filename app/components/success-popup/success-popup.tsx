import React from 'react';
import {StyleSheet, View, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {IconTypes} from '../../assets';
import useI18n from '../../i18n/context';
import {Button, Icon, ModalPortal, Text} from '..';
import {
  color,
  dimensionsWidth,
  scale,
  spacing,
  verticalScale,
} from '../../themes';

interface SuccessPopupProps {
  tittle?: string;
  message?: string;
  onPress?: () => void;
  bntText?: string;
  onPress2?: () => void;
  bntText2?: string;
  hideIcon?: boolean;
  imageContent?: React.ReactNode;
  contentView?: React.ReactNode;
  icon?: IconTypes;
  containerStyle?: ViewStyle;
  grBntContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  iconStyle?: ImageStyle;
  bntCloseStyle?: ViewStyle;
  bntCloseTextStyle?: TextStyle;
}

export const SuccessPopup = (props: SuccessPopupProps) => {
  const {
    tittle,
    message,
    onPress,
    bntText,
    onPress2,
    bntText2,
    hideIcon = false,
    imageContent,
    icon,
    containerStyle,
    grBntContainerStyle,
    titleStyle,
    iconStyle,
  } = props;
  const {i18n} = useI18n();

  const onToggle = () => {
    ModalPortal.dismissAll();
    onPress && onPress();
  };

  const onToggle2 = () => {
    ModalPortal.dismissAll();
    onPress2 && onPress2();
  };

  const btnCloseStyles = [
    styles.btnClose,
    onPress2 && {
      marginRight: scale(spacing[3]),
      backgroundColor: color.palette.blue4,
    },
    props.bntCloseStyle,
  ];

  const textTittleStyles = [
    styles.textTittle,
    hideIcon && {width: '%100'},
    titleStyle,
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.modalContentContainer, containerStyle]}>
        {imageContent || (
          <>
            {!hideIcon && (
              <Icon
                icon={icon || 'ic_success'}
                style={[styles.iconSuccess, iconStyle]}
              />
            )}
            <Text style={textTittleStyles}>
              {tittle || i18n.verifyOtpScreen.success}
            </Text>
            <Text style={styles.textContent}>{message}</Text>
            {props.contentView}
          </>
        )}

        <View style={[styles.bntContainer, grBntContainerStyle]}>
          <Button
            text={bntText || i18n.common.close}
            style={btnCloseStyles}
            onPress={onToggle}
            textStyle={[
              onPress2 && styles.textBntClose,
              props.bntCloseTextStyle,
            ]}
          />
          {onPress2 && (
            <Button
              text={bntText2 || i18n.common.agree}
              style={styles.btnClose}
              onPress={onToggle2}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bntContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(spacing[12]),
  },
  btnClose: {
    flex: 1,
    height: verticalScale(48),
  },
  container: {
    backgroundColor: color.palette.white,
    borderRadius: 20,
    justifyContent: 'center',
    width: dimensionsWidth - scale(spacing[5] * 2),
  },
  iconSuccess: {
    height: scale(80),
    marginBottom: verticalScale(spacing[4]),
    width: scale(80),
  },
  modalContentContainer: {
    alignItems: 'center',
    paddingHorizontal: scale(spacing[5]),
    paddingVertical: verticalScale(spacing[5]),
  },
  textBntClose: {
    color: color.primary,
  },
  textContent: {
    fontSize: scale(16),
    // paddingHorizontal: scale(spacing[2]),
    // textAlign: "center",
  },
  textTittle: {
    color: color.primary,
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(spacing[6]),
  },
});
