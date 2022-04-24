import React, { useState, useEffect } from 'react';
import './_login.scss'
import Button from '../../UI/Button';


const Login = ({ onLogin }) => {

    const [enteredEmail, setEnteredEmail] = useState('')
    const [emailIsValid, setEmailIsValid] = useState()
    const [enteredPassword, setEnteredPassword] = useState('')
    const [passwordIsValid, setPasswordIsValid] = useState()
    const [formIsValid, setFormIsValid] = useState(false)
  
    useEffect(() => {
        setFormIsValid(
          enteredEmail.includes('@') && enteredPassword.trim().length > 7
        )  
    }, [enteredEmail, enteredPassword])
  
    const emailChangeHandler = (event) => {
      setEnteredEmail(event.target.value)
    }
  
    const passwordChangeHandler = (event) => {
      setEnteredPassword(event.target.value)
    }
  
    const validateEmailHandler = () => {
      setEmailIsValid(enteredEmail.includes('@'))
    }
  
    const validatePasswordHandler = () => {
      setPasswordIsValid(enteredPassword.trim().length > 7)
    }
  
    const submitHandler = (event) => {
      event.preventDefault()
      if(formIsValid){
          onLogin(enteredEmail, enteredPassword)
      }
    }



    return ( 
        <div className="container">
            <form className='login-form' onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
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
                        onBlur={validatePasswordHandler}
                        required
                    />
                    <p>Password must be at least 8 characters long</p>
                </div>
                <div>
                <Button type="submit">
                    Login
                </Button>
                </div>
            </form>
        </div>
     )
}
 
export default Login