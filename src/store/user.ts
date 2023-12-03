/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  email: string
  firstName: string
  lastName: string
}

export interface InitialStateUser {
  user: IUser | null
}

const initialState: InitialStateUser = {
  user: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = user.actions

export const { reducer: userReducer, actions: userActions } = user
