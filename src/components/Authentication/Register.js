import React, { useState } from 'react';
import { registerUser } from '../../firebase/firebaseUtils';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Enter a valid email';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerUser(username, email, password);
      setRegistrationSuccess(true);
      navigate('/weather');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'The email is already in use, please login to access.' });
      } else {
        console.error('Error registering user:', error);
      }
    }
  };

  if (registrationSuccess) {
    return (
      <div>
        <h2>Registration Successful!</h2>
        <p>Please login to continue.</p>
      </div>
    );
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="button-container">
          <button type="submit" className="btn-register">
            Register
          </button>
          <button onClick={() => navigate('/login')} className="btn-login">
            Go to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
