import React from 'react'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/dashboard'
import BookContributorDashboard from './pages/BookContributor'
import ChooseDashboard from './pages/ChooseDashboard'
import {  Route, Routes } from 'react-router-dom'

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/book-contributor' element={<BookContributorDashboard />} />
        <Route path='/choose-dashboard' element={<ChooseDashboard />} />
      </Routes>
  )
}

export default App
