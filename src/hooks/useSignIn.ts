import { SignInBody, useSignInMutation } from 'api'
import { useNavigate } from 'react-router-dom'
import { userActions } from 'store/user'
import { useAppDispatch } from './redux'

export const useSignIn = () => {
  const [mutate] = useSignInMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignIn = async (data: SignInBody) => {
    try {
      const response = await mutate(data)
      if ('data' in response) {
        localStorage.setItem('token', response.data.token)
        dispatch(userActions.setUser(response.data.user))
        navigate('/')
      }
    } catch (error) {
      console.log('Error sign up', error)
    }
  }

  return { handleSignIn }
}
