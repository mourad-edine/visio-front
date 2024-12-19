import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../Assets/images/logo.png";
import { NavLink } from "react-router-dom";
import menu from "../../Assets/Icons/menu-nav.png";

const Navbar = () => {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobile && !event.target.closest(".menu-mobile")) {
        setShowMobile(false);
      }
    };

    const handleScroll = () => {
      if (showMobile) {
        setShowMobile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    };
  }, [showMobile]);

  const toggleMenu = () => {
    setShowMobile(!showMobile);
  };

  const closeMobileMenu = () => {
    setShowMobile(false);
  };

  return (
    <>
      <nav>
        <div className="container-nav">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="menu show">
            <ul>
              <li className="nav-link">
                <NavLink to="home">Home</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="about">A propos?</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="login">login</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="register">register</NavLink>
              </li>
              
            </ul>
          </div>
          <div className={`menu-mobile show-mobile`}>
            <img
              src={menu}
              className={`ico-menu ${showMobile ? "show" : ""}`}
              alt="Menu icon"
              onClick={toggleMenu}
            />
            {showMobile && (
              <ul>
                <li className="nav-link">
                  <NavLink to="home" onClick={closeMobileMenu}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-link">
                  <NavLink to="about" onClick={closeMobileMenu}>
                    A propos ?
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
