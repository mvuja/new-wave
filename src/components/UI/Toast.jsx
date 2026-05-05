import './_toast.scss'
import close from '../../Assets/close.svg'

const Toast = ({ toastIsOpen, closeToastHandler, toastCounter, userEmail }) => {

    // Show just the part before "@" if we have an email, otherwise generic greeting
    const displayName = userEmail ? userEmail.split('@')[0] : null

    return ( 
        <div id="toast" className={toastIsOpen ? 'active' : undefined}>
            <div className="border-wrap">
                <p className='bold'>Purchase successful!</p>
                <p className='normal'>
                    {displayName ? `Thank you ${displayName}, your ` : 'Your '}
                    {toastCounter === 1 ? '1 item has' : `${toastCounter} items have`} been successfully bought.
                </p>
                <button className='close-toast' onClick={closeToastHandler}>
                    <img src={close} alt="" />
                </button>
            </div>
        </div>
     )
}
 
export default Toast