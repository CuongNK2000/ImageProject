import {TextStyle} from 'react-native';
import {typography, color, scale, verticalScale, spacing} from '../../themes';

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: scale(16),
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: {...BASE, fontWeight: 'bold'} as TextStyle,

  /**
   * Large headers.
   */
  header: {...BASE, fontSize: 24, fontWeight: 'bold'} as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: {
    ...BASE,
    fontSize: scale(12),
    color: color.primary,
    fontWeight: '600',
  } as TextStyle,

  /**
   * A smaller piece of secondard information.
   */
  secondary: {...BASE, fontSize: 9, color: color.dim} as TextStyle,

  error: {
    ...BASE,
    fontSize: scale(12),
    color: color.error,
    marginTop: verticalScale(spacing[1]),
  },
};

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets;
