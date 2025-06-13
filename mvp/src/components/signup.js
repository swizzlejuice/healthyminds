import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../index';
import { TypeWriter } from './Typewriter.js';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const db = getDatabase();
            await set(ref(db, `users/${user.uid}`), {
                email: email,
                currentPet: 'dog1.png',
                petData: {
                    progress: 25,
                    lastProgressUpdate: new Date().toLocaleDateString()
                }
            }).then(() => {
                navigate('/login'); 
            });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already associated with an account. Try logging in instead.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    // return (
    //     <div className='signin-card'>
    //         <h2 className="signin-header">Welcome to</h2>
    //         <TypeWriter></TypeWriter>
    //         <input className="signin-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //         <input className="signin-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //         {error && <p className="error-message">{error}</p>}
    //         <button className="signin-btn" onClick={onSubmit}>Sign Up</button>
    //         <p className="signup-field">Already have an account? <Link to="/login" className="signup-link">Sign In</Link></p>
    //     </div>
    // );

    return (
        <div className='signin-card'>
          <h2 className="signin-header">Welcome to</h2>
          <TypeWriter />
          <input className="signin-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    
          <div className="password-wrapper">
            <input
              className="signin-field"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '🫣' : '👁️'}
            </button>
          </div>
    
          {error && <p className="error-message">{error}</p>}
          <button className="signin-btn" onClick={onSubmit}>Sign Up</button>
          <p className="signup-field">Already have an account? <Link to="/login" className="signup-link">Sign In</Link></p>
        </div>
      );
}

export default Signup;