import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons'
import {auth} from "../auth/firebase";

function Login() {
    

    const handleGoogleAuth = async () => {
        try {
            const google = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, google);
        } catch (error) {
            }
        }
    



  return (
    <div>
        <GoogleLoginButton onClick={handleGoogleAuth} style={{width: "50%"}} />
    </div>
  )
}

export default Login