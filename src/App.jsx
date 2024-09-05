import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/homePage/home/Home';
import Layout from './Layout';
import UserAuth from './components/registerAndLogin/userAuth/UserAuth';
import PrivateRoute from './components/registerAndLogin/privateRoute/PrivateRoute';
import PublicRoute from './components/registerAndLogin/privateRoute/PublicRoute';
import About from './components/aboutPage/About';


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={

              <PrivateRoute >
                <Home /> 
              </PrivateRoute>
                
            }
          />
          <Route
            path="/about"
            element={

              <PrivateRoute >
                <About /> 
              </PrivateRoute>
                
            }
          />
          <Route 
            path="/login" 
            element={

              <PublicRoute >
                <UserAuth />
              </PublicRoute>
             
            }
             />
          
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
