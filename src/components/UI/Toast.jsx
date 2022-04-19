import React, { useState } from 'react';
import './_toast.scss'

const Toast = ({ toastIsOpen, closeToastHandler }) => {
    return ( 
        <div id="toast" className={toastIsOpen ? 'active' : undefined}>
            <p className='bold'>Products succesfully bought!</p>
            <p className='normal'>Your x items have been succesfully bought</p>
            <button className='close-toast' onClick={closeToastHandler}>X</button>
        </div>
     );
}
 
export default Toast;