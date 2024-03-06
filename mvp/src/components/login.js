import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import ItemBox from './itemBox';

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
            <p class="signup-link"> Dont have an account? <NavLink to="/signup" style={{ color: '#f6f3eb', fontWeight: 'bold', fontStyle: 'italic'}}> Sign up </NavLink> </p>
            </div>
        </div>  
    </div>
  );
}

export default LoginPage;
