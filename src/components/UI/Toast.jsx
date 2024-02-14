import './_toast.scss'
import close from '../../Assets/close.svg'
import { useEffect, useState } from 'react';

const Toast = ({ toastIsOpen, closeToastHandler, toastCounter, enteredName }) => {

    const [localName, setLocalName] = useState()

    useEffect(() => {
        const temp = localStorage.getItem('name')
        setLocalName(temp)
    }, [enteredName])

    return ( 
        <div id="toast" className={toastIsOpen ? 'active' : undefined}>
            <div className="border-wrap">
                <p className='bold'>Purchase successful!</p>
                {
                    toastCounter === 1 ?
                        <p className='normal'>Thank you {localName}, your {toastCounter} item has been successfully bought.</p>
                    :
                        <p className='normal'>Thank you {localName}, your {toastCounter} items have been successfully bought.</p>
                }
                <button className='close-toast' onClick={closeToastHandler}>
                    <img src={close} alt="" />
                </button>
            </div>
        </div>
     );
}
 
export default Toast