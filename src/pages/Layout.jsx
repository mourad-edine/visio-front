import React from "react";
import { Outlet } from "react-router-dom";
//import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
