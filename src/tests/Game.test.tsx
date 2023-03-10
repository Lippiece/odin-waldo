/* eslint-disable fp/no-unused-expression, fp/no-nil*/
import { render, screen, waitFor }           from "@testing-library/react"
import userEvent                             from "@testing-library/user-event"
import {
  setupSub,
  UserEvent,
}                                            from "@testing-library/user-event/setup/setup"
import { Link, MemoryRouter, Route, Routes } from "react-router-dom"

import Settings            from "../components/Settings"
import { ContextProvider } from "../context/context"
import Game                from "../routes/Game"

const image = {
  characters: {
    odin : [ "30", "30" ],
    waldo: [ "15", "15" ],
  },
  name      : "waldo",
  url       : "https://i.imgur.com/9YQ9qX1.png",
}

const Profile = () => <Settings images={ [ image ] }/>

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

describe( "clicking the image", () => {
  async function selectImage( user: {
    readonly setup: ( ...args: Parameters<typeof setupSub> ) => UserEvent
  } ): Promise<void> {
    await user.click( screen.getAllByRole( "button" )[ 0 ] )
    await user.click( screen.getByText( /play/iu ) )
    await user.click( screen.getByAltText( /selected/iu ) )
  }

  test( "should display the coordinates clicked", async () => {
    render( <Router/> )
    const user = userEvent.setup()

    await selectImage( user )

    expect( screen.getByText( /clicked/iu ) )
  } )

  vi.mock( "../logic/getCharacters.ts", () => ( {
    default: async () => image.characters,
  } ) )

  test( "should display the characters found", async () => {
    render( <Router/> )
    const user = userEvent.setup()

    await selectImage( user )

    expect( screen.getByText( /odin/iu ) )
  } )

  test( "should react on character click", async () => {
    render( <Router/> )
    const user = userEvent.setup()

    await selectImage( user )

    await user.click( screen.getByText( /odin/iu ) )

    await waitFor(
      () => expect( screen.getByText( /odin/iu ).textContent ).toContain(
        "???" )
    )
  } )
} )
