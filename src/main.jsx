import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Footer from './components/Footer';
import HostPage from "./pages/hostpage/HostPage";
import SpaceSelect from "./pages/hostpage/SpaceSelect";
import Cancellmanagement from "./pages/hostpage/Cancellmanagement";
import Chat from "./pages/hostpage/Chat";
import Hostinfo from "./pages/hostpage/Hostinfo";
import Review from "./pages/hostpage/Review";
import Clubmanagement from "./pages/hostpage/Clubmanagement";
import Reservationinfo from "./pages/hostpage/Reservationinfo";
import UserManager from "./pages/managerpage/UserManager";
import AdminDashboard from "./pages/managerpage/AdminDashboard";
import RoomManagement from "./pages/managerpage/RoomManagement";
import InquiryManagement from "./pages/managerpage/InquiryManagement";
import PaymentManagement from "./pages/managerpage/PaymentManagement";
import BusinessApproval from "./pages/managerpage/BusinessApproval";
import ReservationManagement from "./pages/managerpage/ReservationManagement";
import Moneymanager from "./pages/hostpage/Moneymanager";
import ClubManager from "./pages/managerpage/ClubManager";



function Main() {
  return (

    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}

        <Route path="HostPage/*" element={<HostPage />}>
            <Route path="SpaceSelect" element={<SpaceSelect />} />
            <Route path="cancellmanagement" element={<Cancellmanagement />} />
            <Route path="Reservationinfo" element={<Reservationinfo />} />
            <Route path="Chat" element={<Chat />} />
            <Route path="Hostinfo" element={<Hostinfo/>} />
            <Route path="clubmanagement" element={<Clubmanagement />} />
            <Route path="Review" element={<Review />} />
            <Route path="Moneymanager" element={<Moneymanager/>}/>
        </Route>
          <Route path="admin/*" element={<AdminDashboard />}>
              <Route path="UserManager" element={<UserManager />} />
              <Route path="RoomManagement" element={<RoomManagement />} />
              <Route path="ReservationManagement" element={<ReservationManagement />} />
              <Route path="InquiryManagement" element={<InquiryManagement />} />
              <Route path="PaymentManagement" element={<PaymentManagement />} />
              <Route path="Clubmanager" element={<ClubManager />} />
              <Route path="BusinessApproval" element={<BusinessApproval />} />
          </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default Main;