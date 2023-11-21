/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface InitialStateUser {
  wallet: string | null
}

const initialState: InitialStateUser | null = null

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      // state.wallet = action.payload
    }
  }
})

export const { setUser } = user.actions

export const { reducer: userReducer, actions: userActions } = user
