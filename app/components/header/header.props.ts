import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"
import { IconTypes } from "../../assets"

export interface HeaderProps {
  /**
   * header i18n
   */
  title?: string

  /**
   * Icon that should appear on the left
   */
  leftIcon?: IconTypes

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * Icon that should appear on the right
   */
  rightIcon?: IconTypes

  /**
   * Text that should appear on the right
   */
  rightText?: string

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Title style overrides.
   */
  titleStyle?: StyleProp<TextStyle>

  /**
   * Hide left icon
   */
  hideLeftIcon?: boolean

  /**
   * text and btn color is white
   */
  headerWhite?: boolean

  headerBg?: boolean
}
