import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="menu">
      <div className="logo"></div>
      <nav className="routes-container">
        <Link to="/">Detector de satiră</Link>
        <Link to="concept">Concept</Link>
      </nav>
    </div>
  );
};

export default Nav;
