import { FormHelperText } from '@mui/material'
import { FieldError, FieldValues, Merge, UseControllerProps } from 'react-hook-form'

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  errors: FieldError | undefined | Merge<FieldError, (FieldError | undefined)[]>
}

export const ErrorMessage = <T extends FieldValues>({ errors }: Props<T>) => {
  return (
    <>{errors?.message && <FormHelperText sx={{ mb: '10px', color: '#D80032' }}>{errors.message}</FormHelperText>}</>
  )
}
