import { Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { Link } from 'react-router-dom'
import { userActions } from 'store/user'

export const Cabinet = () => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(userActions.logout())
  }

  if (!user) {
    return <p className='text-center'>Потрібно увійти</p>
  }

  return (
    <div className='max-w-xl w-full mx-auto px-4'>
      <h1 className='font-medium mb-6 text-center text-2xl'>Кабінет</h1>
      <div className='flex flex-col gap-2'>
        <div>
          Ім'я: {user.firstname} {user.lastname}
        </div>
        <div>Електронна пошта: {user.email}</div>
        <Link
          to='/upload-work'
          className='text-white hover:bg-blue-500 transition-colors w-full block p-2 text-center rounded-lg bg-blue-400'>
          Завантажити роботу
        </Link>
        <Button onClick={logout} variant='contained'>
          Вийти
        </Button>
      </div>
    </div>
  )
}
