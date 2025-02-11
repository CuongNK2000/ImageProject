import i18n from "../i18n"
import { Platform } from "react-native"

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * If you're interested in adding a custom font to your project,
 * check out the readme file in ./assets/fonts/ then come back here
 * and enter your new font name. Remember the Android font name
 * is probably different than iOS.
 * More on that here:
 * https://github.com/lendup/react-native-cross-platform-text
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ ios: "AvertaStdCY-Regular", android: "AvertaStdCY-Regular" }),

  primary600: Platform.select({ ios: "AvertaStdCY-Regular", android: "AvertaStdCY-Semibold" }),
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: "Arial", android: "sans-serif" }),

  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: "Courier", android: "monospace" }),

  vn: Platform.select({ ios: "Battambang", android: "KantumruyPro-Regular" }),

  vn600: Platform.select({ ios: "Battambang", android: "KantumruyPro-SemiBold" }),

  getFontLanguage: () => {
    if (i18n.getLanguage() === "vn") {
      return typography.vn
    } else {
      return typography.primary
    }
  },
}
