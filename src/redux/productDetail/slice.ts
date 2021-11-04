import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ProductDetailState {
  loading: boolean
  error: string | null
  data: any
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
}

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  async (touristRouteId: string, thunkApi) => {
    thunkApi.dispatch(productDetailSlice.actions.fetchStart())
    try {
      // 起一个koa2服务返回数据
      // const { data } = await axios.get(`http://localhost:5000/api/touristRoutes/${touristRouteId}`)
      // 请求本地json
      const { data } = await axios.get(`/mock.json?id=${touristRouteId}`)
      console.log(data)
      thunkApi.dispatch(productDetailSlice.actions.fetchSuccess(data.result))
    } catch (err: any) {
      thunkApi.dispatch(productDetailSlice.actions.fetchFail(err.message))
    }
  },
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    fetchStart: state => {
      // return { ...state, loading: true }
      // redux-toolkit 底层使用 immer 可以改变state
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.data = null
      state.error = action.payload
    },
  },
})
