import { ImageStyle, StyleProp, ViewStyle } from "react-native"
import { IconTypes } from "../../assets"

export interface IconProps {
  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */

  containerStyle?: StyleProp<ViewStyle>

  /**
   * The name of the icon
   */

  icon?: IconTypes
}
