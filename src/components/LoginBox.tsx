import {
  Button,
  Dialog,
  DialogBody,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@fluentui/react-components"
import {useState} from "react"

import {useAppDispatch} from "../context/context"
import signIn from "../logic/signIn";

const LoginBox = () => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ status, setStatus ] = useState("")
  const dispatch = useAppDispatch()

  /* useEffect(() => {
       setStatus("")
     }, [username, password]) */
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Sign in</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>Sign in</DialogTitle>
        <DialogBody>
          <form
            onSubmit={async event => {
              event.preventDefault()
              setStatus("Signing in")
              const result = await signIn(username, password)
              if (result?.message) {
                return setStatus(result.message)
              }
              setStatus("Writing credentials")
              dispatch({payload: result, type: "set user"})
              setStatus("Signed in")
            }}
          >
            <p>{status}</p>
            <Label htmlFor="mailInput">E-Mail</Label>
            <Input
              id="mailInput"
              onInput={event => {
                setUsername(event.currentTarget.value);
                event.target.checkValidity()
                  ? setStatus("")
                  : setStatus(event.target.validationMessage)
              }}
              pattern="[^@]+@[^@]+\.[^@]+"
              minLength={10}
              required
            />
            <Label htmlFor="passwordInput">Password</Label>
            <Input
              id="passwordInput"
              onInput={event => {
                setPassword(event.currentTarget.value);
                event.target.checkValidity()
                  ? setStatus("")
                  : setStatus(event.target.validationMessage)
              }}
              type="password"
              minLength={8}
              required
            />
            <Button type="submit">Login</Button>
          </form>
        </DialogBody>
      </DialogSurface>
    </Dialog>

  )
}

export default LoginBox
