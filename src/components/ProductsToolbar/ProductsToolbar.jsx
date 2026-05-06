import Search from '../Search/Search'
import FilterDropdown from '../FilterDropdown/FilterDropdown'
import './_products-toolbar.scss'

const SORT_OPTIONS = [
  { label: 'Title A–Z',      sortBy: 'title',  order: 'asc'  },
  { label: 'Title Z–A',      sortBy: 'title',  order: 'desc' },
  { label: 'Price Low–High', sortBy: 'price',  order: 'asc'  },
  { label: 'Price High–Low', sortBy: 'price',  order: 'desc' },
  { label: 'Rating',         sortBy: 'rating', order: 'desc' },
]

const ProductsToolbar = ({ currentSortValue, onSortChange }) => (
  <div className="products-toolbar">
    <Search />
    <div className="toolbar-filters">
      <label className="toolbar-label">
        <span>Category</span>
        <FilterDropdown />
      </label>
      <label className="toolbar-label">
        <span>Sort by</span>
        <div className="dropdown">
          <select value={currentSortValue} onChange={onSortChange}>
            {SORT_OPTIONS.map((o) => (
              <option key={`${o.sortBy}_${o.order}`} value={`${o.sortBy}_${o.order}`}>
                {o.label}
              </option>
            ))}
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
        </div>
      </label>
    </div>
  </div>
)

export { SORT_OPTIONS }
export default ProductsToolbar

