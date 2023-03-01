import {
  Button,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Persona,
} from "@fluentui/react-components"

import { useAppContext } from "../context/context"
import LoginBox          from "./LoginBox"

const UserBox = () => {
  const { user }        = useAppContext()
  const userOrAnonymous = user?.email || "Anonymous"

  return <section>
    <Persona primaryText={ `Hi, ${ userOrAnonymous }` }/>
    !user && <Dialog>
    <DialogTrigger>
      <Button>Sign in</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogTitle>Sign in</DialogTitle>
      <LoginBox/>
    </DialogSurface>
  </Dialog>
  </section>
}

export default UserBox
