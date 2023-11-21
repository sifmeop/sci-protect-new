import { Button } from '@mui/material'

interface Props {
  label: 'Register' | 'Login'
}

export const AuthButton = ({ label }: Props) => {
  return (
    <Button type='submit' sx={{ width: '100%' }} variant='outlined'>
      {label}
    </Button>
  )
}
