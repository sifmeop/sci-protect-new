import { Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { userActions } from 'store/user'

export const Cabinet = () => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(userActions.logout())
  }

  return (
    <div className='max-w-xl w-full mx-auto px-4'>
      <h1 className='font-medium mb-6 text-center text-2xl'>Кабінет</h1>
      <div className='flex flex-col gap-2'>
        <div>
          Ім'я: {user.firstName} {user.lastName}
        </div>
        <div>Електронна пошта: {user.email}</div>
        <Button onClick={logout} variant='contained'>
          Вийти
        </Button>
      </div>
    </div>
  )
}
