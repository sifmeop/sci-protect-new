import { CircularProgress, TextField } from '@mui/material'
import { useSearchQuery } from 'api/index'
import { useDebounce } from 'hooks/useDebounce'
import { useState } from 'react'
import { SearchItem } from './SearchItem'

export const HomePage = () => {
  const [value, setValue] = useState('')

  const debounceValue = useDebounce(value)

  const { data, isLoading, isError, isSuccess } = useSearchQuery(debounceValue, {
    skip: debounceValue.length < 3
  })

  return (
    <div className='mt-10 max-w-md mx-auto'>
      <p className='text text-xl mb-2 font-bold'>Пошук:</p>
      <TextField sx={{ width: '100%', mb: '20px' }} value={value} onChange={(e) => setValue(e.target.value)} />
      {isLoading && (
        <div className='mt-2 text-center'>
          <CircularProgress size={50} />
        </div>
      )}
      {isError && <p className='mt-2 text-center'>Щось пішло не так</p>}
      {!isLoading && isSuccess && data && data.length > 0 && (
        <div className='flex flex-col gap-4'>
          {data.map((work, index) => (
            <SearchItem {...work} index={index + 1} />
          ))}
        </div>
      )}
      {!isLoading && isSuccess && data && data.length === 0 && <div>Роботи не знайдено</div>}
    </div>
  )
}
