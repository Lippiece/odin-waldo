import "../css/Pregame.css"

import { Button } from "@blueprintjs/core"
import { FC }     from "react"

import { useAppContext, useAppDispatch } from "../context/context"
import getCharacters                     from "../logic/getCharacters"

const Settings: FC<{ images: any[] }> = ( { images } ) => {

  const context  = useAppContext()
  const dispatch = useAppDispatch()

  return <section className="image-pool">
    <h1>Choose your destiny</h1>
    { images?.map( ( { name, url } ) => (
      <Button
        key={ name }
        onClick={ async () => {
          dispatch(
            { payload: url, type: "set image" } )

          const characters = await getCharacters( url )
          dispatch( {
                      payload: characters,
                      type   : "set characters",
                    } )
        } }
        appearance={ context?.image === url ? "primary" : "subtle" }
      >
        <img
          alt={ name }
          src={ url }
        />
      </Button>
    ) ) }
  </section>
}

export default Settings
