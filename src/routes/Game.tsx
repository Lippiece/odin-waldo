import "../css/Game.css"

import { Menu, MenuItem }      from "@blueprintjs/core"
import { useAtom }             from "jotai"
import { useEffect, useState } from "react"

import convertLinkToName from "../logic/convertLinkToName"
import isFound           from "../logic/isFound"
import {
  charactersAtom,
  imageAtom,
  recordsAtom,
  timeAtom,
  timestampsAtom,
}                        from "../state/atoms"

type Point = [ number, number ]

const Game = () => {
  const [ characters ]                = useAtom( charactersAtom )
  const [ image ]                     = useAtom( imageAtom )
  const [ records, setRecords ]       = useAtom( recordsAtom )
  const [ timestamps, setTimestamps ] = useAtom( timestampsAtom )
  const [ time ]                      = useAtom( timeAtom )

  const [ isOpen, setIsOpen ]                   = useState( false )
  const [ coordinates, setCoordinates ]         = useState<Point>( [ 0, 0 ] )
  const [ foundCharacters, setFoundCharacters ] = useState<string[]>( [] )
  const joinedCoordinates                       = coordinates.join( ", " )

  const handleCharacterSelection = ( character: string ) => {
    const handleFound = () => {
      setFoundCharacters( [ ...foundCharacters, character ] )

      const newTimestamps = timestamps.set( character, time )
      setTimestamps( new Map( newTimestamps ) )
    }

    const calculatedRadius: number = ( coordinates[ 0 ] + coordinates[ 1 ] ) /
                                     2 /
                                     10
    const radius: number           = calculatedRadius < 50
                                     ? 50
                                     : calculatedRadius
    const actualCoordinates: Point = characters[ character ]

    if ( isFound( coordinates, actualCoordinates, radius ) ) {
      handleFound()
    }
  }

  useEffect( ( () => {
    localStorage.setItem( "characters", JSON.stringify( characters ) )
  } ), [ characters ] )
  useEffect( ( () => {
    localStorage.setItem( "image", image )
  } ), [ image ] )
  useEffect( ( () => {
    localStorage.setItem( "timestamps", JSON.stringify( timestamps ) )
    const newRecords = records.set( convertLinkToName( image ), timestamps )
    setRecords( new Map( newRecords ) )
  } ), [ timestamps ] )
  useEffect( () => {
    localStorage.setItem( "time", time )
  } )
  useEffect( () => {
    localStorage.setItem( "records", JSON.stringify( records ) )
  }, [ records ] )

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
                       "none" }
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
