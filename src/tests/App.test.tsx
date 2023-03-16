/* eslint-disable fp/no-unused-expression, fp/no-nil*/
/* eslint-disable react/forbid-elements */
import { render, screen }              from "@testing-library/react"
import userEvent                       from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"

import Nav     from "../components/Nav"
import {
  ContextProvider,
  useAppContext,
  useAppDispatch,
}              from "../context/context"
import Profile from "../routes/Profile"

const withCustomRoutes = ( routes: JSX.Element,
                           links: string[] ) => () =>
  <MemoryRouter
    initialEntries={ [ links[ links.length - 1 ] ] }
  >
    <ContextProvider>
      <Nav/>
      <Routes>
        { routes }
      </Routes>
    </ContextProvider>
  </MemoryRouter>

const authenticationRoutes = (
  <Route path="/odin-waldo/profile" element={ <Profile/> }/>
)
const authenticationLinks  = [ "/odin-waldo/profile" ]
const Authentication       = withCustomRoutes( authenticationRoutes,
                                               authenticationLinks )

describe( "authentication", () => {
  test( "should greet anonymous user", () => {
    render( <Authentication/> )
    expect( screen.getByText( /anonymous/iu ) )
  } )

  vi.mock( "../components/UserBox.tsx", () => ( {
    default: () => {
      const { user }        = useAppContext()
      const dispatch        = useAppDispatch()
      const userOrAnonymous = user || "Anonymous"

      return <section>
        <p>{ `Hi, ${ userOrAnonymous }` }</p>
        { !user && <form
          onSubmit={ event => {
            event.preventDefault()
            dispatch( {
                        payload: "email@email.email",
                        type   : "set user",
                      } )
          } }
        >
          <button type="submit">Sign in</button>
        </form> }
      </section>
    },
  } ) )

  test( "should greet authenticated user", async () => {
    render( <Authentication/> )
    const user = userEvent.setup()

    await user.click( screen.getByText( /sign/iu ) )

    expect( screen.getByText( /email@email/iu ) )
  } )

} )
