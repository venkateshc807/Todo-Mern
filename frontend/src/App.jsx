import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from './components/todo';
import Add from './components/add';
function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo/>}></Route>
          <Route path='/add' element={<Add/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
