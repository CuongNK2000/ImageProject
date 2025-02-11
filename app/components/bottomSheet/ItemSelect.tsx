import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text} from '..';
import {color, scale, spacing, verticalScale} from '../../themes';

interface ItemSelectProps {
  content: string;
  choice: boolean;
  onPress: () => void;
}

export const ItemSelect = (props: ItemSelectProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.genderContainer, styles.borderBottom]}>
      <Icon icon={props.choice ? 'ic_radio' : 'ic_radio_off'} />
      <Text style={styles.textContent} text={props.content} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomColor: color.palette.grayEDEDED,
    borderBottomWidth: 1,
  },

  genderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: verticalScale(spacing[4]),
  },

  textContent: {
    color: color.palette.gray600,
    flex: 1,
    fontSize: scale(16),
    fontWeight: '600',
    marginLeft: scale(spacing[3]),
  },
});
