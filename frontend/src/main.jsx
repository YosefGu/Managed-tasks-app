import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthContextProvider } from './context/authContext.jsx'
import { ProjectsContextProvider } from './context/projectContext.jsx'
import { UsersContextProvider } from './context/usersContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UsersContextProvider>
    <ProjectsContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </ProjectsContextProvider>
    </UsersContextProvider>
  </React.StrictMode>,
)
