import { palette } from "./palette";

export const color = {
    palette,

    transparent: "rgba(0, 0, 0, 0)",
    /**
     * The screen background.
     */
    background: palette.offWhite,
    /**
     * The main tinting color.
     */
    primary: palette.orangeB2422D,

    text: palette.white,
    /**
     * Secondary information.
     */
    dim: palette.lightGrey,
    /**
     * Error messages and icons.
     */
    error: palette.angry,
}