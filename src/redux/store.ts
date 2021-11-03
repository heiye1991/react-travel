import { createStore, compose, combineReducers } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
})

const store = createStore(
  rootReducer,
  compose((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()),
)

export type RootState = ReturnType<typeof store.getState>

export default store
