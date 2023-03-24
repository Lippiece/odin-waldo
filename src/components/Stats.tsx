import { Text }      from "@blueprintjs/core"
import { useAtom }   from "jotai"
import { useEffect } from "react"

import { recordsAtom, userAtom } from "../state/atoms"

const Stats = () => {
  const [ user ]    = useAtom( userAtom )
  const [ records ] = useAtom( recordsAtom )

  useEffect( () => {
    localStorage.setItem( "records", JSON.stringify( records ) )
  }, [ records ] )
  useEffect( () => {
    localStorage.setItem( "user", JSON.stringify( user ) )
  }, [ user ] )

  return <section className="stats">
    { user
      && <>
        <Text tagName="h1">Records</Text>
        { records.size > 0
          ? [ ...records.entries() ]
            .map( ( [ image, timestamps ] ) => <ImageData
                    image={ image }
                    timestamps={ timestamps }
                    key={ image }
                  />
            )
          : <Text tagName="p">Nothing yet!</Text>
        }
        { !user
          && <Text tagName="h1">Sign in to see your records!</Text> }
      </>
    }
  </section>
}

const ImageData = ( { image, timestamps }: {
  image: string,
  timestamps: Map<string, number>,
} ) => {
  console.log( "image", image )
  return <section>
    <Text>{ `Records for ${ image }` }</Text>
    <ul className="bp4-list">
      { [ ...timestamps.entries() ]
        .map( ( [ character, time ] ) =>
                <li key={ character }>
                  <Text>Found { character } at { time }</Text>
                </li>
        ) }
    </ul>
  </section>
}

export default Stats
