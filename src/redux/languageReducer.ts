export interface LanguageState {
  language: 'en' | 'zh'
  languageList: { name: string; code: string }[]
}

const defaultState: LanguageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: '英文', code: 'en' },
  ],
}
const languageReducer = (state = defaultState, action) => {
  if (action.type === 'change_language') {
    const newState = { ...state, language: action.payload }
    return newState
  }
  return state
}
export default languageReducer
