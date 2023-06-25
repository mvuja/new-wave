import React from 'react'
import './_not-found.scss'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import bgImg from '../../../Assets/single-product-bg.png'

const NotFound = () => {
    return ( 
        <div id="not-found">
            <img className='single-product-bg' src={bgImg} alt="graphic" />
            <div className="content container">
                <p className='fourofour'>404</p>
                <h1>Whoops! This is not what you were looking for.</h1>
                <p className='txt'>Try your luck by going back to the <Link to='/'>home page.</Link></p>
            </div>
        </div>
    )
}
 
export default NotFound