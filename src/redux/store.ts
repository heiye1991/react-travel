import { createStore, compose } from 'redux'
import languageReducer from './language/languageReducer'

const store = createStore(
  languageReducer,
  compose((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()),
)

export type RootState = ReturnType<typeof store.getState>

export default store
