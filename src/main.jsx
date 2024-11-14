import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainpage/MainPage';
import SignupPage from './pages/signup/Signup';
import UserSignup from './pages/signup/UserSignup';
import HostSignup from './pages/signup/HostSignup';

import SignupComplete from './pages/signup/SignupComplete';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import Search from './pages/userpage/Search';
import Booking from './pages/userpage/BookingPage';
import BookingForm from './pages/userpage/BookingForm';
import PerformanceBoard from './pages/Board/PerformanceBoard';
import AllBoard from './pages/Board/AllBoard';
import PromotionBoard from './pages/Board/PromotionBoard';
import RecruitBoard from './pages/Board/RecruitBoard';
import PostForm from './pages/Board/PostForm';
import PromotionDetails from './pages/Board/PromotionDetails';
import PerformanceDetails from './pages/Board/PerformanceDetails';
import ReservationList from './pages/mypage/ReservationList';
import ChatRoom from './pages/mypage/ChatRoom';
import ProfileEdit from './pages/mypage/ProfileEdit';
import RecruitDetails from './pages/Board/RecruitDetails';

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
        <Route path="/booking" element={<Booking />} /> {/* 장소 예약 */}
        <Route path="/bookingform" element={<BookingForm />} /> {/* 예약 폼 */}
        <Route path="/board-performance" element={<PerformanceBoard />} /> {/* 공연 홍보 게시판 */}
        <Route path="/board-all" element={<AllBoard />} /> {/* 전체 글 */}
        <Route path="/board-promotion" element={<PromotionBoard />} /> {/* 장소 홍보 게시판 */}
        <Route path="/board-recruit" element={<RecruitBoard />} /> {/* 모집 게시판 */}
        <Route path="/board-post" element={<PostForm />} /> {/* 게시글작성 */}
        <Route path="/performance-detail" element={<PerformanceDetails />} /> {/* 공연 홍보 상세내용 */}
        <Route path="/promotion-detail" element={<PromotionDetails />} /> {/* 장소 홍보 상세내용 */} 
        <Route path="/recruit-detail" element={<RecruitDetails />} />{/* 모집 상세내용 */}
        <Route path="/reservationList" element={<ReservationList />} />{/*예약정보 */}
        <Route path="/chatroom" element={<ChatRoom />} />{/* 채팅방 */}
        <Route path="/profile-edit" element={<ProfileEdit />} />{/* 개인정보수정 */}


      </Routes>
      <Footer />
    </Router>
  );
}

export default Main;
