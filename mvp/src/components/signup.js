import React from 'react';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      // Validate email and password formats
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address.');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }
      // Create a new user with email and password
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      window.location.href = '/login';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='signin-card'>
      <h2 className="signin-header">Sign Up</h2>
      <input className="signin-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="signin-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <button className="signin-btn" onClick={handleSignUp}>Sign Up</button>
      <p className="signup-field">Already have an account? <Link to="/login" className="signup-link">Sign In</Link></p>
    </div>
  );
}

export default SignUpForm;




