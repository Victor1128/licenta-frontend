import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

import "./Nav.css";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const catMenu = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeOpenMenus = (e) => {
    if (showMenu && !catMenu.current?.contains(e.target)) {
      setShowMenu(false);
    }
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
        ref={catMenu}
        className={`menu show-menu-${showMenu ? "true" : "false"}`}
      >
        <div onClick={() => setShowMenu(false)} className="close-button">
          X
        </div>
        <div className="logo"></div>
        <nav className="routes-container">
          <Link to="/">Detector de satiră</Link>
          <Link to="concept">Concept</Link>
        </nav>
      </div>
    </>
  );
};

export default Nav;
