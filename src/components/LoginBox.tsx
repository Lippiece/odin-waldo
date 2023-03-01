import { Button, Input, Label } from "@fluentui/react-components"
import { useState }             from "react"

import { useAppDispatch } from "../context/context"
import signUp             from "../logic/signUp"

const LoginBox = () => {
  const [ username, setUsername ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
  const [ status, setStatus ]     = useState( "" )
  const dispatch                  = useAppDispatch()

  return (
    <form
      onSubmit={ async event => {
        event.preventDefault()
        setStatus( "Signing up" )
        try {
          await signUp( username, password )
          setStatus( "Writing credentials" )
          dispatch( { payload: { password, username }, type: "set user" } )
          setStatus( "Done!" )
        } catch ( error ) {
          setStatus( "Error! See console" )
          console.error( error )
        }
      } }
    >
      <p>{ status }</p>
      <Label htmlFor="mailInput">E-Mail</Label>
      <Input
        id="mailInput"
        onInput={ event => setUsername( event.currentTarget.value ) }
        pattern="[^@]+@[^@]+\.[^@]+"
      />
      <Label htmlFor="passwordInput">Password</Label>
      <Input
        id="passwordInput"
        onInput={ event => setPassword( event.currentTarget.value ) }
        minLength={ 8 }
      />
      <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginBox
