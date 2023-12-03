import { FormHelperText } from '@mui/material'
import { FieldValues, UseControllerProps } from 'react-hook-form'

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  errors: any
}

export const ErrorMessage = <T extends FieldValues>({ errors }: Props<T>) => {
  return (
    <>{errors?.message && <FormHelperText sx={{ mb: '10px', color: '#D80032' }}>{errors.message}</FormHelperText>}</>
  )
}
