import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle, ImageStyle } from "react-native"
import { ButtonPresetNames } from "./button.presets"
import { IconTypes } from "../../assets"

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode

  /**
   * Called when the touch is released,
   */
  onPress?: () => void

  disable?: boolean

  icon?: IconTypes

  iconStyle?: StyleProp<ImageStyle>
}
