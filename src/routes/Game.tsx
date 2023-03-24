import "../css/Game.css"

import { Menu, MenuItem } from "@blueprintjs/core"
import { useAtom }        from "jotai"
import { useState }       from "react"

import isFound                       from "../logic/isFound"
import { charactersAtom, imageAtom } from "../state/atoms"

type Point = [ number, number ]

const Game = () => {
  const [ characters ]                          = useAtom( charactersAtom )
  const [ image ]                               = useAtom( imageAtom )
  const [ isOpen, setIsOpen ]                   = useState( false )
  const [ coordinates, setCoordinates ]         = useState<Point>( [ 0, 0 ] )
  const [ foundCharacters, setFoundCharacters ] = useState<string[]>( [] )
  const joinedCoordinates                       = coordinates.join( ", " )
  const handleCharacterSelection                = ( character: string ) => {
    const radius: number           = 50
    const actualCoordinates: Point = characters[ character ]
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
        { characters &&
          Object.keys( characters )?.map( ( character, index ) => (
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
    { image
      && <>
        <h2>Selected image:</h2>
        <img
          src={ image }
          alt="Selected image from Profile"
          onClick={ event => {
            const rectangle            = event.target.getBoundingClientRect()
            const { clientX, clientY } = event

            const rawImageX = clientX - rectangle.x
            const rawImageY = clientY - rectangle.y

            const imageX = Number( rawImageX.toFixed( 0 ) )
            const imageY = Number( rawImageY.toFixed( 0 ) )

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
