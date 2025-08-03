import React, { useEffect, useState } from 'react'
import './Form.css'
import { RiUserLine, RiLockLine, RiGoogleFill } from "@remixicon/react";
import { useAuth } from './contexts/AuthContext';

const Form = () => {
      // Firebase Auth states
      const { currentUser, signup, login, signInWithGoogle, logout } = useAuth();
      const [isLogin, setIsLogin] = useState(true);
      const [email, setEmail] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [authError, setAuthError] = useState('');
      const [authLoading, setAuthLoading] = useState(false);

      // Original form states
      const[username, setUserName] = useState("");
      const[password, setPassword] = useState("");
      const[userAllData,setUserAllData] = useState([]);

      // Firebase Auth functions
      const handleFirebaseAuth = async (e) => {
        e.preventDefault();
        
        if (!isLogin && password !== confirmPassword) {
          return setAuthError('Passwords do not match');
        }

        try {
          setAuthError('');
          setAuthLoading(true);
          
          if (isLogin) {
            await login(email, password);
          } else {
            await signup(email, password);
          }
        } catch (error) {
          setAuthError('Failed to ' + (isLogin ? 'log in' : 'create account'));
          console.error(error);
        }
        
        setAuthLoading(false);
      };

      const handleGoogleSignIn = async () => {
        try {
          setAuthError('');
          setAuthLoading(true);
          await signInWithGoogle();
        } catch (error) {
          setAuthError('Failed to sign in with Google');
          console.error(error);
        }
        setAuthLoading(false);
      };

      const handleLogout = async () => {
        try {
          await logout();
        } catch (error) {
          setAuthError('Failed to log out');
        }
      };

      // Original form functions
      function handleForm(e){
         e.preventDefault();
         const formdata = {UserName: username, UserPassword: password};

         fetch("/api/user",{
           method: "POST",
           headers: {"Content-Type":"application/json"},
           body:JSON.stringify(formdata)
         }).then((res)=>{
            return res.json();
         }).then((result)=>{
            console.log(result);
         });
      }

      function handleDelete(id){
        fetch(`/api/userdatadelete/${id}`,{
           method: "DELETE",
        }).then((res) => {
            return res.json();
        }).then((result) => {
            console.log(result);
            fetchUserData();
        }).catch((error) => {
            console.error("Delete error:", error);
        });
      }

      function fetchUserData() {
        fetch("/api/useralldata").then((res)=>{
          return res.json();
        }).then((result)=>{
           console.log(result);
           setUserAllData(result.Data);
        }).catch((error) => {
            console.error("Fetch error:", error);
        });
      }

      useEffect(()=>{
        fetchUserData();
      },[]);


      // If user is logged in with Firebase, show user dashboard
      if (currentUser) {
        return (
          <div className="login-container">
            <div className="user-dashboard">
              <div className="dashboard-header">
                <h1>Welcome, {currentUser.displayName || currentUser.email}!</h1>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
              
              {currentUser.photoURL && (
                <img 
                  src={currentUser.photoURL} 
                  alt="Profile" 
                  className="profile-image"
                />
              )}
              
              <div className="user-info">
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>UID:</strong> {currentUser.uid}</p>
                <p><strong>Email Verified:</strong> {currentUser.emailVerified ? 'Yes' : 'No'}</p>
              </div>

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="form-container" action="" onSubmit={handleForm}>
        <div className='input-wrapper'>
          <RiUserLine className="input-icon" />
          <input className="input-container" placeholder="Username" type="text" name="" id="" value={username} onChange={(e)=>{
              setUserName(e.target.value)
              }}
          />
        </div>
        <div className='input-wrapper'>
          <RiLockLine className="input-icon" />
          <input className="input-container" placeholder="Password" type="text" name="" id="" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }} 
        />
        </div>
        
        <h3>New User?<a href='#'>Register Now</a></h3>

              {/* Original form for logged-in users */}
              <div className="logged-in-form">
                <h2>Add Data</h2>
                <form className="form-container" onSubmit={handleForm}>
                  <div className='input-wrapper'>
                    <RiUserLine className="input-icon" />
                    <input 
                      className="input-container" 
                      placeholder="Username" 
                      type="text" 
                      value={username} 
                      onChange={(e)=> setUserName(e.target.value)}
                    />
                  </div>
                  <div className='input-wrapper'>
                    <RiLockLine className="input-icon" />
                    <input 
                      className="input-container" 
                      placeholder="Password" 
                      type="text" 
                      value={password} 
                      onChange={(e)=> setPassword(e.target.value)}
                    />
                  </div>
                  <input className='submit-button' type="submit" value="Submit" />
                </form>

                {/* Display user data */}
                <div className="user-data">
                  <h3>Your Data:</h3>
                  {userAllData.map((items) =>(
                     <ul key={items._id}>
                        <span>{items.user}</span>
                        <button onClick={() => handleDelete(items._id)}>
                          Delete
                        </button>
                      </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      // If user is not logged in, show Firebase auth form
      return (
        <div className="login-container">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          
          {authError && <div className="error-message">{authError}</div>}
          
          {/* Firebase Authentication Form */}
          <form className="form-container" onSubmit={handleFirebaseAuth}>
            <div className='input-wrapper'>
              <RiUserLine className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-container"
                required
              />
            </div>
            
            <div className='input-wrapper'>
              <RiLockLine className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-container"
                required
              />
            </div>
            
            {!isLogin && (
              <div className='input-wrapper'>
                <RiLockLine className="input-icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-container"
                  required
                />
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={authLoading}
              className="submit-button"
            >
              {authLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <button 
            onClick={handleGoogleSignIn}
            disabled={authLoading}
            className="google-signin-button"
          >
            <RiGoogleFill className="google-icon" />
            {authLoading ? 'Loading...' : 'Sign in with Google'}
          </button>
          
          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="switch-button"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      );
}

export default Form
