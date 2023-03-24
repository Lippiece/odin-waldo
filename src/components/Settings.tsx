import "../css/Pregame.scss"

import { Button }                  from "@blueprintjs/core"
import { useAtom }                 from "jotai"
import { FC, useEffect, useState } from "react"

import getCharacters                 from "../logic/getCharacters"
import { charactersAtom, imageAtom } from "../state/atoms"

const Settings: FC<{ images: HTMLImageElement[] }> = ( { images } ) => {

  const Image = ( { image } ) => {
    const [ _image, setImage ]          = useAtom( imageAtom )
    const [ characters, setCharacters ] = useAtom( charactersAtom )

    const [ loaded, setLoaded ] = useState( false )

    useEffect( (): void => {
      localStorage.setItem( "characters", JSON.stringify( characters ) )
    }, [ characters ] )
    useEffect( (): void => {
      localStorage.setItem( "image", _image )
    }, [ _image ] )

    return (
      <Button
        onClick={ async () => {
          setImage( image.src )

          const characters = await getCharacters( image.src )
          setCharacters( characters )
        } }

        intent={ image === image.src ? "primary" : "none" }
        data-testid="image-selection-button"
        loading={ !loaded }
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

export default Settings
