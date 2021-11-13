import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ShoppingCartState {
  loading: boolean
  error: string | null
  items: any[]
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: [],
}

export const getShoppingCart = createAsyncThunk('shoppingCart/getShoppingCart', async (jwt: string) => {
  const { data } = await axios.get(`/api/shoppingCart`, {
    headers: {
      Authorization: `bear ${jwt}`,
    },
  })
  return data.result.shoppingCartItems
})
export const addShoppingCartItem = createAsyncThunk(
  'shoppingCart/addShoppingCart',
  async (parameters: { jwt: string; touristRouteId: string }) => {
    const { data } = await axios.post(
      `/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId,
      },
      {
        headers: {
          Authorization: `bear ${parameters.jwt}`,
        },
      },
    )
    return data.result.shoppingCartItems
  },
)
export const clearShoppingCart = createAsyncThunk(
  'shoppingCart/clearShoppingCart',
  async (parameters: { jwt: string; itemIds: number[] }) => {
    const { data } = await axios.delete(`/api/shoppingCart/items/${parameters.itemIds.join(',')}`, {
      headers: {
        Authorization: `bear ${parameters.jwt}`,
      },
    })
    return data.result
  },
)

export const checkout = createAsyncThunk('shoppingCart/checkout', async (jwt: string) => {
  const { data } = await axios.post(`/api/shoppingCart/checkout`, null, {
    headers: {
      Authorization: `bear ${jwt}`,
    },
  })
  return data.result
})

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: state => {
      state.loading = true
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false
      state.items = action.payload
      state.error = null
    },
    [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [addShoppingCartItem.pending.type]: state => {
      state.loading = true
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.loading = false
      state.items = action.payload
      state.error = null
    },
    [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [clearShoppingCart.pending.type]: state => {
      state.loading = true
    },
    [clearShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false
      state.items = action.payload
      state.error = null
    },
    [clearShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [checkout.pending.type]: state => {
      state.loading = true
    },
    [checkout.fulfilled.type]: state => {
      state.loading = false
      state.items = []
      state.error = null
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
