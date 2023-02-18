import "../css/Nav.css";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/odin-waldo/">
        <h1>Logo</h1>
      </Link>
      <ul>
        <li>
          <Link to="/odin-waldo/app">Play</Link>
        </li>
        <li>
          <Link to="/odin-waldo/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
