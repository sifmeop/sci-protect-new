import { SignUpBody, useSignUpMutation } from 'api'

export const useSignUp = () => {
  const [mutate] = useSignUpMutation()

  const handleSignUp = async (data: SignUpBody) => {
    try {
      const response = await mutate(data)
      console.debug(response, 'response')
    } catch (error) {
      console.log('Error sign up', error)
    }
  }

  return { handleSignUp }
}
