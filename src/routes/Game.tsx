import "../css/Game.css"

import { Menu, MenuItem } from "@blueprintjs/core"
import { useState }       from "react"

import { useAppContext, useAppDispatch } from "../context/context"

const Game = () => {
  const context                         = useAppContext()
  const dispatch                        = useAppDispatch()
  const [ isOpen, setIsOpen ]           = useState( false )
  const [ coordinates, setCoordinates ] = useState( [ 0, 0 ] )
  const [ characters, setCharacters ]   = useState( [] )
  const joinedCoordinates               = coordinates.join( ", " )

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
        { context?.characters?.map( ( character, index ) => (
          <MenuItem
            icon="person"
            key={ index }
            text={ character }
          />
        ) ) }
      </Menu> }
    </> )

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
