import { SignInBody, useSignInMutation } from 'api'
import { useNavigate } from 'react-router-dom'
import { IUser, userActions } from 'store/user'
import { useAppDispatch } from './redux'

export const useSignIn = () => {
  const [mutate] = useSignInMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignIn = async (data: SignInBody) => {
    try {
      const response = await mutate(data)
      console.debug(response, 'response')
      const userData = { ...response, email: data.email }
      delete userData.token as any
      dispatch(userActions.setUser(userData as IUser))
      navigate('/')
    } catch (error) {
      console.log('Error sign up', error)
    }
  }

  return { handleSignIn }
}
