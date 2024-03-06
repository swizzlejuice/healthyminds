import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import {getDatabase, ref, set as firebaseSet, onValue} from 'firebase/database';

/*function Validation(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const db = getDatabase() 




}*/

function SignUpPage() {
    let navigate = useNavigate();
  return (
    <div className="login-body">
        <div class="flex-container-signin">
            <div class="signin-card">
            <p class="loginheading">Create an Account</p>
            <p class="email">Email</p>
            <button class="login-btn">Enter Email</button>
            <p class="password">Password</p>
            <button class="login-btn">Enter Password</button>
            <button class="signup-btn" onClick={() => navigate('/login')}>Create Account</button>
            </div>
        </div>  
    </div>
  );
}



export default SignUpPage;