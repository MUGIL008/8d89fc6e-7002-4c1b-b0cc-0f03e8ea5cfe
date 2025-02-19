import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import logo from '../img/logo.png';
import './login.css';
const Login = () => {

    // New code which delete credentials in localStorage
      // localStorage.removeItem('credentials');
      
      
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [userRole, setUserRole] = useState(null);
      const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate();
    
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const handleShowPasswordChange = (event) => {
        setShowPassword(event.target.checked);
      };
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        const response = await axios.post('http://localhost:8080/auth/user/login', {
          email,
          password,
        });
        console.log("isUser",response.data);
    
        const response2 = await axios.post('http://localhost:8080/auth/admin/login', {
          email,
          password,
        });
        console.log("isAdmin",response2.data);
    
        if (response.data === true && response2.data===false) {
          const url = `http://localhost:8080/admin/id?email=${email}`;
          const idResponse = await axios.get(url);
          const uId = idResponse.data;
    
          const userResponse = await axios.get(`http://localhost:8080/admin/getUser/${uId}`);
          const loggedUserData = userResponse.data;
          console.log(loggedUserData);
          loggedUserData.userRole = 'user';
          // Store loggedUserData in localStorage
          localStorage.setItem('credentials', JSON.stringify(loggedUserData));
    
          const storedCredentials = localStorage.getItem('credentials');
          const loggedUserdata = JSON.parse(storedCredentials);
          setUserRole(loggedUserdata.userRole);
    
          if (userRole === 'user') {
            navigate('/Popularplans');
          }
          //  else if (userRole === 'admin') {
          //   navigate('/admin');
          // }
           else {
            navigate('/');
          }
        }
        else if(response.data === true && response2.data===true){
          const url = `http://localhost:8080/admin/id?email=${email}`;
          const idResponse = await axios.get(url);
          const uId = idResponse.data;
    
          const userResponse = await axios.get(`http://localhost:8080/admin/getUser/${uId}`);
          const loggedUserData = userResponse.data;
          console.log(loggedUserData);
          loggedUserData.userRole = 'admin';
          // Store loggedUserData in localStorage
          localStorage.setItem('credentials', JSON.stringify(loggedUserData));
    
          const storedCredentials = localStorage.getItem('credentials');
          const loggedUserdata = JSON.parse(storedCredentials);
          setUserRole(loggedUserdata.userRole);
    
          if (userRole === 'admin') {
            navigate('/admin/PrepaidPlans');
          }
          //  else if (userRole === 'admin') {
          //   navigate('/admin');
          // }
           else {
            navigate('/');
          }
    
        }
        
        
        
        
        else {
          // Handle login error
          alert('Login failed. Please check your credentials and try again.');
        }
      } catch (error) {
        console.error('Login Error:', error);
        // Display error message to the user
        alert('An error occurred during login. Please try again.');
      }
    };
    
  return (
    <div className="login_container">
      <nav className="loginheader">
        <div className="logocontainer">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1 className='heading'>Login</h1>
      </nav>
  
      <div className='loginbody'>
      <form className='loginform' onSubmit={handleSubmit}>
    <div>
      <label htmlFor="email">Email</label>
      <input
        placeholder="Email"
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
    </div>
    <div className='passwordContainer'>
      <label htmlFor="password">Password</label>
      <input
        className='password_area'
        placeholder="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <input
        type="checkbox"
        id="showPassword"
        checked={showPassword}
        onChange={handleShowPasswordChange}
      />
      <label htmlFor="showPassword">Show Password</label>
    </div>
    <button className='login_button' type="submit">
      Login
    </button>
    <p>
      New user? <Link to="/signup">Sign up</Link>
    </p>
  </form>
        {/* <form className='loginform' onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label htmlFor="email"></label>
            <input
              placeholder="Email"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              required
            />
          </div>
          <div className="passwordContainer">
            <label htmlFor="password"></label>
            <input
              placeholder="Password"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPasswordChange}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button className='login_button' type="submit">
            Login
          </button>
          <p className='sign_up'>
            New user? <Link to="/signup">Sign up</Link>
          </p>
        </form> */}
      </div>
    </div>
  );
  };
  
  export default Login;
