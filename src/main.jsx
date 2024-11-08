import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Footer from './components/Footer'; 

function Main() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default Main;