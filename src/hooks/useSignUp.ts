import { SignUpBody, useSignUpMutation } from 'api'
import { useSignIn } from './useSignIn'

export const useSignUp = () => {
  const [mutate] = useSignUpMutation()
  const { handleSignIn } = useSignIn()

  const handleSignUp = async (data: SignUpBody) => {
    try {
      await mutate(data).then(() => {
        handleSignIn({ email: data.email, password: data.password })
      })
    } catch (error) {
      console.log('Error sign up', error)
    }
  }

  return { handleSignUp }
}
