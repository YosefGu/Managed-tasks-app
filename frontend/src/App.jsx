import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// componenets
import Home from './pages/Home'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NavBar from "./componenets/navbar"

function App() {
  const { user } = useAuthContext();
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element= { user ? <Home /> : <Navigate to='/login' />}
        />
        <Route
          path='/signup'
          element= { !user ? <Signup/> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element= { !user ? <Login /> : <Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
