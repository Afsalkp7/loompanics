import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/homePage/home/Home';
import Layout from './Layout';
import UserAuth from './components/registerAndLogin/userAuth/UserAuth';


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route 
            path="/login" 
            element={
              <UserAuth />
            }
             />
          
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
