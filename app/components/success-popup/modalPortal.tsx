import * as React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Platform,
  InteractionManager,
} from 'react-native';
import {color, scale, verticalScale} from '../../themes';

export const ModalPortal = {
  dismissAll: null,
  show: null,
  showEasyPaymentBiometric: null,
  showEasyPaymentPinCode: null,
};

export const SuccessModalPortal = () => {
  const [modal, setModal] = React.useState({
    isVisible: false,
    content: null,
  });

  const dismissAll = () => {
    setModal({
      isVisible: false,
      content: null,
    });
  };

  const show = content => {
    InteractionManager.runAfterInteractions(() => {
      setModal({
        isVisible: true,
        content,
      });
    });
  };

  React.useEffect(() => {
    ModalPortal.dismissAll = dismissAll;
    ModalPortal.show = show;
    return () => {
      ModalPortal.dismissAll = null;
      ModalPortal.show = null;
      ModalPortal.showEasyPaymentBiometric = null;
      ModalPortal.showEasyPaymentPinCode = null;
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      visible={modal.isVisible}
      transparent={true}
      statusBarTranslucent>
      <View style={styles.container}>{modal.content}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnCancelStyle: {
    backgroundColor: color.palette.blueD0E2FB,
    marginTop: verticalScale(8),
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
  textCancelStyle: {
    color: color.palette.blue1,
  },
  textMessagePopup: {
    fontSize: scale(13),
    marginBottom: scale(20),
  },
  textTitlePopup: {
    fontSize: scale(17),
    fontWeight: '600',
    marginBottom: scale(12),
  },
  viewPopupContainer: {
    backgroundColor: color.palette.white,
    borderRadius: scale(16),
    marginHorizontal: scale(38),
    paddingHorizontal: scale(20),
    paddingVertical: scale(16),
  },
});
