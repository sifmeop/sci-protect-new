import { useAppSelector } from 'hooks/redux'

interface Props {
  children: React.ReactNode
}

export const AuthWrapper = ({ children }: Props) => {
  const user = useAppSelector((state) => state.user)

  return children
}
