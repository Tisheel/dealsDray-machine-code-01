import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateEmployee from './pages/CreateEmployee'
import EditEmployee from './pages/EditEmployee'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Dashboard />} />
      <Route path='/createEmployee' element={<CreateEmployee />} />
      <Route path='/updateEmployee/:employeeId' element={<EditEmployee />} />
    </Routes>
  )
}

export default App