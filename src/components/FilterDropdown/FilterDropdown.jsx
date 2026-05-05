import React from 'react'
import { useEffect } from 'react'
import useProductStore from '../../store/useProductStore'
import './_filter-dropdown.scss'

const FilterDropdown = () => {
  const categories      = useProductStore((s) => s.categories)
  const selectedCategory = useProductStore((s) => s.selectedCategory)
  const setCategory     = useProductStore((s) => s.setCategory)
  const fetchCategories = useProductStore((s) => s.fetchCategories)

  useEffect(() => {
    if (categories.length === 0) fetchCategories()
  }, [categories.length, fetchCategories])

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  return (
    <div className="dropdown">
      <select value={selectedCategory} onChange={handleChange} aria-label="Filter by category">
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </div>
  )
}

export default FilterDropdown