/* eslint-disable fp/no-unused-expression, fp/no-nil*/
import { render, screen }                    from "@testing-library/react"
import userEvent                             from "@testing-library/user-event"
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

const Router = () =>
  <MemoryRouter
    initialEntries={ [
      "/odin-waldo/app",
      "/odin-waldo/profile",
    ] }
  >
    <ContextProvider>
      <Link to="/odin-waldo/app">Play</Link>
      <Routes>
        <Route path="/odin-waldo/profile" element={ <Profile/> }/>
        <Route path="/odin-waldo/app" element={ <Game/> }/>
      </Routes>
    </ContextProvider>
  </MemoryRouter>

describe( "image selection", () => {
  test( "should select and show an image in play menu", async () => {
    render( <Router/> )
    const user = userEvent.setup()

    await user.click( screen.getAllByRole( "button" )[ 0 ] )
    await user.click( screen.getByText( /play/iu ) )

    expect( screen.getByText( /selected/iu ) )
  } )
} )
