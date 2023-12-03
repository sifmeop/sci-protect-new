import { CircularProgress } from '@mui/material'
import { useSearchQuery } from 'api/index'
import { useDebounce } from 'hooks/useDebounce'
import { useState } from 'react'

export const HomePage = () => {
  const [value, setValue] = useState('')

  const debounceValue = useDebounce(value)

  const { data, isLoading, isError, isSuccess } = useSearchQuery(debounceValue, {
    skip: debounceValue.length < 3
  })

  return (
    <div className='mt-10 max-w-md mx-auto'>
      <p className='text text-xl mb-2 font-bold'>Пошук:</p>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='w-full px-4 py-2 rounded-lg border-black border'
      />
      {isLoading && (
        <div className='mt-2 text-center'>
          <CircularProgress size={50} />
        </div>
      )}
      {isError && <p className='mt-2 text-center'>Щось пішло не так</p>}
      {!isLoading && isSuccess && data && data.length > 0 && data.map((work, index) => <div>{index + 1}</div>)}
      {!isLoading && isSuccess && data && data.length === 0 && <div>Роботи не знайдено</div>}
    </div>
  )
}
