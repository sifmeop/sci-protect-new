import { Layout } from 'components/layout/Layout'
import { HomePage } from 'components/pages/home/HomePage'
import { NotFoundPage } from 'components/pages/not-found/NotFoundPage'
import { SearchPage } from 'components/pages/search/SearchPage'
import SignInPage from 'components/pages/sign-in/SignInPage'
import SignUpPage from 'components/pages/sign-up/SignUpPage'
import { UploadWork } from 'components/pages/upload-work/UploadWork'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <HomePage />,
        index: true
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'upload-work',
        element: <UploadWork />
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-up',
        element: <SignUpPage />
      },
      {
        path: 'sign-in',
        element: <SignInPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

export const Router = () => {
  return <RouterProvider router={router} />
}
