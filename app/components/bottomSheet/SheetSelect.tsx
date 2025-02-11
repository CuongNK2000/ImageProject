import React from 'react';
import {
  StyleSheet,
  View,
  ListRenderItem,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ItemSelect} from './ItemSelect';
import {Icon, Text} from '..';
import i18n from '../../i18n';
import {
  color,
  dimensionsWidth,
  scale,
  spacing,
  verticalScale,
} from '../../themes';
import {ItemSheet} from '../../common/type';

interface SheetSelectProps {
  data: ItemSheet[];
  title: string;
  onPress?: (item: ItemSheet) => void;
  close?: () => void;
  currentValue: string;
}

export const SheetSelect = (props: SheetSelectProps) => {
  const keyExtractor = (item: ItemSheet, index: number | string) =>
    `${item}${index}`;

  const renderItem: ListRenderItem<ItemSheet> = ({item}) => {
    const onPress = () => {
      props.onPress && props.onPress(item);
    };
    return (
      <ItemSelect
        onPress={onPress}
        content={item.content}
        choice={props.currentValue === item.key}
      />
    );
  };

  const ListEmptyComponent = () => (
    <Text style={styles.noData} text={i18n.common.noData} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconClose} onPress={props.close}>
          <Icon icon="ic_close" />
        </TouchableOpacity>
        <Text style={styles.tittle} text={props.title} />
        <View style={styles.iconClose} />
      </View>
      <View style={styles.line} />

      <View style={styles.contactListContainer}>
        <FlatList
          data={props.data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactListContainer: {
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: scale(spacing[5]),
    width: dimensionsWidth,
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(spacing[5]),
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(spacing[5]),
  },
  iconClose: {
    width: scale(40),
  },
  // inputSearch: {
  //   backgroundColor: color.palette.grayF5F5F5,
  //   marginBottom: verticalScale(spacing[7]),
  //   marginVertical: 0,
  // },
  line: {
    alignSelf: 'center',
    backgroundColor: color.palette.grayEDEDED,
    height: 1,
    marginBottom: verticalScale(spacing[1]),
    width: '100%',
  },
  noData: {
    alignSelf: 'center',
  },

  tittle: {
    fontSize: scale(20),
    fontWeight: '600',
  },
});
