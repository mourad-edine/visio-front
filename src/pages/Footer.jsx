import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import fb from "./../Assets/Icons/uil_facebook.png";
import ut from "./../Assets/Icons/fa_youtube.png";
import tw from "./../Assets/Icons/mdi_twitter.png";
import din from "./../Assets/Icons/mdi_linkedin.png";
import mail from "./../Assets/Icons/ic_baseline-email.png";
import local from "./../Assets/Icons/icons8-local-50.png";
import tel from "./../Assets/Icons/icons8-tel-58 (1).png";
import mess from "./../Assets/Icons/icons8-courrier-48.png";

const Footer = () => {
  // const handleEmailClick = () => {
  //   window.location.href = 'mailto:example@example.com?subject=Subject%20Here&body=Your%20message%20here';
  // };

  return (
    <>
      <div className="">
        <footer>
          <div className="d-flex">
            <div className="col-5">
              <h4>SIEGE SOCIAL</h4>
              <br />

                <li>
                  <img className="ico" src={local} alt="" />
                  Toamasina
                </li>
                <li>
                  <img className="ico" src={tel} alt="" />
                  +261 00 00 000 00
                </li>
                <li>
                  <img className="ico" src={mess} alt="" />
                  {/* <button onClick={handleEmailClick}> */}
                  camp@gmail.com
                  {/* </button> */}
                </li>
           
            </div>
            <div className="col-4 menu-footer">
              <h4>MENU</h4>
              <li>
                <a href="/college" style={{ color: "#d9d9d9" }}>
                  Qui sommes nous ?
                </a>
              </li>
              <li>
                <a href="/secondaire" style={{ color: "#d9d9d9" }}>
                  Nos Formations
                </a>
              </li>
              <li>
                <a href="/enseignement" style={{ color: "#d9d9d9" }}>
                  Enseignement Géneral
                </a>
              </li>
              <li>
                <a href="/etablissement" style={{ color: "#d9d9d9" }}>
                  Vie Etudiante
                </a>
              </li>
              <li>
                <a href="/contact" style={{ color: "#d9d9d9" }}>
                  Contact
                </a>
              </li>
            </div>
            <div
              className="d-flex"
              style={{ flexDirection: "column", alignItems: "end" }}
            >
              <h4>FOLLOW US</h4>
              <div className="res-sociaux">
                <Link to={"/"}>
                  <img src={fb} alt="fb" />
                </Link>
                <Link to={"/"}>
                  <img src={ut} alt="ut" />
                </Link>
                <Link to={"/"}>
                  <img src={mail} alt="mail" />
                </Link>
                <Link to={"/"}>
                  <img src={din} alt="din" />
                </Link>
                <Link to={"/"}>
                  <img src={tw} alt="tw" />
                </Link>
              </div>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <p style={{ textAlign: "center" }}> © 2024 , Tous droits réservés.</p>
        </footer>
      </div>
    </>
  );
};

export default Footer;
