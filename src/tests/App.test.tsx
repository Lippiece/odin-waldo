/* eslint-disable fp/no-unused-expression, fp/no-nil*/
import { render, screen }                    from "@testing-library/react"
import userEvent                             from "@testing-library/user-event"
import {
  UserEventApi,
}                                            from "@testing-library/user-event/setup/setup"
import { Link, MemoryRouter, Route, Routes } from "react-router-dom"

import Settings            from "../components/Settings"
import { ContextProvider } from "../context/context"
import Game                from "../routes/Game"

const images  = [
  {
    name: "waldo",
    url : "https://i.imgur.com/9YQ9qX1.png",
  },
  {
    name: "odin",
    url : "https://i.imgur.com/9YQ9qX1.png",
  },
]
const Profile = () => <Settings images={ images }/>

const withCustomRoutes = ( routes: JSX.Element,
                           links?: string[] ) => () =>
  <MemoryRouter
    initialEntries={ [ links ? links[ links.length - 1 ] : "/" ] }
  >
    <ContextProvider>
      {
        links?.map( link => <Link key={ link } to={ link }>{
          link.split( "/" ).pop()
        }</Link> )
      }
      <Routes>
        { routes }
      </Routes>
    </ContextProvider>
  </MemoryRouter>

const imageSelectionRoutes = (
  <>
    <Route path="/odin-waldo/app" element={ <Game/> }/>
    <Route path="/odin-waldo/profile" element={ <Profile/> }/>
  </>
)
const imageSelectionLinks  = [ "/odin-waldo/app", "/odin-waldo/profile" ]
const ImageSelection       = withCustomRoutes( imageSelectionRoutes,
                                               imageSelectionLinks )

const authenticationRoutes = (
  <Route path="/odin-waldo/profile" element={ <Profile/> }/>
)
const authenticationLinks  = [ "/odin-waldo/profile" ]
const Authentication       = withCustomRoutes( authenticationRoutes,
                                               authenticationLinks )

describe( "image selection", () => {
  test( "should select and show an image in play menu", async () => {
    render( <ImageSelection/> )
    const user = userEvent.setup()

    await user.click( screen.getAllByRole( "button" )[ 0 ] )
    await user.click( screen.getByText( /app/iu ) )

    expect( screen.getByText( /selected/iu ) )
  } )
} )

describe( "authentication", () => {
  test( "should greet anonymous user", () => {
    render( <Authentication/> )
    expect( screen.getByText( /anonymous/iu ) )
  } )

  const login = async ( user: UserEventApi ) => {
    await user.click( screen.getByText( /login/iu ) )
    await user.type( screen.getByLabelText( /e-mail/iu ), "email@org.com" )
    await user.type( screen.getByLabelText( /password/iu ), "password" )
    await user.click( screen.getByRole( "button" ) )
  }

  test( "should greet authenticated user", async () => {
    render( <Authentication/> )
    const user = userEvent.setup()

    await login( user )

    expect( screen.getByText( /hi/iu ) )
  } )

  test( "should show stats for authenticated user", async () => {
    render( <Authentication/> )
    const user = userEvent.setup()

    await login( user )

    expect( screen.getByText( /stat/iu ) )
  } )
} )
