import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AdminDashboard from './pages/AdminDashboard'
import AdminRoute from './routes/AdminRoute'
import Navbar from './components/Navbar/Navbar'
import MyBookings from './pages/MyBookings'
import AddEvent from './pages/AddEvent'
import Bookings from './pages/bookings'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/myBookings' element={<MyBookings/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
        <Route path='/addEvent' element={<AdminRoute><AddEvent /></AdminRoute>}/>
        <Route path="/admin/event/:eventId/bookings" element={<AdminRoute><Bookings /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
