import { useEffect, useState } from 'react'

export const useDebounce = (value: string, time = 250): string => {
  const [debounced, setDebounced] = useState<string>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), time)
    return () => clearTimeout(handler)
  }, [value, time])

  return debounced
}
