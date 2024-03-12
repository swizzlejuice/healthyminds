import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import LogPage from './loginbox.js'; 

function LoginPage() {
    let navigate = useNavigate();
  return (
    <div>
      <div className="login-body">
      </div>
      <LogPage />
    </div>
  );
}

export default LoginPage;
