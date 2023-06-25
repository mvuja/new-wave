import React from 'react'
import './_search.scss';

const Search = ({ inputSearch, setInputSearch }) => {

    return ( 
        <input
            className='input-search'
            type="text"
            id="search-form"
            placeholder="Search for..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
        />
    )
}
 
export default Search