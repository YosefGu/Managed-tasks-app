import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// componenets
import Home from './pages/Home'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NavBar from "./componenets/navbar"
import ProjectForm from "./componenets/projectForm"
import Projects from "./componenets/project"
import Board from "./pages/board"
import Identify from "./pages/identify"
import Recovery from "./pages/recovery"


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
          path='/create'
          element= { user ? <ProjectForm /> : <Navigate to='/login' />}
        />
         <Route
          path='/projects'
          element= { user ? <Projects /> : <Navigate to='/login' />}
        />
         <Route
          path='/board'
          element= { user ? <Board /> : <Navigate to='/login' />}
        />
        <Route
          path='/signup'
          element= { !user ? <Signup/> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element= { !user ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/identify'
          element= { !user ? <Identify /> : <Navigate to='/' />}
        />
        <Route
          path='/recovery'
          element= { !user ? <Recovery /> : <Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
