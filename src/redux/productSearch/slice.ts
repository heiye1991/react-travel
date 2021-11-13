import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ProductSearchState {
  loading: boolean
  error: string | null
  data: any
  pagination: any
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
}

export const searchProduct = createAsyncThunk(
  'productSearch/searchProduct',
  async (parameters: { keywords: string; nextPage: string | number; pageSize: string | number }) => {
    let url = `/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`
    if (parameters.keywords) {
      url += `&keywords=${parameters.keywords}`
    }
    const { data } = await axios.get(url)
    return {
      data: data.result,
      pagination: {
        pageNumber: parameters.nextPage,
        pageSize: parameters.pageSize,
        totalCount: 4,
      },
    }
  },
)

export const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: state => {
      state.loading = true
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.loading = false
      state.pagination = action.payload.pagination
      state.data = action.payload.data
      state.error = null
    },
    [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.data = null
      state.error = action.payload
    },
  },
})
