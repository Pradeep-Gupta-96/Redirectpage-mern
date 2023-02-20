import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Emp from './Emp'
import Sinin from './Sinin'
import Sinup from './Sinup'
import User from './User'
const App = () => {
   
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Sinup/>}/>
                    <Route path='/signin' element={<Sinin/>}/>
                    <Route path='/emp' element={<Emp/>}/>
                    <Route path='/user' element={<User/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App