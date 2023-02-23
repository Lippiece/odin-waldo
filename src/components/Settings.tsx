import "../css/Pregame.css"

import { Button, Title1 } from "@fluentui/react-components"
import { FC }             from "react"

import { useAppContext, useAppDispatch } from "../context/context"

const Settings: FC<{ images: any[] }> = ( { images } ) => {

  const context  = useAppContext()
  const dispatch = useAppDispatch()

  return <>
    <Title1>Choose your destiny</Title1>
    <section className="image-pool">
      { images?.map( ( { name, url } ) => (
        <Button
          key={ name }
          onClick={ () => dispatch(
            { payload: url, type: "set image" } ) }
          appearance={ context?.image === url ? "primary" : "subtle" }
        >
          <img
            alt={ name }
            src={ url }
          />
        </Button>
      ) ) }
    </section>
  </>
}

export default Settings
