import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext'

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userAllData, setUserAllData] = useState([]);

  const { currentUser, login, signup, signInWithGoogle, logout } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setError("");
      setLoading(true);
      
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (error) {
      setError("Failed to " + (isLogin ? "log in" : "create account"));
      console.error(error);
    }
    
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      setError("Failed to sign in with Google");
      console.error(error);
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      setError("Failed to log out");
    }
  }

  // Original backend functionality for demonstration
  async function handleLegacyForm(e) {
    e.preventDefault();
    const formdata = { UserName: email, UserPassword: password };

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Legacy form error:", error);
    }
  }

  useEffect(() => {
    // Fetch existing user data for display
    fetch("/api/useralldata")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUserAllData(result.Data || []);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (currentUser) {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Welcome, {currentUser.displayName || currentUser.email}!</h1>
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Email:</strong> {currentUser.email}</p>
          {currentUser.photoURL && (
            <img 
              src={currentUser.photoURL} 
              alt="Profile" 
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          )}
        </div>
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>

        {/* Display existing user data */}
        {userAllData.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <h3>Existing Users from Backend:</h3>
            {userAllData.map((item) => (
              <div key={item._id} style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}>
                <p>{item.user}</p>
                <button style={{ marginRight: '10px' }}>Update</button>
                <button>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: '#fee', 
          borderRadius: '4px' 
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>

      <button 
        onClick={handleGoogleSignIn}
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#db4437',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: '8px' }}>
          <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
          <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.53H1.83v2.07A8 8 0 0 0 8.98 17z"/>
          <path fill="#FBBC05" d="M4.5 10.49a4.8 4.8 0 0 1 0-3.07V5.35H1.83a8 8 0 0 0 0 7.28z"/>
          <path fill="#EA4335" d="M8.98 4.72c1.16 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.35L4.5 7.42a4.77 4.77 0 0 1 4.48-2.7z"/>
        </svg>
        {loading ? 'Loading...' : 'Sign in with Google'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>

      {/* Legacy form for backend testing */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Legacy Backend Test</h3>
        <button 
          onClick={handleLegacyForm}
          style={{
            padding: '8px 15px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Backend Connection
        </button>
      </div>

      {/* Display existing user data */}
      {userAllData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Existing Users from Backend:</h3>
          {userAllData.map((item) => (
            <div key={item._id} style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}>
              <p>{item.user}</p>
              <button style={{ marginRight: '10px' }}>Update</button>
              <button>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Form
