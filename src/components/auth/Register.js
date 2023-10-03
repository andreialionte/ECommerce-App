import React, { useState, useEffect } from 'react';
import { auth } from '../auth/firebase';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import "./Account.css"
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [name, setName] = useState('');
  const [error, setError] = useState(null);


  useEffect(() => {
   if(name==="" || email==="" || password==="" || passwordConfirm==="" || password !== passwordConfirm || password.length < 6 || passwordConfirm.length < 6 || email.includes("@") === false || email.includes(".com") === false){
     setError(true);
  }else{
    setError(false);
  }
}, 
[name, email, password, passwordConfirm] 
  )


  const navigate = useNavigate();

  const notify = () => {
    toast.success('Register successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const notifyError = () => {
    toast.error('Register failed!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleRegisterAuth = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password); // currentUser
      const user = res.user; //auth.currentUser
      console.log(res.user);
        await updateProfile(user, {
          displayName: name,
        });
        notify();
        notify.done(() => { // alternative way to setTimeout(() => {});
          navigate("/");
        })
      }catch(error){
        notifyError();
        if(error.code === "auth/email-already-in-use"){
          setError("Email already in use");
        }
    }
  }

  const handlerGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      console.log(res.user);
      notify();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="reg">
      <div className="social-buttons-register">
      <GoogleLoginButton onClick={handlerGoogleAuth}/>
      <FacebookLoginButton />
      </div>
      <form onSubmit={handleRegisterAuth}>
        {/* <label htmlFor="email">Email</label> */}
        <input type="text" id="email" value={email} onChange={handleEmail} placeholder='email' />
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder='name' />
        {/* <label htmlFor="password">Password</label> */}
        <input type="password" id="password" value={password} onChange={handlePassword} placeholder='password' />
        <input type="password" id="password" value={passwordConfirm} onChange={(e) =>{setPasswordConfirm(e.target.value)}} placeholder='confirm password' />
        <button type="submit" className={!error ? "but" : "error"} disabled={error}>Register</button>
      </form>
      {error && <p className="redd">{error}</p>}
    </div>
  )
}

export default Register;
