import { Link } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { TitleType } from './AuthForm'

interface Props {
  title: TitleType
}

export const FormLink = ({ title }: Props) => {
  if (title === 'Sign In') {
    return (
      <p>
        Don&apos;t have an account yet?{' '}
        <Link to={ROUTES.SIGN_UP} className='font-medium text-[#0081cb] hover:underline'>
          Sign Up
        </Link>
      </p>
    )
  }

  return (
    <p>
      Already have an account?{' '}
      <Link to={ROUTES.SIGN_IN} className='font-medium text-[#0081cb] hover:underline'>
        Sign In
      </Link>
    </p>
  )
}
