import {
  FETCH_RECOMMEND_PRODUCTS_FAIL,
  FETCH_RECOMMEND_PRODUCTS_START,
  FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  RecommendProductsActionTypes,
} from './recommendProductsActions'

interface RecommendProductsState {
  loading: boolean
  error: string | null
  productList1: any[]
  productList2: any[]
  productList3: any[]
}
const defaultState: RecommendProductsState = {
  loading: true,
  error: null,
  productList1: [],
  productList2: [],
  productList3: [],
}
const recommendProductsReducer = (state = defaultState, action: RecommendProductsActionTypes) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCTS_START:
      return {
        ...state,
        loading: true,
        error: null,
        productList1: [],
        productList2: [],
        productList3: [],
      }
    case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        productList1: action.payload.productList1,
        productList2: action.payload.productList2,
        productList3: action.payload.productList3,
      }
    case FETCH_RECOMMEND_PRODUCTS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        productList1: [],
        productList2: [],
        productList3: [],
      }

    default:
      return state
  }
}

export default recommendProductsReducer
