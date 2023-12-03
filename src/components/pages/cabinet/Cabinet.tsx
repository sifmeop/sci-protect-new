import { useAppSelector } from 'hooks/redux'
import { Navigate } from 'react-router-dom'

export const Cabinet = () => {
  const { user } = useAppSelector((state) => state.user)

  if (!user) {
    return <Navigate to='/auth/sign-in' />
  }

  return (
    <div className='max-w-xl w-full mx-auto px-4'>
      <h1 className='font-medium mb-6 text-center text-2xl'>Кабінет</h1>
      <div className='flex flex-col gap-2'>
        <div>
          Ім'я: {user.firstName} {user.lastName}
        </div>
        <div>Електронна пошта: {user.email}</div>
      </div>
    </div>
  )
}
