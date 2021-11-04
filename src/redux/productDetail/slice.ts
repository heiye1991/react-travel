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

export const getProductDetail = createAsyncThunk('productDetail/getProductDetail', async (touristRouteId: string) => {
  // 起一个koa2服务返回数据
  // const { data } = await axios.get(`http://localhost:5000/api/touristRoutes/${touristRouteId}`)
  // 请求本地json
  const { data } = await axios.get(`/mock.json?id=${touristRouteId}`)
  return data.result
})

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: {
    [getProductDetail.pending.type]: state => {
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.data = null
      state.error = action.payload
    },
  },
})
