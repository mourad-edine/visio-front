import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../Assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import menu from "../../Assets/Icons/menu-nav.png";

const Navbar = () => {
  const [showMobile, setShowMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook pour la navigation

  // Vérification de la présence d'un utilisateur dans le localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setShowMobile(!showMobile);
  };

  const closeMobileMenu = () => {
    setShowMobile(false);
  };

  // Fonction de déconnexion avec redirection
  const handleLogout = () => {
    localStorage.removeItem("userId"); // Supprimer l'ID de l'utilisateur du localStorage
    setIsLoggedIn(false); // Mettre à jour l'état de la connexion
    navigate("/login"); // Rediriger vers la page de login après déconnexion
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
              

              {/* Afficher login et register si l'utilisateur n'est pas connecté */}
              {!isLoggedIn ? (
                <>
                <li className="nav-link">
                <NavLink to="about">A propos?</NavLink>
              </li>
                  <li className="nav-link">
                    <NavLink to="login">Login</NavLink>
                  </li>
                  <li className="nav-link">
                    <NavLink to="register">Register</NavLink>
                  </li>
                </>
              ) : (
                // Afficher logout si l'utilisateur est connecté
                <li className="nav-link">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
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

                {/* Afficher login et register ou logout */}
                {!isLoggedIn ? (
                  <>
                    <li className="nav-link">
                      <NavLink to="about" onClick={closeMobileMenu}>
                        A propos ?
                      </NavLink>
                    </li>
                    <li className="nav-link">
                      <NavLink to="login" onClick={closeMobileMenu}>
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-link">
                      <NavLink to="register" onClick={closeMobileMenu}>
                        Register
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="nav-link">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
