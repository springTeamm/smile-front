import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Footer from './components/Footer';
import ManagerPage from "./pages/hostpage/ManagerPage";
import SpaceSelect from "./pages/hostpage/SpaceSelect";
import Cancellmanagement from "./pages/hostpage/Cancellmanagement";
import Chat from "./pages/hostpage/Chat";
import Hostinfo from "./pages/hostpage/Hostinfo";
import Review from "./pages/hostpage/Review";
import Clubmanagement from "./pages/hostpage/Clubmanagement";
import Reservationinfo from "./pages/hostpage/Reservationinfo";



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