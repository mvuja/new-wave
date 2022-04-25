import { useState, useEffect } from 'react'
import './_footer.scss'

const Footer = props => {
    return ( 
        <footer>
            <div className="container">
                <div className="footer-links">
                    <a href="#">Terms of Use</a>
                    <a href="#">Privacy Policy</a>
                </div>
                <p className="copy">2022 Designed by m.vuja</p>
            </div>
        </footer>
     )
}
 
export default Footer