import React, { useContext, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/SIdebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Comments from './pages/Comments/Comments';
import Sentiments from './pages/Sentiment/Sentiments';
import { ToastContainer } from 'react-toastify';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import { StoreContext } from './context/StoreContext';

const App = () => {

  const { showLogin, setShowLogin, url } = useContext(StoreContext);
  


  return (

    <>
      {showLogin ? <LoginPopup /> : <></>}
      <ToastContainer autoClose={1000} />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar /> 
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
          <Route path='/comments' element={<Comments url={url} />} />
          <Route path='/sentiments' element={<Sentiments url={url} />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
