import React from 'react'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import BookContributorDashboard from './pages/BookContributor'
import ChooseDashboard from './pages/ChooseDashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/book-contributor' element={<BookContributorDashboard />} />
        <Route path='/choose-dashboard' element={<ChooseDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
