import React from 'react'

const App = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#007bff' }}>🔥 Firebase Authentication App</h1>
      <p>Testing React App - Step 1</p>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '8px',
        margin: '20px 0',
        border: '2px solid #007bff'
      }}>
        <h2>✅ React is Working!</h2>
        <p>If you can see this message, React is rendering correctly.</p>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Test Button
        </button>
      </div>
    </div>
  )
}

export default App
