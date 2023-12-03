import { SignUpBody, useSignUpMutation } from 'api'
import { useNavigate } from 'react-router-dom'
import { userActions } from 'store/user'
import { useAppDispatch } from './redux'

export const useSignUp = () => {
  const [mutate] = useSignUpMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignUp = async (data: SignUpBody) => {
    try {
      const response = await mutate(data)
      if ('data' in response) {
        localStorage.setItem('token', response.data.token)
        dispatch(userActions.setUser(response.data.user))
        navigate('/')
      }
      navigate('/')
    } catch (error) {
      console.log('Error sign up', error)
    }
  }

  return { handleSignUp }
}
