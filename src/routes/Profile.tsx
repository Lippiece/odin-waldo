import { useLoaderData } from "react-router-dom"

import Settings from "../components/Settings"

const Profile = () => {
  const images = useLoaderData()
  return (
    <>
      <h1>Hello from Profile</h1>
      <Settings images={ images }/>
    </>
  )
}

export default Profile
