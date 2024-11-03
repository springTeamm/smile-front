import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import MainPage from './pages/mainpage/MainPage';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout userStatus="guest" />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Main;
