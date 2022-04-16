import React, { useState } from 'react';
import './_button.scss'

const Button = ({onClick, children}) => {

    return (
        <button onClick={onClick} className='main-btn'>{children}</button>
    )
}
 
export default Button;