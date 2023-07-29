import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Slot from './Slot'
import Node from './Node'
import Report from './Report'
import Inventory from './Inventory'
import Logout from './Logout'
function App() {
  return (
    <BrowserRouter>
     <Routes> 
        <Route path='/' element={<Login />}>
        <Route path='/signup' element={<Signup />}></Route>
        </Route>

        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path="/logout" element={<Logout />} /> 
        <Route path='/inventory' element={<Inventory />}></Route>
        <Route path='/node' element={<Node />}></Route>
        <Route path='/slot' element={<Slot />}></Route>
        <Route path='/report' element={<Report />}></Route>
      
  
  
     </Routes>
    </BrowserRouter>
    
  )
}

export default App
