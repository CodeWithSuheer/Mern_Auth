import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/Header'
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'


const App = () => {
  return (
    <>
      <Header />
      <Container className='my-2'>
        <Outlet />
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
