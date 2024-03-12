import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Redirect the user to the home page if sign-in is successful
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='signin-card'>
      <h2 className="signin-header">Sign In</h2>
      <input className="signin-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="signin-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="error">Invalid email or password</p>}
      <button className="signin-btn" onClick={handleSignIn}>Sign in</button>
      <p className="signup-field">Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
    </div>
  );
}

export default SignInForm;







