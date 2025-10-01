import React from 'react'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/dashboard' 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
