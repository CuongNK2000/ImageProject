import * as React from 'react';
import {Image, ImageSourcePropType, ImageStyle, StyleSheet} from 'react-native';

interface ImageLoadProps {
  image: string;
  imageDefault?: ImageSourcePropType;
  styles?: ImageStyle;
  base64Image?: boolean;
}

const ImageLoad = (props: ImageLoadProps) => {
  const [dedaultImage, setDedaultImage] = React.useState(false);

  const onImageError = () => {
    if (!dedaultImage) {
      setDedaultImage(true);
    }
  };

  const image = props.base64Image
    ? `data:image/png;base64,${props.image}`
    : props.image;
  return !props.image || dedaultImage ? (
    <Image source={props.imageDefault} style={[styles.image, props.styles]} />
  ) : (
    <Image
      source={{uri: image}}
      style={[styles.image, props.styles]}
      onError={onImageError}
    />
  );
};

export default ImageLoad;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
});
