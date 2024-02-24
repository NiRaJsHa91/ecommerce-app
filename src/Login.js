import React, { useState } from 'react'
import './login.css'
import amazonLogoLogin from './images/amazon-logo-login.svg'
import { Link , useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth';
import {motion} from 'framer-motion'
import { useDataLayerValue } from './DataLayer';

const Login = () => {

  const navigate = useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [{ popup }, dispatch] = useDataLayerValue();
  // const [error,setError]=useState()

  const signIn = () => {

    signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        navigate('/')
        dispatch({
          type: "SET_POPUP",
          popup: 'SignIn Succesfull !'
        });
    })
    .catch(error=> {
        setError(error.message)
    })
  }

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        // const user = userCredential.user;
        // console.log(userCredential.user);
         dispatch({
           type: "SET_POPUP",
           popup: "Account Created Succesfully!",
         });
           navigate('/')
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
                setError(error.message);

        // ..
      });
  }

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <Link to='/' className='amazon_logo'> */}
      <img src={amazonLogoLogin} alt="" />
      {/* </Link> */}
      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
      <div className="login_form">
        <p className="sign_in_text">Sign in</p>
        {/* <form action=""> */}
        <label htmlFor="email">Email or mobile phone number</label>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn} className="continue_button">
          Continue
        </button>
        <p className="terms_and_condition">
          By continuing, you agree to Amazon's <span>Conditions of Use </span>
          and <span>Privacy Notice.</span>
        </p>
        <button onClick={register} className="signup_button">
          Create your Amazon Account
        </button>
        {/* </form> */}
      </div>
    </motion.div>
  );
}

export default Login
