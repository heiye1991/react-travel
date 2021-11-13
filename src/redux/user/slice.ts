import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface UserState {
  loading: boolean
  error: string | null
  token: string | null
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
}

export const signIn = createAsyncThunk('user/signIn', async (parameters: { username: string; password: string }) => {
  const { data } = await axios.post('/auth/login', {
    username: parameters.username,
    password: parameters.password,
  })
  return data.result.token
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.loading = false
      state.token = null
      state.error = null
    },
  },
  extraReducers: {
    [signIn.pending.type]: state => {
      state.loading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.loading = false
      state.token = action.payload
      state.error = null
    },
    [signIn.rejected.type]: (state, action: any) => {
      state.loading = false
      state.token = null
      state.error = action.error.message
    },
  },
})
