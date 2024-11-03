import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import LoginHeader from "../components/header/LoginHeader";
import HostHeader from "../components/header/HostHeader";
import AdminHeader from "../components/header/AdminHeader";
import Footer from "../components/footer/Footer";

const Layout = ({ userStatus = "guest" }) => {
  const renderHeader = () => {
    switch (userStatus) {
      case "user":
        return <LoginHeader />;
      case "host":
        return <HostHeader />;
      case "admin":
        return <AdminHeader />;
      default:
        return <Header />;
    }
  };

  return (
    <>
      {renderHeader()}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
