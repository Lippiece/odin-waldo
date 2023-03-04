import "../css/Nav.css"

import { Button, Navbar } from "@blueprintjs/core"
import { Link }           from "react-router-dom"

import UserBox from "./UserBox"

const Nav = () => {
  return (
    <Navbar class="nav">
      <Navbar.Group>
        <Link to="/odin-waldo/">
          <Navbar.Heading>Logo</Navbar.Heading>
        </Link>
        <Navbar.Divider/>
        <Link to="/odin-waldo/app">
          <Button text="Play" large className="bp4-minimal"/>
        </Link>
        <Link to="/odin-waldo/profile">
          <Button text="Profile" large className="bp4-minimal"/>
        </Link>
        <Navbar.Divider/>
        <UserBox/>
      </Navbar.Group>
    </Navbar>
  )
}

export default Nav
