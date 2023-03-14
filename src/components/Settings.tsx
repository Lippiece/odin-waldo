import "../css/Pregame.scss"

import { Button } from "@blueprintjs/core"
import { FC }     from "react"

import { useAppContext, useAppDispatch } from "../context/context"
import getCharacters                     from "../logic/getCharacters"

const Settings: FC<{ images: HTMLImageElement[] }> = ( { images } ) => {

  const context  = useAppContext()
  const dispatch = useAppDispatch()

  return <section className="image-pool">
    <h1>Choose your destiny</h1>
    { images?.map( image => {
      return (
        <Button
          key={ image.alt }
          onClick={ async () => {
            dispatch(
              { payload: image.src, type: "set image" } )

            const characters = await getCharacters( image.src )
            dispatch( {
                        payload: characters,
                        type   : "set characters",
                      } )
          } }
          appearance={ context?.image === image.src ? "primary" : "subtle" }
        >
          <img
            alt={ image.alt }
            src={ image.src }
            loading="lazy"
          />
        </Button>
      )
    } ) }
  </section>
}

export default Settings
