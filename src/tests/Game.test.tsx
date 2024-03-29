/* eslint-disable fp/no-unused-expression, fp/no-nil*/
import { Button }                       from "@blueprintjs/core"
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent                        from "@testing-library/user-event"
import {
  UserEvent,
}                                       from "@testing-library/user-event/setup/setup"
import { useAtom }                      from "jotai"
import { FC, useState }                 from "react"
import { MemoryRouter, Route, Routes }  from "react-router-dom"

import Nav                           from "../components/Nav"
import getCharacters                 from "../logic/getCharacters"
import Game                          from "../routes/Game"
import { charactersAtom, imageAtom } from "../state/atoms"

const image = {
  alt       : "waldo",
  characters: {
    odin : [ "30", "30" ],
    waldo: [ "15", "15" ],
  },
  src       : "https://i.imgur.com/9YQ9qX1.png",
}

const Settings: FC<{ images: HTMLImageElement[] }> = ( { images } ) => {

  const Image = ( { image } ) => {
    const [ loaded, setLoaded ] = useState( false )
    const [ _, setImage ]       = useAtom( imageAtom )
    const [ __, setCharacters ] = useAtom( charactersAtom )
    return (
      <Button
        onClick={ async () => {
          setImage( image.src )

          const characters = await getCharacters( image.src )
          setCharacters( characters )
        } }

        intent={ image === image.src ? "primary" : "none" }
        data-testid="image-selection-button"
      >
        <img
          alt={ image.alt }
          src={ image.src }
          loading="lazy"
          onLoad={ () => setLoaded( true ) }

          //          className={ loaded ? "" : "bp4-skeleton" }
        />
      </Button>
    )
  }
  return <section className="image-pool">
    <h1>Choose your destiny</h1>
    { images?.map( imageProperties => (
      <Image image={ imageProperties } key={ imageProperties.alt }/> ) ) }
  </section>
}

const Profile = () => <Settings images={ [ image ] }/>

const Router = (
  { additionalComponents = null }: { additionalComponents?: JSX.Element } = {}
) =>
  <MemoryRouter
    initialEntries={ [
      "/odin-waldo/app",
      "/odin-waldo/profile",
    ] }
  >
    <Nav/>
    { additionalComponents }
    <Routes>
      <Route path="/odin-waldo/profile" element={ <Profile/> }/>
      <Route path="/odin-waldo/app" element={ <Game/> }/>
    </Routes>
  </MemoryRouter>

const selectImage = async ( user: UserEvent ): Promise<void> => {
  await user.click( screen.getByTestId( "image-selection-button" ) )
  await user.click( screen.getByText( /play/iu ) )
  expect( await screen.findByRole( "img" ) )
  await user.click( screen.getByRole( "img" ) )
}

describe( "game process", () => {
  test( "should display the selected image", async () => {
    render( <Router/> )
    const user = userEvent.setup()

    await user.click( screen.getByTestId( "image-selection-button" ) )
    await user.click( screen.getByText( /play/iu ) )

    expect( await screen.findByRole( "img" ) )
  } )

  describe( "clicking the image", () => {

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
          "✔" )
      )
    } )
  } )

  const wait = ( ms: number ) => new Promise( resolve => setTimeout( resolve,
                                                                     ms ) )
  describe( "timer", () => {
    test( "should be still when not on the game page",
          async () => {
            render( <Router/> )

            expect( screen.getByText( /00:00/u ) )

            await wait( 1000 )
            expect( screen.getByText( /00:00/u ) )
          } )

    test( "should be still on the game page without an image", async () => {
      render( <Router/> )
      const user = userEvent.setup()

      await user.click( screen.getByText( /play/iu ) )

      expect( screen.getByText( /00:00/u ) )

      await wait( 1000 )

      expect( screen.getByText( /00:00/u ) )
    } )

    test( "should increment each second on the game page with an image",
          async () => {
            render( <Router/> )
            const user = userEvent.setup()

            await act( async () => {await selectImage( user )} )

            expect( screen.getByText( /00:00/u ) )

            await waitFor( () => expect( screen.getByText( /00:01/u ) ) )
          } )
  } )
} )
