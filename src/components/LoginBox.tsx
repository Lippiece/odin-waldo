import {
  Button,
  Dialog,
  DialogBody,
  InputGroup,
  Label,
}                                from "@blueprintjs/core"
import { useCallback, useState } from "react"

import { useAppDispatch } from "../context/context"
import signIn             from "../logic/signIn"

const LoginBox = () => {
  const [ username, setUsername ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
  const [ status, setStatus ]     = useState( "" )
  const [ isOpen, setIsOpen ]     = useState( false )
  const handleButtonClick         = useCallback( () => setIsOpen( !isOpen ),
                                                 [] )
  const handleClose               = useCallback( () => setIsOpen( false ),
                                                 [] )

  const dispatch                             = useAppDispatch()
  const onSubmit: ( event ) => Promise<void> = async event => {
    event.preventDefault()
    setStatus( "Signing in" )
    const result = await signIn( username, password )
    if ( result?.message ) {
      return setStatus( result.message )
    }
    setStatus( "Writing credentials" )
    dispatch( { payload: result, type: "set user" } )
    setStatus( "Signed in" )
  }
  const onInput: ( event ) => void           = event => {
    event.target.type === "password"
    ? setPassword( event.currentTarget.value )
    : setUsername( event.currentTarget.value )
    event.target.checkValidity()
    ? setStatus( "" )
    : setStatus( event.target.validationMessage )
  }
  return (
    <>
      <Button onClick={ handleButtonClick } text="Sign in"/>
      <Dialog isOpen={ isOpen } onClose={ handleClose }>
        <DialogBody>
          <form
            onSubmit={ onSubmit }
          >
            <p>{ status }</p>
            <Label htmlFor="mailInput">E-Mail</Label>
            <InputGroup
              id="mailInput"
              onInput={ onInput }
              pattern="[^@]+@[^@]+\.[^@]+"
              minLength={ 10 }
              required
              placeholder="mail@domain.com"
            />
            <Label htmlFor="passwordInput">Password</Label>
            <InputGroup
              id="passwordInput"
              onInput={ onInput }
              type="password"
              minLength={ 6 }
              required
            />
            <Button type="submit">Login</Button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  )
}

export default LoginBox
