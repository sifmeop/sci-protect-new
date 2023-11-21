import { TextField } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  register: UseFormRegisterReturn
  label: string
  type?: 'text' | 'password'
}

export const AuthInput = ({ register, label, type = 'text' }: Props) => {
  return <TextField {...register} sx={{ mb: '10px', width: '100%' }} label={label} size='small' type={type} />
}
