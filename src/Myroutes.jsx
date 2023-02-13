import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Register'
import App from './App'
import Friends from './Friends'
import SpecificChat from './SpecificChat'
const Myroutes = () => {
  return (
<>

<BrowserRouter>
<Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<App/>}/>
      <Route path='/friends' element={<Friends/>}/>
      <Route path='/chat/:id' element={<SpecificChat/>}/>
</Routes>
</BrowserRouter>



</>
  )
}

export default Myroutes


