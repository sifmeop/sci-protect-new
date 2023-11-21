import { yupResolver } from '@hookform/resolvers/yup'
import { useSignUp } from 'hooks/useSignUp'
import { useForm } from 'react-hook-form'
import { AuthButton } from 'ui/AuthForm/AuthButton'
import { AuthForm } from 'ui/AuthForm/AuthForm'
import { AuthInput } from 'ui/AuthForm/AuthInput'
import { ErrorMessage } from 'ui/AuthForm/ErrorMessage'
import * as yup from 'yup'

interface SignUpForm {
  email: string
  firstName: string
  lastName: string
  password: string
  confirm_password: string
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().min(1).max(10).required('firstName is required'),
  lastName: yup.string().min(1).max(10).required('lastName is required'),
  password: yup.string().min(8).max(24).required('Password is required'),
  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

export default function SignUpPage() {
  const { handleSignUp } = useSignUp()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: SignUpForm) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete data.confirm_password

    handleSignUp(data)
  }

  return (
    <AuthForm title='Sign Up'>
      <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
        <AuthInput register={register('email')} label='Email' />
        <ErrorMessage errors={errors.email} name='email' />
        <AuthInput register={register('firstName')} label='First name' />
        <ErrorMessage errors={errors.firstName} name='username' />
        <AuthInput register={register('lastName')} label='Last name' />
        <ErrorMessage errors={errors.lastName} name='username' />
        <AuthInput register={register('password')} label='Password' type='password' />
        <ErrorMessage errors={errors.password} name='password' />
        <AuthInput register={register('confirm_password')} label='Confirm password' type='password' />
        <ErrorMessage errors={errors.confirm_password} name='confirm_password' />
        <AuthButton label='Register' />
      </form>
    </AuthForm>
  )
}
