// ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../auth/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import {database} from '../auth/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const notifySuccess = () => {
    toast.success('Password reset email sent successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      notifySuccess();
    } catch (error) {
      setError(error.message);
      notifyError(error.message);
    }
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      {success ? (
        <p>
          An email with a password reset link has been sent to {email}. Please check your email to reset your password.
        </p>
      ) : (
        <>
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
          {error && <p className="redd">{error}</p>}
        </>
      )}
      <Link to="/login">Back to Login</Link>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
