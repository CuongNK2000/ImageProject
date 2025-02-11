import {Button} from '../../components/button/button';
import {Text} from '../../components/text/text';
import useI18n from '../../i18n/context';
import * as React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Keyboard,
  InteractionManager,
} from 'react-native';
import {color, dimensionsWidth, scale, verticalScale} from '../../themes';
import popupErrorManager from './popupErrorManager';
import {
  closeAllBottomSheet,
  numberBottomSheet,
} from '../../components/bottomSheet/bottomSheet';
import useAppTheme from '../../themes/context';
import {hideLoading, Icon, ModalPortal} from '..';

interface PopupParam {
  titleNotification?: boolean;
  content?: string;
  viewContent?: React.ReactNode;
  callback?: () => void;
  titleButton?: string;
  titleSecondButton?: string;
  doubleButton?: boolean;
  actionAgree?: () => void;
  showBtnClose?: boolean;
}

export function showPopupError(param: PopupParam) {
  const ref: any = popupErrorManager.getDefault();
  if (ref) {
    ref?.current?.showError(param);
  }
}

export function hidePopupError() {
  const ref: any = popupErrorManager.getDefault();
  if (ref) {
    ref?.current?.hideError();
  }
}

interface PopupErrorProps {}

const PopupError = (props: PopupErrorProps, ref: any) => {
  const {i18n} = useI18n();
  const {theme} = useAppTheme();
  const actionAgree = React.useRef(null);

  const titleNotification = React.useRef(false);
  const content = React.useRef('');
  const viewContent = React.useRef(null);
  const actionClose = React.useRef(null);
  const titleBtn = React.useRef('');
  const titleSecondBtn = React.useRef('');
  const doubleButton = React.useRef(false);
  const showBtnClose = React.useRef(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    showError,
    hideError,
  }));

  const showError = (param: PopupParam) => {
    if (!isVisible) {
      hideLoading();
      ModalPortal.dismissAll();
      titleNotification.current = param.titleNotification || false;
      content.current = param.content;
      viewContent.current = param.viewContent;
      actionClose.current = param.callback;
      titleBtn.current = param.titleButton;
      titleSecondBtn.current = param.titleSecondButton;
      doubleButton.current = !!param.doubleButton;
      actionAgree.current = param.actionAgree;
      showBtnClose.current = param.showBtnClose;

      // if (numberBottomSheet() > 0) {
      closeAllBottomSheet();
      InteractionManager.runAfterInteractions(() => {
        setIsVisible(true);
      });
      // setTimeout(() => {
      //   setIsVisible(true)
      // }, 300)
      // } else {
      //   setIsVisible(true)
      // }
      Keyboard.dismiss();
    }
  };

  const hideError = () => {
    setIsVisible(false);
  };

  const onClose = () => {
    hideError();
    actionClose?.current && actionClose?.current();
  };

  const onAgree = () => {
    hideError();
    actionAgree?.current && actionAgree?.current();
  };

  const btnCancelStyle = [
    styles.buttonCancel,
    {backgroundColor: theme.colors.btnOpacity},
  ];
  const textCancelStyle = {color: theme.colors.btnColor};
  if (!isVisible) {
    return null;
  }
  return (
    // <Modal animationType="fade" visible={isVisible} transparent={true} statusBarTranslucent>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.groupHeader}>
          {titleNotification.current && (
            <Text
              text={
                titleNotification.current
                  ? i18n.common.notice
                  : i18n.common.error
              }
              style={
                titleNotification.current ? styles.title : styles.titleError
              }
            />
          )}
          {showBtnClose.current && (
            <TouchableOpacity onPress={hideError}>
              <Icon icon={'ic_closeSearch'} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.contentError}>
          {!!content.current && <Text text={content.current} />}
          {!!viewContent.current && viewContent.current}
        </View>
        {!doubleButton.current && (
          <Button
            text={titleBtn.current || i18n.common.close}
            onPress={onClose}
            preset="secondary"
          />
        )}
        {doubleButton.current && (
          <View style={styles.groupButton}>
            <Button
              text={titleBtn.current || i18n.common.no}
              style={btnCancelStyle}
              onPress={onClose}
              textStyle={textCancelStyle}
            />
            <Button
              text={titleSecondBtn.current || i18n.common.agree}
              style={styles.buttonAgree}
              onPress={onAgree}
            />
          </View>
        )}
      </View>
    </View>
    // </Modal>
  );
};

export default React.forwardRef(PopupError);

const styles = StyleSheet.create({
  buttonAgree: {
    flex: 1,
    height: scale(40),
  },
  buttonCancel: {
    flex: 1,
    height: scale(40),
    marginRight: scale(20),
  },
  container: {
    alignItems: 'center',
    backgroundColor: color.palette.bgtransparent,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  content: {
    backgroundColor: color.palette.white,
    borderRadius: scale(20),
    marginBottom: verticalScale(40),
    padding: scale(20),
    width: dimensionsWidth - scale(20) * 2,
  },
  contentError: {
    marginVertical: scale(15),
  },
  groupButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  groupHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: color.palette.blue1,
    flex: 1,
    fontSize: scale(24),
    fontWeight: 'bold',
  },
  titleError: {
    color: color.palette.redFF4848,
    flex: 1,
    fontSize: scale(24),
    fontWeight: 'bold',
  },
});
