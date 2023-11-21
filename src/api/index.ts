import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from 'utils/constants'

export interface SignUpBody {
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface SignInBody {
  email: string
  password: string
}

export interface AddWork {
  file: object
  title: string
  txId: string
  description: string
  tags: string[]
  price: number
  licence: string
}

export const apiSci = createApi({
  reducerPath: 'apiSci',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'same-origin'
  }),
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body: SignUpBody) => ({
        url: '/auth/register',
        method: 'POST',
        body
      })
    }),
    signIn: build.mutation({
      query: (body: SignInBody) => ({
        url: '/auth/login',
        method: 'POST',
        body
      })
    }),
    addWork: build.mutation({
      query: (body: AddWork) => ({
        url: '/documents',
        method: 'POST',
        body
      })
    })
  })
})

export const { useSignInMutation, useSignUpMutation } = apiSci
