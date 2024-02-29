import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/home/Home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
