import React from 'react'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App
