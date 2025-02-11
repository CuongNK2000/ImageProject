import ThemeContext from "./theme-context"
import { useContext } from "react"

const useAppTheme = () => {
  return useContext(ThemeContext)
}

export default useAppTheme
