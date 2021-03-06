import './_toast.scss'

const Toast = ({ toastIsOpen, closeToastHandler, toastCounter, enteredName }) => {
    return ( 
        <div id="toast" className={toastIsOpen ? 'active' : undefined}>
            <p className='bold'>Purchase successful!</p>
            {
                toastCounter === 1 ?
                    <p className='normal'>Thank you {enteredName}, your {toastCounter} item has been successfully bought.</p>
                :
                    <p className='normal'>Thank you {enteredName}, your {toastCounter} items have been successfully bought.</p>
            }
            <button className='close-toast' onClick={closeToastHandler}>X</button>
        </div>
     );
}
 
export default Toast