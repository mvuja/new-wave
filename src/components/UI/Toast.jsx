import './_toast.scss'
import close from '../../Assets/close.svg'

const Toast = ({ toastIsOpen, closeToastHandler, toastCounter, enteredName }) => {
    return ( 
        <div id="toast" className={toastIsOpen ? 'active' : undefined}>
            <div class="border-wrap">
                <p className='bold'>Purchase successful!</p>
                {
                    toastCounter === 1 ?
                        <p className='normal'>Thank you {enteredName}, your {toastCounter} item has been successfully bought.</p>
                    :
                        <p className='normal'>Thank you {enteredName}, your {toastCounter} items have been successfully bought.</p>
                }
                <button className='close-toast' onClick={closeToastHandler}>
                    <img src={close} alt="" />
                </button>
            </div>
        </div>
     );
}
 
export default Toast