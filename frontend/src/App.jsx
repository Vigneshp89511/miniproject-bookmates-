import React from 'react'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/dashboard' 
import BookContributorDashboard from './pages/BookContributor'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/book-contributor' element={<BookContributorDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
