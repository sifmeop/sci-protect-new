import { useAppSelector } from 'hooks/redux'
import { FcDataProtection } from 'react-icons/fc'
import { Link } from 'react-router-dom'

export const Header = () => {
  const user = useAppSelector((state) => state.user)

  return (
    <header className='layout flex items-center justify-between font-bold'>
      <Link to='/' className='flex items-center gap-2'>
        <FcDataProtection size='50px' />
        SCI Protect
      </Link>
      {user ? (
        <Link to='/cabinet' className='hover:underline'>
          Кабінет
        </Link>
      ) : (
        <Link to='/auth/sign-in' className='hover:underline'>
          Увійти
        </Link>
      )}
    </header>
  )
}
