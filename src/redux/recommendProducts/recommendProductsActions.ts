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
