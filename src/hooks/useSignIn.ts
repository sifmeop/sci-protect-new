import { SignInBody, useSignInMutation } from 'api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userActions } from 'store/user'
import { useAppDispatch } from './redux'

export const useSignIn = () => {
  const [mutate] = useSignInMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignIn = async (data: SignInBody) => {
    try {
      const response = await mutate(data).unwrap()
      localStorage.setItem('token', response.token)
      dispatch(userActions.setUser(response.user))
      navigate('/')
    } catch (error: any) {
      console.log('Error sign up', error)

      if (typeof error?.data?.message === 'string') {
        toast.error(error.data.message)
        return
      }

      toast.error('Помилка авторизації')
    }
  }

  return { handleSignIn }
}
