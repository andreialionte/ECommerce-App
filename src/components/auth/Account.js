import React, { useState } from 'react';
import Login from './Login'; // Import the Login component
import Register from './Register'; // Import the Register component
import './Account.css'; // Import the CSS file


function Account() {
  const [action, setAction] = useState('login'); // Set the default action to 'login'
  
  return (
    <div className="container">

      {action == "login" ? <h1>Login Form</h1> : <h1>Register Form</h1>} 
      <div className="acc">
        <button
          onClick={() => setAction('login')}
          className={action === 'login' ? 'selected' : ''}
        >
          Login
        </button>
        <button
          onClick={() => setAction('register')}
          className={action === 'register' ? 'selected' : ''}
        >
          Register
        </button>
      </div>
      <div className="acc2">
        {action === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Account;
