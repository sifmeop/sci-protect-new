import { yupResolver } from '@hookform/resolvers/yup'
import { useSignIn } from 'hooks/useSignIn'
import { useForm } from 'react-hook-form'
import { AuthButton } from 'ui/AuthForm/AuthButton'
import { AuthForm } from 'ui/AuthForm/AuthForm'
import { AuthInput } from 'ui/AuthForm/AuthInput'
import { ErrorMessage } from 'ui/AuthForm/ErrorMessage'
import * as yup from 'yup'

interface SignInForm {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8).max(24).required('Password is required')
})

export default function SignInPage() {
  const { handleSignIn } = useSignIn()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInForm>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: SignInForm) => {
    handleSignIn(data)
  }

  return (
    <AuthForm title='Sign In'>
      <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
        <AuthInput register={register('email')} label='Email' />
        <ErrorMessage errors={errors.email} name='email' />
        <AuthInput register={register('password')} label='Password' type='password' />
        <ErrorMessage errors={errors.password} name='password' />
        <AuthButton label='Login' />
      </form>
    </AuthForm>
  )
}
