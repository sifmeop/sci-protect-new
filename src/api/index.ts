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
    mode: 'no-cors',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*')
      return headers
    }
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
      query: (body: any) => ({
        url: '/documents',
        method: 'POST',
        body
      })
    }),
    search: build.query({
      query: (text: string) => ({
        url: '/documents/search',
        params: { text }
      })
    })
  })
})

export const { useSignInMutation, useSignUpMutation, useSearchQuery, useAddWorkMutation } = apiSci
