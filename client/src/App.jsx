import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Form from './Form'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Form />
      </div>
    </AuthProvider>
  )
}

export default App
