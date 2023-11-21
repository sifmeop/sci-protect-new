import { SignInBody, useSignInMutation } from 'api'

export const useSignIn = () => {
  const [mutate] = useSignInMutation()

  const handleSignIn = async (data: SignInBody) => {
    try {
      const response = await mutate(data)
      console.debug(response, 'response')
    } catch (error) {
      console.log('Error sign up', error)
    }
  }

  return { handleSignIn }
}
