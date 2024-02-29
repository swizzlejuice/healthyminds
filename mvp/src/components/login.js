import React from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    let navigate = useNavigate();
  return (
    <div className="login-body">
        <div class="flex-container-signin">
            <div class="signin-card">
            <p class="loginheading">Sign in</p>
            <p class="email">Email</p>
            <button class="login-btn">Enter Email</button>
            <p class="password">Password</p>
            <button class="login-btn">Enter Password</button>
            <button class="signin-btn" onClick={() => navigate('/home')}>Sign in</button>
            </div>
        </div>  
    </div>
  );
}

export default LoginPage;