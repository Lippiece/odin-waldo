import "../css/Nav.css";

import { Link as FluentLink, Title1 } from "@fluentui/react-components";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/odin-waldo/">
        <FluentLink>
          <Title1 as="h1">Logo</Title1>
        </FluentLink>
      </Link>
      <Link to="/odin-waldo/app">
        <FluentLink>
          <Title1 as="h1">Play</Title1>
        </FluentLink>
      </Link>
      <Link to="/odin-waldo/profile">
        <FluentLink>
          <Title1 as="h1">Profile</Title1>
        </FluentLink>
      </Link>
    </nav>
  );
};

export default Nav;
