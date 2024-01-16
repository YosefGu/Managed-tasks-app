import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './context/authContext.jsx'
import { ProjectsContextProvider } from './context/projectContext.jsx'
import { UsersContextProvider } from './context/usersContext.jsx'

const clientId = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UsersContextProvider>
    <ProjectsContextProvider>
    <AuthContextProvider>
    <GoogleOAuthProvider 
      clientId={clientId}
      >
      <App />
    </GoogleOAuthProvider>
    </AuthContextProvider>
    </ProjectsContextProvider>
    </UsersContextProvider>
  </React.StrictMode>,
)
