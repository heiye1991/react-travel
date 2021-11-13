import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import axios from 'axios'
import { RootState } from '../store'

export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START' // 正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS' // 调用推荐信息api成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL' // 调用推荐信息api失败

export interface RecommendProductsPros {
  productList1: any[]
  productList2: any[]
  productList3: any[]
}

interface FetchRecommendProductsStart {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}
interface FetchRecommendProductsSuccess {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS
  payload: RecommendProductsPros
}
interface FetchRecommendProductsFail {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL
  payload: any
}

export type RecommendProductsActionTypes =
  | FetchRecommendProductsStart
  | FetchRecommendProductsSuccess
  | FetchRecommendProductsFail

export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStart => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START,
  }
}
export const fetchRecommendProductsSuccessActionCreator = (
  data: RecommendProductsPros,
): FetchRecommendProductsSuccess => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  }
}
export const fetchRecommendProductsFailActionCreator = (error: any): FetchRecommendProductsFail => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error,
  }
}

// thunk 可以返回一个函数或者一个js对象，在一个thunk action中可以完成一系列的action操作，可以处理异步逻辑
// 业务逻辑可以从ui层面挪出，代码分层更加清晰
export const giveDataActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendProductsActionTypes> => (dispatch: Dispatch) => {
    // 获取首页旅游栏目的数据列表
    axios
      .get('/api/recommend/touristRoutes')
      .then((res: any) => {
        dispatch(
          fetchRecommendProductsSuccessActionCreator({
            productList1: res.data.result.products1,
            productList2: res.data.result.products2,
            productList3: res.data.result.products3,
          }),
        )
      })
      .catch(err => {
        dispatch(
          fetchRecommendProductsFailActionCreator({
            error: err.message,
          }),
        )
      })
  }
