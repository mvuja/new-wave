import React from 'react'
import './_filter-dropdown.scss';

const FilterDropdown = ({products, filterProductsHandler}) => {

    const categoriesHolder = []

    products?.map(el => categoriesHolder.push(el.category))

    const categories = [...new Set(categoriesHolder)]

    return (
        <div className="dropdown">
            <select onChange={filterProductsHandler}>
                <option value="all">All categories</option>
                {
                    categories?.map(el => (
                        <option key={el} value={el}>{el}</option>
                        ))
                    }
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
        </div>
    )
}
 
export default FilterDropdown