import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from '@reduxjs/toolkit'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import { actionLog } from './middlewares/actionLog'
import { productDetailSlice } from './productDetail/slice'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
})
// createStore中只能放两个参数
// 为了react浏览器扩展插件和redux-thunk一起使用，修改如下，使用compose增强函数
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const enhancer = composeEnhancers(applyMiddleware(thunk, actionLog))
const store = createStore(rootReducer, enhancer)

export type RootState = ReturnType<typeof store.getState>

export default store
