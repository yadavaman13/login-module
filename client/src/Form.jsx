import React, { useEffect, useState } from 'react'
import './Form.css'
import { RiUserLine, RiLockLine, RiGoogleFill } from "@remixicon/react";
// import { useAuth } from './contexts/AuthContext';

const Form = () => {
      // Local auth states
      const [isLogin, setIsLogin] = useState(true);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [authError, setAuthError] = useState("");
      const [authLoading, setAuthLoading] = useState(false);
      const [loggedInUser, setLoggedInUser] = useState(null);

      // Original form states
      const[username, setUserName] = useState("");
      const[password, setPassword] = useState("");
      const[userAllData,setUserAllData] = useState([]);


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


      // If user is logged in locally, show user dashboard
      if (loggedInUser) {
        return (
          <div className="login-container">
            <div className="user-dashboard">
              <div className="dashboard-header">
                <h1>Welcome, {loggedInUser.email}!</h1>
                <button onClick={() => { setLoggedInUser(null); }} className="logout-button">
                  Logout
                </button>
              </div>
              <div className="user-info">
                <p><strong>Email:</strong> {loggedInUser.email}</p>
              </div>
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

      // If user is not logged in, show local login/signup form
      function handleAuthForm(e) {
        e.preventDefault();
        setAuthError("");
        setAuthLoading(true);
        if (!isLogin && password !== confirmPassword) {
          setAuthError("Passwords do not match");
          setAuthLoading(false);
          return;
        }
        const endpoint = isLogin ? "/api/login" : "/api/register";
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        })
          .then(res => res.json())
          .then(result => {
            if (result.success) {
              setLoggedInUser({ email });
            } else {
              setAuthError(result.message || "Authentication failed");
            }
            setAuthLoading(false);
          })
          .catch(() => {
            setAuthError("Network error");
            setAuthLoading(false);
          });
      }

      return (
        <div className="login-container">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          {authError && <div className="error-message">{authError}</div>}
          <form className="form-container" onSubmit={handleAuthForm}>
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
