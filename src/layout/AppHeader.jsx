import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.jpeg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHouse,
  faShop,
  faEnvelopesBulk,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Backdrop } from "../cmps/general/Backdrop";

export function AppHeader() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  function toggleIsSideMenuOpen() {
    setIsSideMenuOpen((prev) => !prev);
  }

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
        <div className="btn-group">
          <Link className="btn btn-icon" to={"/cart"}>
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <button className="btn btn-icon" onClick={toggleIsSideMenuOpen}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </section>
      {isSideMenuOpen && <SideMenu onClose={toggleIsSideMenuOpen} />}
    </header>
  );
}

function SideMenu({ onClose }) {
  return (
    <Backdrop onClick={onClose}>
      <section className="side-menu">
        <nav>
          <Link className="btn btn-icon" to={"/"}>
            <FontAwesomeIcon icon={faHouse} />
          </Link>
          <Link className="btn btn-icon" to={"/toy"}>
            <FontAwesomeIcon icon={faShop} />
          </Link>
          <Link className="btn btn-icon" to={"/about"}>
            <FontAwesomeIcon icon={faInfo} />
          </Link>
          <Link className="btn btn-icon" to={"/contact"}>
            <FontAwesomeIcon icon={faEnvelopesBulk} />
          </Link>
        </nav>
      </section>
    </Backdrop>
  );
}
