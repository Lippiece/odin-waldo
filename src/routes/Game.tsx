import { Menu, MenuItem }      from "@blueprintjs/core"
import { useAtom }             from "jotai"
import { useEffect, useState } from "react"
import "../css/Game.css"
import convertLinkToName       from "../logic/convertLinkToName"
import isFound                 from "../logic/isFound"
import {
  charactersAtom,
  imageAtom,
  recordsAtom,
  timeAtom,
  timestampsAtom,
}                              from "../state/atoms"

type Point = [ number, number ]

const Game = () => {
  const [ characters ]                = useAtom( charactersAtom )
  const [ imageLink ]                 = useAtom( imageAtom )
  const [ records, setRecords ]       = useAtom( recordsAtom )
  const [ timestamps, setTimestamps ] = useAtom( timestampsAtom )
  const [ time ]                      = useAtom( timeAtom )
  const [ isOpen, setIsOpen ]         = useState( false )

  const [ coordinates, setCoordinates ]         = useState<Point>( [ 0, 0 ] )
  const [ foundCharacters, setFoundCharacters ] = useState<string[]>( [] )
  const image                                   = convertLinkToName( imageLink )
  const joinedCoordinates                       = coordinates.join( ", " )

  const handleCharacterSelection = ( character: string ) => {
    const handleFound = () => {
      setFoundCharacters( [ ...foundCharacters, character ] )

      const newTimestamps = timestamps.set( character, time )
      console.log( "===" )
      console.log( "updating timestamps", newTimestamps )
      setTimestamps( new Map( newTimestamps ) )
      console.log( "timestamps set to", timestamps )
      console.log( "===" )
    }

    const calculatedRadius: number = ( coordinates[ 0 ] + coordinates[ 1 ]
                                     ) / 2 / 10
    const threshold                = 50
    const radius: number           = calculatedRadius < threshold
                                     ? threshold
                                     : calculatedRadius
    const actualCoordinates: Point = characters[ character ]

    if ( isFound( coordinates, actualCoordinates, radius ) ) {
      handleFound()
    }
  }

  useEffect( () => {
    localStorage.setItem( "characters", JSON.stringify( characters ) )
  }, [ characters ] )
  useEffect( () => {
    localStorage.setItem( "image", imageLink )
  }, [ imageLink ] )
  useEffect( () => {
    localStorage.setItem( "timestamps",
                          JSON.stringify( Array.from( timestamps ) ),
    )
    const newRecords = new Map( records
                                ? records.set( image, timestamps )
                                : [ [ image, timestamps ] ] )
    console.log( "newRecords", newRecords )
    setRecords( newRecords )
  }, [ timestamps ] )
  useEffect( () => {
    localStorage.setItem( "time", String( time ) )
  } )
  useEffect( () => {
    localStorage.setItem( "records", JSON.stringify( Array.from( records ) ) )
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
    { imageLink
      && <>
        <h2>Selected image:</h2>
        <img
          src={ imageLink }
          alt="Selected image from Profile"
          onClick={ event => {
            // @ts-ignore
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
