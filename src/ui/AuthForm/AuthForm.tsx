import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import styles from './AuthForm.module.scss'
import { FormLink } from './FormLink'

const titles = {
  SIGN_IN: 'Sign In',
  SIGN_UP: 'Sign Up'
} as const

export type TitleType = (typeof titles)[keyof typeof titles]

interface Props {
  children: React.ReactNode
  title: TitleType
}

export const AuthForm = ({ children, title }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Link to='/' className='flex items-center gap-2 text-left hover:underline'>
          <IoMdArrowRoundBack />
          Go to home
        </Link>
        <h1 className={styles.title}>{title}</h1>
        {children}
        <FormLink title={title} />
      </div>
    </div>
  )
}
