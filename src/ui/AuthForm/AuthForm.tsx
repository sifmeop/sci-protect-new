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
        <h1 className={styles.title}>{title}</h1>
        {children}
        <FormLink title={title} />
      </div>
    </div>
  )
}
