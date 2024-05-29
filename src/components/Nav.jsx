import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="logo"></div>
      <div className="routes-container">
        <Link to="/">Detector de satiră</Link>
        <Link to="concept">Concept</Link>
      </div>
    </nav>
  );
};

export default Nav;
