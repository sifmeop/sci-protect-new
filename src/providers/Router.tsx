import { Layout } from 'components/layout/Layout'
import { Cabinet } from 'components/pages/cabinet/Cabinet'
import { HomePage } from 'components/pages/home/HomePage'
import { NotFoundPage } from 'components/pages/not-found/NotFoundPage'
import SignInPage from 'components/pages/sign-in/SignInPage'
import SignUpPage from 'components/pages/sign-up/SignUpPage'
import { UploadWorkWrapper } from 'components/pages/upload-work/UploadWork'
import { Work } from 'components/pages/work/Work'
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
        path: 'cabinet',
        element: <Cabinet />
      },
      {
        path: 'upload-work',
        element: <UploadWorkWrapper />
      },
      {
        path: 'work/:id',
        element: <Work />
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
