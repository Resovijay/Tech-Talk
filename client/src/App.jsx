
import React from 'react';
import {useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';



//components
import Login from './components/accounts/Login'
import DataProvider from './context/Dataprovider';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Logout from './components/accounts/Logout';
import UserProfile from './components/userprofile/Userprofile';
// outlet basically comes from react router dom use to navigate...if we verify from private component then
// it just redirect to its child that wrap in a private components // 

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <div style={({marginTop: 64})}>
      <DataProvider>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          <Routes>
            
            <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />            
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>
            
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>
             
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>
            
            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>
             
            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>

            <Route path='/user/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/user/:id' element={<UserProfile />} />
            </Route>

            <Route path='/user/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/user/update/:id' element={<UserProfile />} />
            </Route>


            <Route path='/logout' element={<Logout isUserAuthenticated={isUserAuthenticated} />} />  



          </Routes>
        </Box>
      </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
