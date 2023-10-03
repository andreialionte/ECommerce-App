import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../auth/firebase';
import {useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {createButton} from "react-social-login-buttons"
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [action, setAction] = useState("")
  const navigate = useNavigate();

  const notify = () => {
    toast.success('Login successfully!', {
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
    toast.error('Login failed!', {
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

  useEffect(() => {
    if(email.includes("@") === false || password.length < 6 || email.includes(".com") === false){
      setError(true);
    }else{
      setError(false);
    }
  }
   ,[email, password]);
  
  const handlerLoginAuth = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      notify();
      setTimeout(() => {
        navigate("/");
      }, [4000])
    } catch (error) {
      setError(error.message);
      notifyError(); // Display the error toast
      if(error.message === "Firebase: Error (auth/invalid-login-credentials)."){
        setError("Invalid login credentials")
      }
    }
  };

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const handeleFacebookProvider = async () => {
    try{
      const provider = new FacebookAuthProvider();
      const res = await signInWithPopup(auth, provider);
      console.log(res.user);
    }catch(error){
      setError(error.message);
    }
  }

  const handleGoogleLogin = async () => {
    try{
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      console.log(res.user);
      notify();
      setTimeout(() => {
        navigate("/");
      }, [4000])
      console.log(res.user);
    }catch(error){
      setError(error.message);
    }

  }
  return (
    <div className="login">
      <div className="social-buttons-login">
      <GoogleLoginButton onClick={handleGoogleLogin} />
      <FacebookLoginButton onClick={handeleFacebookProvider} />
      </div>
      <form onSubmit={handlerLoginAuth}>
        {/* <label htmlFor="email">Email</label> */}
        <input type="text" id="email" onChange={handlerEmail} placeholder="email" />
        {/* <label htmlFor="password">Password</label> */}
        <input type="password" id="password" value={password} onChange={handlerPassword} placeholder="password" />
        <button type="submit" className={!error ? "but" : "error"} disabled={error}>Login</button>
        <p>Forgot password</p>
      </form>
      <ToastContainer />
      {error && <p className="redd">{error}</p>}
    </div>
  );
}

export default Login;
