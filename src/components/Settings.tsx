import "../css/Pregame.scss"

import { Button }       from "@blueprintjs/core"
import { FC, useState } from "react"

import { useAppContext, useAppDispatch } from "../context/context"
import getCharacters                     from "../logic/getCharacters"

const Settings: FC<{ images: HTMLImageElement[] }> = ( { images } ) => {

  const context  = useAppContext()
  const dispatch = useAppDispatch()

  const Image = ( { image } ) => {
    const [ loaded, setLoaded ] = useState( false )
    return (
      <Button
        onClick={ async () => {
          dispatch(
            { payload: image.src, type: "set image" } )

          const characters = await getCharacters( image.src )
          dispatch( {
                      payload: characters,
                      type   : "set characters",
                    } )
        } }

        className={ loaded ? "" : "bp4-skeleton" }
        intent={ context.image === image.src ? "primary" : "none" }
        data-testid="image-selection-button"
      >
        <img
          alt={ image.alt }
          src={ image.src }
          loading="lazy"
          onLoad={ () => setLoaded( true ) }
          className={ loaded ? "" : "bp4-skeleton" }
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

export default Settings
