export type Language = 'zh' | 'en'

export interface LanguageProps {
  name: string
  code: string
}

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE
  payload: Language
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE
  payload: LanguageProps
}

export type LanguageAcitonTypes = ChangeLanguageAction | AddLanguageAction

export const CHANGE_LANGUAGE = 'change_language'
export const ADD_LANGUAGE = 'add_language'

export const changeLanguageActionCreator = (languageCode: Language): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  }
}
export const addLanguageActionCreator = (payload: LanguageProps): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload,
  }
}
