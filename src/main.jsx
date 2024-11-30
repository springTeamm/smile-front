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
import Dashboard from "./pages/hostpage/Dashboard";
import MainPage from './pages/mainpage/MainPage';
import SignupPage from './pages/signup/Signup';
import UserSignup from './pages/signup/UserSignup';
import HostSignup from './pages/signup/HostSignup';
import SignupComplete from './pages/signup/SignupComplete';
import Search from './pages/userpage/Search';
import Booking from './pages/userpage/BookingPage';
import BookingForm from './pages/userpage/BookingForm';
import AllBoard from "./pages/Board/AllBoard";
import PerformanceBoard from "./pages/Board/PerformanceBoard";
import PromotionBoard from "./pages/Board/PromotionBoard";
import RecruitBoard from "./pages/Board/RecruitBoard";
import PerformanceDetails from "./pages/Board/PerformanceDetails";
import PerformancePostForm from "./pages/Board/PerformanceBoardPostForm";
import PromotionPostForm from "./pages/Board/PromotionBoardPostForm";
import RecruitPostForm from "./pages/Board/RecruitBoardPostForm";
import ReservationList from './pages/mypage/ReservationList';
import ChatRoom from './pages/mypage/ChatRoom';
import ProfileEdit from './pages/mypage/ProfileEdit';


import LoginPage from './pages/mainpage/LoginPage';


function Main() {
  return (

    <Router>
      <Header />
      <Routes>
      
        <Route path="/" element={<MainPage />} /> {/* 메인 */}
          <Route path="/signup" element={<SignupPage />} />{/* 회원가입 */}
          <Route path="/UserSignup" element={<UserSignup />} /> {/* 유저 회원가입 */}
          <Route path="/HostSignup" element={<HostSignup />} /> {/* 유저 회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup-complete" element={<SignupComplete />} /> {/* 회원가입 완료 */}
          <Route path="/search" element={<Search />} /> {/* 장소 검색 */}
          <Route path="/" element={<Search />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/bookingform" element={<BookingForm />} /> {/* 예약 폼 */}
      
          <Route path="/community" element={<AllBoard />} />
        <Route path="/board-performance" element={<PerformanceBoard />} />
        <Route path="/board-promotion" element={<PromotionBoard />} />
        <Route path="/board-recruit" element={<RecruitBoard />} />
        <Route path="/posts/:id" element={<PerformanceDetails />} /> {/* 라우팅 확인 */}
        <Route path="/create-post/performance" element={<PerformancePostForm />} />
        <Route path="/create-post/promotion" element={<PromotionPostForm />} />
        <Route path="/create-post/recruit" element={<RecruitPostForm />} />
          <Route path="/reservationList" element={<ReservationList />} />{/*예약정보 */}
          <Route path="/chatroom" element={<ChatRoom />} />{/* 채팅방 */}
        <Route path="/profile-edit" element={<ProfileEdit />} />{/* 개인정보수정 */}
      
          <Route path="HostPage/*" element={<HostPage />}>
              <Route index element={<Dashboard />} />
              <Route path="SpaceSelect" element={<SpaceSelect />} />
              <Route path="cancellmanagement" element={<Cancellmanagement />} />
              <Route path="Reservationinfo" element={<Reservationinfo />} />
              <Route path="Chat" element={<Chat />} />
              <Route path="Hostinfo" element={<Hostinfo />} />
              <Route path="clubmanagement" element={<Clubmanagement />} />
              <Route path="Review" element={<Review />} />
              <Route path="Moneymanager" element={<Moneymanager />} />
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