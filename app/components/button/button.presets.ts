import { ViewStyle, TextStyle } from "react-native"
import { color, spacing, scale, dimensionsWidth } from "../../themes"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  flexDirection: "row",
  height: scale(40),
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
  fontSize: scale(18),
  fontWeight: "600",

  color: color.palette.white,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.primary } as ViewStyle,

  secondary: { ...BASE_VIEW, backgroundColor: color.palette.blue4 } as ViewStyle,

  tertiary: {
    ...BASE_VIEW,
    backgroundColor: color.palette.white,
    borderWidth: 2,
    borderColor: color.primary,
  } as ViewStyle,
  /**
   * A button without extras.
   */
  link: {
    // ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,

  none: {} as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT } as TextStyle,
  secondary: { ...BASE_TEXT, color: color.primary } as TextStyle,
  tertiary: { ...BASE_TEXT, color: color.primary } as TextStyle,
  link: {
    // ...BASE_TEXT,
    color: color.palette.blue1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
