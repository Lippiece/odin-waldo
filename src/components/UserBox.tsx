import { Navbar }              from "@blueprintjs/core"
import { useEffect, useState } from "react"

import { useAppContext } from "../context/context"
import LoginBox          from "./LoginBox"

const UserBox = () => {
  const { user }                  = useAppContext()
  const [ loggedIn, setLoggedIn ] = useState( false )
  useEffect( () => {
    user ? setLoggedIn( true ) : setLoggedIn( false )
  }, [ user ] )

  return <>
    <Navbar.Heading>{ `Hi, ${ loggedIn ?
                              user :
                              "Anonymous" }` }</Navbar.Heading>
    { !loggedIn && <LoginBox/> }
  </>
}

export default UserBox
