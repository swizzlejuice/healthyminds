import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../index';
import { NavLink, useNavigate } from 'react-router-dom'
 
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
        <h2 className="signin-header">Sign In</h2>
        <input className="signin-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="signin-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="signin-btn" onClick={onLogin}>Sign in</button>
        <p className="signup-field">Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
      </div>
    );

}
export default Login;
