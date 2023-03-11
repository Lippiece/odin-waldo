import "../css/Game.css"

import { Menu, MenuItem } from "@blueprintjs/core"
import { useState }       from "react"

import { useAppContext } from "../context/context"
import isFound           from "../logic/isFound"

type Point = [ number, number ]

const Game = () => {
  const context                                 = useAppContext()
  const [ isOpen, setIsOpen ]                   = useState( false )
  const [ coordinates, setCoordinates ]         = useState<Point>( [ 0, 0 ] )
  const [ foundCharacters, setFoundCharacters ] = useState<string[]>( [] )
  const joinedCoordinates                       = coordinates.join( ", " )
  const handleCharacterSelection                = ( character: string ) => {
    const radius: number           = 50
    const actualCoordinates: Point = context.characters[ character ]
    isFound( coordinates, actualCoordinates, radius )
    && setFoundCharacters( [ ...foundCharacters, character ] )
  }

  const Popup = () => (
    <>
      { isOpen && <Menu
        style={ {
          left    : `${ coordinates[ 0 ] }px`,
          position: "absolute",
          top     : `${ coordinates[ 1 ] }px`,
        } }
      >
        <MenuItem
          icon="select"
          text={ `Clicked coordinates: ${ joinedCoordinates }` }
        />
        { context?.characters &&
          Object.keys( context.characters )?.map( ( character, index ) => (
            <MenuItem
              intent={ foundCharacters.includes( character ) ?
                       "success" :
                       undefined }
              icon="person"
              key={ index }
              text={ foundCharacters.includes( character )
                     ? `${ character }✔`
                     : character }
              onClick={ _ => handleCharacterSelection( character ) }
            />
          ) ) }
      </Menu> }
    </>
  )

  return <>
    <h1>Hello from game</h1>
    { context?.image
      && <>
        <h2>Selected image:</h2>
        <img
          src={ context.image }
          alt="Selected image from Profile"
          onClick={ event => {
            const rect                 = event.target.getBoundingClientRect()
            const { clientX, clientY } = event
            const imageX               = clientX - rect.x
            const rawImageY            = clientY - rect.y
            const imageY               = Number( rawImageY.toFixed( 0 ) )
            setIsOpen( !isOpen )
            setCoordinates( [ imageX, imageY ] )
          } }
          id="selectedImage"
        />
        <Popup/>
      </> }
  </>
}

export default Game
