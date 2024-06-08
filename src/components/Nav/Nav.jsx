import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const catMenu = useRef(null);
  const navigator = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeOpenMenus = (e) => {
    if (showMenu && !catMenu.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleNavigate = (route) => {
    setShowMenu(false);
    navigator(route);
  };

  document.addEventListener("mousedown", closeOpenMenus);

  return (
    <>
      {!showMenu && (
        <div className="burger" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
      <div
        className={`menu fake-menu show-menu-${showMenu ? "true" : "false"}`}
      />
      <div
        ref={catMenu}
        className={`menu show-menu-${showMenu ? "true" : "false"}`}
      >
        <div onClick={() => setShowMenu(false)} className="close-button">
          X
        </div>
        <div className="logo"></div>
        <nav className="routes-container">
          <div className="link" onClick={() => handleNavigate("/stiri")}>
            Ultimele știri
          </div>
          <div className="link" to="/" onClick={() => handleNavigate("/")}>
            Detector de satiră
          </div>
          <div className="link" onClick={() => handleNavigate("concept")}>
            Concept
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
