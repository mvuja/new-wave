import { useCallback, useEffect, useRef, useState } from 'react'
import useProductStore from '../../store/useProductStore'
import './_search.scss'

const DEBOUNCE_MS = 350

const Search = () => {
  const setSearch = useProductStore((s) => s.setSearch)
  const [inputValue, setInputValue] = useState('')
  const timerRef = useRef(null)

  const handleChange = useCallback(
    (e) => {
      const value = e.target.value
      setInputValue(value)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setSearch(value)
      }, DEBOUNCE_MS)
    },
    [setSearch]
  )

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <input
      className="input-search"
      type="text"
      placeholder="Search products..."
      value={inputValue}
      onChange={handleChange}
      aria-label="Search products"
    />
  )
}

export default Search