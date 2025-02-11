import React from 'react';
import {View, StyleSheet, BackHandler, Keyboard} from 'react-native';
import Spinner, {SpinnerType} from 'react-native-spinkit';
import {color, dimensionsWidth, scale} from '../../themes';
import LoadingManager from './loadingManager';
import AnimatedLottieView from 'lottie-react-native';

const TIME_OUT = 60 * 1000;

export enum ShowLoadingType {
  'js_wellcome_login',
  'js_start_loading',
}

export function showLoading(type?: ShowLoadingType) {
  const ref: any = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.showLoading(type);
  }
}

export function hideLoading() {
  const ref = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.hideLoading();
  }
}

interface IProps {
  spinnerSize?: number;
  spinnerType?: SpinnerType;
  spinnerColor?: string;
}

const LoadingModal = (props: IProps, ref: any) => {
  const [isVisible, setisVisible] = React.useState({enable: false, type: null});

  React.useEffect(() => {
    let loadingTimeout: any = null;
    if (isVisible.enable) {
      loadingTimeout = setTimeout(() => {
        setisVisible({enable: false, type: ''});
      }, TIME_OUT);
    } else {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    }
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isVisible]);

  React.useImperativeHandle(ref, () => ({
    showLoading: showModalLoading,
    hideLoading: hideModalLoading,
  }));

  React.useEffect(() => {
    const handlerBack = () => {
      if (isVisible.enable) {
        return true;
      } else {
        return false;
      }
    };
    BackHandler.addEventListener('hardwareBackPress', handlerBack);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handlerBack);
  }, [isVisible]);

  const showModalLoading = (type?: ShowLoadingType) => {
    setisVisible({enable: true, type});
    Keyboard.dismiss();
  };

  const hideModalLoading = () => {
    setisVisible({enable: false, type: null});
  };

  const getShowLoading = () => {
    if (isVisible.type === ShowLoadingType.js_wellcome_login) {
      return <AnimatedLottieView autoPlay style={styles.lottie} />;
    } else {
      return <AnimatedLottieView autoPlay style={styles.lottie} />;
    }
  };

  return isVisible.enable ? (
    <View style={styles.container}>
      {getShowLoading()}
      {/* <AnimatedLottieView autoPlay style={styles.lottie} source={icons.js_start_loading} /> */}
      {/* <Spinner
        isVisible
        size={props.spinnerSize || 40}
        type={props.spinnerType || "Circle"}
        color={props.spinnerColor || "#00FFFFFF"}
      /> */}
    </View>
  ) : (
    <></>
  );
};

export default React.forwardRef(LoadingModal);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.palette.bgtransparent,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  lottie: {
    width: dimensionsWidth,
    // backgroundColor: "red",
  },
});
