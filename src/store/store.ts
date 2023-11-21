import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiSci } from 'api'
import { userReducer } from './user'

const rootReducer = combineReducers({
  user: userReducer,
  [apiSci.reducerPath]: apiSci.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSci.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
