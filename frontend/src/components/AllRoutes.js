import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Tasks } from '../pages/Tasks';
export const AllRoutes = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const newdata=useSelector(state=>state);
  console.log(newdata)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/task' element={isAuthenticated ?<Tasks/>:<Login/>} />
      </Routes>
    </div>
  );
};
