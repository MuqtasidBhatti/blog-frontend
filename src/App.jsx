import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import CreatePost from './pages/CreatePost'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import EditPost from './pages/EditPost'
import { Toaster } from 'react-hot-toast'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={
          <ProtectedRoute>
            <Navbar />
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/create' element={
          <ProtectedRoute>
            <Navbar />
            <CreatePost />
          </ProtectedRoute>
        } />

        <Route path='/edit/:id' element={
          <ProtectedRoute>
            <Navbar />
            <EditPost />
          </ProtectedRoute>
        } />
        <Route path='/post/:id' element={
          <ProtectedRoute>
            <Navbar />
            <SinglePost />
          </ProtectedRoute>
        } />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
