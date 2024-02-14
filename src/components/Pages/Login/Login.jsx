import { useState, useEffect } from 'react'
import './_login.scss'

import bgImg from '../../../Assets/login-bg.png'


const Login = ({ onLogin, enteredName, setNameHandler }) => {

    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [formIsValid, setFormIsValid] = useState(false)
  
    useEffect(() => {
        setFormIsValid(
          enteredEmail.includes('@') && enteredPassword.trim().length > 7
        )  
    }, [enteredEmail, enteredPassword])

    const nameChangeHandler = (event) => {
      setNameHandler(event.target.value)
    }

    const emailChangeHandler = (event) => {
      setEnteredEmail(event.target.value)
    }
  
    const passwordChangeHandler = (event) => {
      setEnteredPassword(event.target.value)
    }

    const submitHandler = (event) => {
      event.preventDefault()
      if(formIsValid){
          onLogin(enteredEmail, enteredPassword)
      }
    }



    return (
        <div id="login">
            <img className='login-bg' src={bgImg} alt="background" />
            <div className="container">
                <form className='login-form' onSubmit={submitHandler}>
                    <h3>Sign up to New Wave</h3>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={enteredName}
                            onChange={nameChangeHandler}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-Mail</label>
                        <input
                            type="email"
                            id="email"
                            value={enteredEmail}
                            onChange={emailChangeHandler}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                            required
                        />
                        <p>Password must be at least 8 characters long</p>
                    </div>
                    <div>
                    <button type="submit">
                        <span>
                            Login
                        </span>
                    </button>
                    </div>
                </form>
            </div>
        </div>

     )
}
 
export default Login