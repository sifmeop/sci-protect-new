import { SignUpBody, useSignUpMutation } from 'api'
import { useNavigate } from 'react-router-dom'
import { IUser, userActions } from 'store/user'
import { useAppDispatch } from './redux'

export const useSignUp = () => {
  const [mutate] = useSignUpMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignUp = async (data: SignUpBody) => {
    try {
      const response = await mutate(data)
      console.debug(response, 'response')
      const userData = { ...data } as Partial<SignUpBody>
      delete userData.password
      dispatch(userActions.setUser(userData as IUser))
      navigate('/')
    } catch (error) {
      console.log('Error sign up', error)
    }
  }

  return { handleSignUp }
}
