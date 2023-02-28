import "../css/Game.css"

import { Title1, Title2 } from "@fluentui/react-components"
import { useState }       from "react"

import { useAppContext } from "../context/context"

const Game = () => {
  const context             = useAppContext()
  const [ popup, setPopup ] = useState( {
                                          coordinates: [ 0, 0 ],
                                          show       : false,
                                        } )

  return <>
    <Title1>Hello from game</Title1>
    { context?.image
      && <>
        <Title2>Selected image:</Title2>
        <img
          alt="selected image"
          src={ context?.image }
          id="selectedImage"

          // onClick={ showSelector1 }
        />
        { popup.show && <Popup characters={ [] }/> }
      </> }
  </>
}

const Popup = ( { characters } ) => {
  const context = useAppContext()
  return <div>

  </div>
}

export default Game
