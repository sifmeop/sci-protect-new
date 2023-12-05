/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  email: string
  firstname: string
  lastname: string
}

export type UserState = IUser | null

const initialState = null as UserState

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<IUser>) => action.payload,
    logout: () => null
  }
})

export const { setUser } = user.actions

export const { reducer: userReducer, actions: userActions } = user
