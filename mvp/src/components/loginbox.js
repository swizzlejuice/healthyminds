import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../index'; 
import { NavLink, useNavigate } from 'react-router-dom';
import { TypeWriter } from './Typewriter.js';
import { getDatabase, ref, get, update } from 'firebase/database'; 

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            checkAndUpdateProgress(userId);
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setError('Email or password is incorrect.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('Email or password is incorrect.');
            }
        });        
    }

    const checkAndUpdateProgress = (userId) => {
        const today = new Date().toLocaleDateString();
        const userPetDataRef = ref(getDatabase(), `users/${userId}/petData`);

        get(userPetDataRef).then((snapshot) => {
            if (snapshot.exists()) {
                const petData = snapshot.val();
                const lastUpdateDate = new Date(petData.lastProgressUpdate).toLocaleDateString();

                if (lastUpdateDate !== today) {
                    update(ref(getDatabase(), `users/${userId}/petData`), {
                        progress: 25,
                        lastProgressUpdate: today
                    }).then(() => {
                        console.log("Progress reset to 25 for a new day.");
                        navigate("/home");
                    }).catch((error) => {
                        console.error("Failed to reset progress:", error);
                        navigate("/home"); 
                    });
                } else {
                    navigate("/home");
                }
            } else {
                navigate("/home");
            }
        }).catch((error) => {
            console.error("Failed to fetch pet data:", error);
            navigate("/home"); 
        });
    }

    return (
      <div className='signin-card'>
        <h2 className="signin-header">Sign in to</h2>
        <TypeWriter></TypeWriter>
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
        <button className="signin-btn" onClick={onLogin}>Sign in</button>
        <p className="signup-field">Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
      </div>
    );
}

export default Login;



/*import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../index';
import { NavLink, useNavigate } from 'react-router-dom'
import { TypeWriter } from './Typewriter.js';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
 
    return (
      <div className='signin-card'>
        <h2 className="signin-header">Sign in to</h2>
        <TypeWriter></TypeWriter>
        <input className="signin-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="signin-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="signin-btn" onClick={onLogin}>Sign in</button>
        <p className="signup-field">Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
      </div>
    );

}
export default Login;
*/
