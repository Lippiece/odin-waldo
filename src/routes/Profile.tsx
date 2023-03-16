import { useLoaderData } from "react-router-dom"

import Settings          from "../components/Settings"
import { useAppContext } from "../context/context"

const Stats = () => {
  const { user } = useAppContext()
  return <>
    { user && <section>
      <h2>Stats</h2>
    </section>
    }
  </>
}

type ImageAttributes = { name: string, url: string }[]

const Profile = () => {
  const imagesAttributes = useLoaderData() as ImageAttributes
  const images           = imagesAttributes.map( ( {
                                                     url,
                                                     name,
                                                   } ) => {
                                                   const image = new Image()
                                                   image.src   = url
                                                   image.alt   = name
                                                   return image
                                                 }
  )
  return (
    <>
      <h1>Hello from Profile</h1>
      <Settings images={ images }/>
      <Stats/>
    </>
  )
}

export default Profile
