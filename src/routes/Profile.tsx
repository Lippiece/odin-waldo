import { useLoaderData } from "react-router-dom"

import Settings from "../components/Settings"
import Stats    from "../components/Stats"

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
      <Stats/>
      <Settings images={ images }/>
    </>
  )
}

export default Profile
