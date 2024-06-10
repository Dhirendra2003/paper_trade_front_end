/* eslint-disable no-unused-vars */

import React from 'react'
import Home from './components/Home'
import Landingpage from './components/Landingpage'
import LoginPage from './components/LoginPage'
import Register from './components/Register'
import History from './components/History'
import Portfolio from './components/Portfolio';
import Analytics from './components/Analytics'
import PlansPage from './components/PlansPage'
import AdminLogin from './components/AdminLogin'
import AdminHome from './components/AdminHome'
import MentorLogin from './components/MentorLogin'
import MentorHome from './components/MentorHome'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import userContext from './components/Context';
import { useState } from 'react'

export default function App() {
  const [userObj, setUserObj] = useState({});
  const updateUser = (userInfo) => {
    setUserObj(userInfo);
  };
  return (
    <BrowserRouter>
    <userContext.Provider value={{ userObj, updateUser }}>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/history' element={<History />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/subscription' element={<PlansPage />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/adminhome' element={<AdminHome />} />
      </Routes>
    </userContext.Provider>
  </BrowserRouter>
   
  )
}
