import React from 'react'

export function useLocalStorageValue(key, initValue = '') {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(key)) || initValue,
  )

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  // props, state

  return [value, setValue]
}
