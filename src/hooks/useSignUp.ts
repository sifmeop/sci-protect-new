import { SignUpBody, useSignUpMutation } from 'api'
import { toast } from 'react-toastify'
import { useSignIn } from './useSignIn'

export const useSignUp = () => {
  const [mutate] = useSignUpMutation()
  const { handleSignIn } = useSignIn()

  const handleSignUp = async (data: SignUpBody) => {
    try {
      await mutate(data)
        .unwrap()
        .then(() => {
          handleSignIn({ email: data.email, password: data.password })
        })
    } catch (error: any) {
      console.log('Error sign up', error)

      if (typeof error?.data?.message === 'string') {
        toast.error(error.data.message)
        return
      }

      toast.error('Помилка реєстрації')
    }
  }

  return { handleSignUp }
}
