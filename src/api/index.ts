import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from 'store/user'
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

export interface IWork {
  description: string
  hash: string
  id: number
  license_type: string
  price: string
  tags: string[]
  title: string
  user_info: { firstName: string; lastName: string; userId: number }
}

export interface SignInResponse {
  token: string
  user: IUser
}

export const apiSci = createApi({
  reducerPath: 'apiSci',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: (build) => ({
    signUp: build.mutation<SignInResponse, SignUpBody>({
      query: (body: SignUpBody) => ({
        url: '/auth/register',
        method: 'POST',
        body
      })
    }),
    signIn: build.mutation<SignInResponse, SignInBody>({
      query: (body) => ({
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
    search: build.query<IWork[], string>({
      query: (text) => ({
        url: '/documents/search',
        params: { text }
      })
    }),
    getDocument: build.query<any, string>({
      query: (id) => ({
        url: `/documents/${id}`
      })
    })
  })
})

export const { useSignInMutation, useGetDocumentQuery, useSignUpMutation, useSearchQuery, useAddWorkMutation } = apiSci
