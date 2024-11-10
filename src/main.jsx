import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Footer from './components/Footer';
import ManagerPage from "./pages/managerpage/ManagerPage";
import SpaceSelect from "./pages/managerpage/SpaceSelect";
import Cancellmanagement from "./pages/managerpage/Cancellmanagement";
import Chat from "./pages/managerpage/Chat";
import Hostinfo from "./pages/managerpage/Hostinfo";
import Review from "./pages/managerpage/Review";
import Clubmanagement from "./pages/managerpage/Clubmanagement";
import Reservationinfo from "./pages/managerpage/Reservationinfo";



function Main() {
  return (

    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}

        <Route path="ManagerPage" element={<ManagerPage />}>
            <Route path="SpaceSelect" element={<SpaceSelect />} />
            <Route path="cancellmanagement" element={<Cancellmanagement />} />
            <Route path="Reservationinfo" element={<Reservationinfo />} />
            <Route path="Chat" element={<Chat />} />
            <Route path="Hostinfo" element={<Hostinfo/>} />
            <Route path="clubmanagement" element={<Clubmanagement />} />
            <Route path="Review" element={<Review />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default Main;