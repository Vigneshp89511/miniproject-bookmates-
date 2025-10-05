import React from 'react'
import { getUser } from '../lib/api'
import { Link } from 'react-router-dom'

export default function ChooseDashboard() {
  const user = getUser();
  const name = user?.name || 'User';
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome, {name}</h1>
        <p className="text-gray-600 mb-6">Choose how you want to continue</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link className="bg-amber-600 text-white rounded-xl py-3 font-medium hover:bg-amber-700" to="/dashboard">Reader</Link>
          <Link className="bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700" to="/book-contributor">Contributor</Link>
        </div>
      </div>
    </div>
  )
}


