import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./Nav.css";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      {!showMenu && (
        <div className="burger" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
      <div className={`menu show-menu-${showMenu ? "true" : "false"}`}>
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
