import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#007bff', fontSize: '2.5rem' }}>🔥 Firebase Authentication App</h1>
      <div style={{ 
        padding: '30px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '12px',
        margin: '30px auto',
        maxWidth: '600px',
        border: '3px solid #007bff',
        boxShadow: '0 4px 8px rgba(0,123,255,0.2)'
      }}>
        <h2 style={{ color: '#28a745', marginBottom: '20px' }}>✅ SUCCESS! React is Working!</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
          Your React app is now running successfully!
        </p>
        <button 
          onClick={() => alert('Button clicked! React is working perfectly!')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Test Button - Click Me!
        </button>
      </div>
      <p style={{ color: '#666', marginTop: '20px' }}>
        Next step: Add Firebase Authentication
      </p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
