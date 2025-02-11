import * as React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {scale, verticalScale} from '../../themes';

let listRefBottom = [];

export const closeAllBottomSheet = () => {
  for (let i = 0; i < listRefBottom.length; i++) {
    listRefBottom[i]?.current?.close();
    if (i === listRefBottom.length - 1) {
      listRefBottom = [];
    }
  }
};

export const numberBottomSheet = () => {
  return listRefBottom.length;
};

interface BottomSheetProps {
  content: React.ReactNode;
  heightRBSheet?: number;
  containerStyles?: ViewStyle;
}

const BottomSheet = (props: BottomSheetProps, ref: any) => {
  const filterRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    onOpen,
    onClose,
  }));

  const onOpen = React.useCallback(() => {
    filterRef.current.open();
  }, []);

  const onClose = React.useCallback(() => {
    filterRef.current.close();
  }, []);

  const containerRbStyles = {...styles.containerRb, ...props.containerStyles};

  React.useEffect(() => {
    listRefBottom.push(filterRef);

    return () => {
      const index = listRefBottom.indexOf(filterRef);
      if (index > -1) {
        listRefBottom.splice(index, 1);
      }
    };
  }, []);

  return (
    <RBSheet
      customStyles={{
        container: containerRbStyles,
        draggableIcon: styles.draggableIcon,
      }}
      ref={filterRef}
      height={props.heightRBSheet || verticalScale(150)}
      closeDuration={200}
      openDuration={200}
      closeOnPressMask={true}>
      {props.content}
    </RBSheet>
  );
};

export default React.forwardRef(BottomSheet);

const styles = StyleSheet.create({
  containerRb: {
    alignSelf: 'center',
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(6),
    paddingBottom: verticalScale(15),
  },
  draggableIcon: {
    height: verticalScale(4),
  },
});
