import TranslationsContext from "./translations-context"
import { useContext } from "react"

export const useI18n = () => {
  return useContext(TranslationsContext)
}

export default useI18n
