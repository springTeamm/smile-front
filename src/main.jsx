import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainpage/MainPage';
import SignupPage from './pages/signup/Signup';
import UserSignup from './pages/signup/UserSignup';
import SignupComplete from './pages/signup/SignupComplete';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import Category from './pages/userpage/Category';

function Main() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/UserSignup" element={<UserSignup />} />
        <Route path="/signup-complete" element={<SignupComplete />} />
        <Route path="/category" element={<Category />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default Main;
