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
    // 获取每个旅游栏目的数据列表
    function getProducts(catgoryID: number) {
      return axios.post('https://vacations.ctrip.com/restapi/gateway/14422/displayWindow', {
        catgoryID,
        channel: 'Online',
        siteID: 1,
        startCity: 1,
        version: 'B',
      })
    }
    // 处理获取到的数据列表
    function dealProducts(arr: any[]) {
      const products: any[] = []
      for (const item of arr) {
        products.push({
          id: item.id,
          price: item.price,
          title: item.name,
          touristRoutePictures: [
            {
              url: item.img,
            },
          ],
        })
      }
      return products
    }
    dispatch(fetchRecommendProductsStartActionCreator())
    axios
      .all([getProducts(1), getProducts(2), getProducts(3)])
      .then(
        axios.spread((res1, res2, res3) => {
          const arr1 = res1.data.displayWindowModels[0].tabList[0].products
          const products1 = dealProducts(arr1)

          const arr2 = res2.data.displayWindowModels[0].tabList[0].products
          const products2 = dealProducts(arr2)

          const arr3 = res3.data.displayWindowModels[0].tabList[0].products
          const products3 = dealProducts(arr3)

          dispatch(
            fetchRecommendProductsSuccessActionCreator({
              productList1: products1,
              productList2: products2,
              productList3: products3,
            }),
          )
        }),
      )
      .catch(err => {
        dispatch(
          fetchRecommendProductsFailActionCreator({
            error: err.message,
          }),
        )
      })
  }
