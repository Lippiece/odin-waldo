import { Button, Input, Label } from "@fluentui/react-components"
import { useState }             from "react"

import signUp from "../logic/signUp"

const LoginBox = () => {
  const [ username, setUsername ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={ event => {
          event.preventDefault()
          signUp( username, password, app )
        } }
      >
        <Label htmlFor="mailInput">E-Mail</Label>
        <Input
          id="mailInput"
          onInput={ event => setUsername( event.currentTarget.value ) }
        />
        <Label htmlFor="passwordInput">Password</Label>
        <Input
          id="passwordInput"
          onInput={ event => setPassword( event.currentTarget.value ) }
        />
        <Button type="submit">Login</Button>
      </form>
    </>
  )
}

export default LoginBox
