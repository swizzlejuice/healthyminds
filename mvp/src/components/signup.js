import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../index';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            console.log('User created:', user);
            navigate('/login');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.error('Error creating user:', errorCode, errorMessage);
        }
    };

    return (
        <div className='signin-card'>
            <h2 className="signin-header">Sign Up</h2>
            <input className="signin-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="signin-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="error-message">{error}</p>}
            <button className="signin-btn" onClick={onSubmit}>Sign Up</button>
            <p className="signup-field">Already have an account? <Link to="/login" className="signup-link">Sign In</Link></p>
        </div>
    );
}

export default Signup;