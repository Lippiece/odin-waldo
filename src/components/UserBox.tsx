import {Persona} from "@fluentui/react-components"
import {useEffect, useState} from "react";

import {useAppContext} from "../context/context"
import LoginBox from "./LoginBox"

const UserBox = () => {
  const {user} = useAppContext()
  const [ loggedIn, setLoggedIn ] = useState(false)
  useEffect(() => {
    user ? setLoggedIn(true) : setLoggedIn(false)
  }, [ user ])

  return <section>
    <Persona primaryText={`Hi, ${loggedIn ? user : "Anonymous"}`}/>
    {!loggedIn && <LoginBox/>}
  </section>
}

export default UserBox
