import i18n from 'i18next'
import { CHANGE_LANGUAGE, ADD_LANGUAGE, Language, LanguageProps, LanguageActionTypes } from './languageActions'

interface LanguageState {
  language: Language
  languageList: LanguageProps[]
}

const defaultState: LanguageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: '英文', code: 'en' },
  ],
}
const languageReducer = (state = defaultState, action: LanguageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload) // 存在副作用
      return { ...state, language: action.payload }
    case ADD_LANGUAGE:
      return { ...state, languageList: [...state.languageList, action.payload] }
    default:
      return state
  }
}
export default languageReducer
