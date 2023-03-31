/* eslint-disable fp/no-unused-expression, fp/no-nil*/
/* eslint-disable react/forbid-elements */
import { render, screen } from "@testing-library/react"
import userEvent          from "@testing-library/user-event"
import { useAtom }        from "jotai"

import UserBox      from "../components/UserBox"
import { userAtom } from "../state/atoms"

describe( "authentication", () => {
  test( "should greet anonymous user", () => {
    render( <UserBox/> )
    expect( screen.getByText( /anonymous/iu ) )
  } )

  vi.mock( "../components/UserBox.tsx", () => ( {
        default: () => {
          const [ user, setUser ] = useAtom( userAtom )
          const userOrAnonymous   = user || "Anonymous"

          return <section>
            <p>{ `Hi, ${ userOrAnonymous }` }</p>
            { !user && <form
              onSubmit={ event => {
                event.preventDefault()
                setUser( "email@email.email" )
              } }
            >
              <button type="submit">Sign in</button>
            </form> }
          </section>
        },
      }
  ) )

  test( "should greet authenticated user", async () => {
    render( <UserBox/> )
    const user = userEvent.setup()

    await user.click( screen.getByText( /sign/iu ) )

    expect( screen.getByText( /email@email/iu ) )
  } )

} )
